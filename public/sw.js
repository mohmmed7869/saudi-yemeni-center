const CACHE_NAME = 'saudi-yemeni-center-v4';
const OFFLINE_URL = '/';
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/company-logo.png',
  '/assets/hero-bg.jpg',
];

// Dynamic cache names
const DYNAMIC_CACHE = 'saudi-yemeni-center-dynamic-v4';
const IMAGE_CACHE = 'saudi-yemeni-center-images-v4';
const FONT_CACHE = 'saudi-yemeni-center-fonts-v4';

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Define cache strategy for different types of requests
const getCacheStrategy = (url) => {
  if (url.includes('/api/')) return CACHE_STRATEGIES.NETWORK_FIRST;
  if (url.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)) return CACHE_STRATEGIES.CACHE_FIRST;
  if (url.match(/\.(js|css)$/)) return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  if (url.match(/\.(woff|woff2|ttf|otf|eot)$/)) return CACHE_STRATEGIES.CACHE_FIRST;
  return CACHE_STRATEGIES.NETWORK_FIRST;
};

// Get cache name based on resource type
const getCacheName = (url) => {
  if (url.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)) return IMAGE_CACHE;
  if (url.match(/\.(woff|woff2|ttf|otf|eot)$/)) return FONT_CACHE;
  if (url.match(/\.(js|css)$/)) return DYNAMIC_CACHE;
  return DYNAMIC_CACHE;
};

// Clean old cache entries
const cleanOldCacheEntries = async (cacheName) => {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  const now = Date.now();
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const cachedDate = new Date(response.headers.get('date')).getTime();
      if (now - cachedDate > CACHE_MAX_AGE) {
        await cache.delete(request);
      }
    }
  }
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_CACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE];
  
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!currentCaches.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Clean old entries from current caches
      cleanOldCacheEntries(DYNAMIC_CACHE),
      cleanOldCacheEntries(IMAGE_CACHE),
      cleanOldCacheEntries(FONT_CACHE),
    ]).then(() => self.clients.claim())
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const strategy = getCacheStrategy(event.request.url);

  if (strategy === CACHE_STRATEGIES.CACHE_FIRST) {
    // Cache first, fallback to network
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            const cacheName = getCacheName(event.request.url);
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        }).catch(() => caches.match(event.request));
      })
    );
  } else if (strategy === CACHE_STRATEGIES.STALE_WHILE_REVALIDATE) {
    // Return cached version while updating in background
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const cacheName = getCacheName(event.request.url);
        const fetchPromise = fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        }).catch(() => null);
        return cachedResponse || fetchPromise;
      })
    );
  } else {
    // Network first, fallback to cache
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const responseToCache = response.clone();
          const cacheName = getCacheName(event.request.url);
          caches.open(cacheName).then((cache) => {
            if (event.request.method === 'GET') {
              cache.put(event.request, responseToCache);
            }
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
            });
          });
        })
    );
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  // Handle background sync for contact form submissions
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();
  
  for (const request of requests) {
    if (request.url.includes('/api/contact')) {
      try {
        await fetch(request);
        await cache.delete(request);
      } catch (error) {
        console.error('Sync failed:', error);
      }
    }
  }
}
