// Enhanced Service Worker with Advanced Caching Strategies
const CACHE_VERSION = 'v3.0.0';
const CACHE_NAME = `saudi-yemeni-center-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `saudi-yemeni-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `saudi-yemeni-images-${CACHE_VERSION}`;
const FONT_CACHE = `saudi-yemeni-fonts-${CACHE_VERSION}`;
const STATIC_CACHE = `saudi-yemeni-static-${CACHE_VERSION}`;

// Cache duration in milliseconds (7 days)
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// Critical assets to cache immediately on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
};

// Determine cache strategy based on request
function getCacheStrategy(url) {
  if (url.includes('/api/') || url.includes('/auth/')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  if (url.match(/\.(woff2|woff|ttf|otf)$/i)) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  if (url.match(/\.(js|css)$/i)) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Get appropriate cache name based on resource type
function getCacheName(url) {
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return IMAGE_CACHE;
  }
  if (url.match(/\.(woff2|woff|ttf|otf)$/i)) {
    return FONT_CACHE;
  }
  if (url.match(/\.(js|css)$/i)) {
    return STATIC_CACHE;
  }
  return DYNAMIC_CACHE;
}

// Clean old cache entries
async function cleanOldCacheEntries(cacheName) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  const now = Date.now();
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const cachedTime = new Date(response.headers.get('sw-cached-time'));
      if (now - cachedTime.getTime() > CACHE_MAX_AGE) {
        await cache.delete(request);
      }
    }
  }
}

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all([
          // Delete old caches
          ...cacheNames
            .filter(name => name.startsWith('saudi-yemeni-') && name !== CACHE_NAME)
            .map(name => caches.delete(name)),
          // Clean old entries in current caches
          cleanOldCacheEntries(IMAGE_CACHE),
          cleanOldCacheEntries(FONT_CACHE),
          cleanOldCacheEntries(DYNAMIC_CACHE),
        ]);
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip chrome extensions and non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  const strategy = getCacheStrategy(url.href);
  const cacheName = getCacheName(url.href);

  if (strategy === CACHE_STRATEGIES.CACHE_FIRST) {
    // Cache first - good for images and fonts
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(response => {
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(cacheName).then(cache => {
              const headers = new Headers(responseToCache.headers);
              headers.append('sw-cached-time', new Date().toISOString());
              const modifiedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
              });
              cache.put(request, modifiedResponse);
            });
          }
          return response;
        }).catch(() => {
          // Return offline fallback if available
          return caches.match('/offline.html');
        });
      })
    );
  } else if (strategy === CACHE_STRATEGIES.STALE_WHILE_REVALIDATE) {
    // Stale while revalidate - good for JS/CSS
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(response => {
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(cacheName).then(cache => {
              const headers = new Headers(responseToCache.headers);
              headers.append('sw-cached-time', new Date().toISOString());
              const modifiedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
              });
              cache.put(request, modifiedResponse);
            });
          }
          return response;
        });
        return cachedResponse || fetchPromise;
      })
    );
  } else if (strategy === CACHE_STRATEGIES.NETWORK_FIRST) {
    // Network first - good for API calls and HTML
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok && request.method === 'GET') {
            const responseToCache = response.clone();
            caches.open(cacheName).then(cache => {
              const headers = new Headers(responseToCache.headers);
              headers.append('sw-cached-time', new Date().toISOString());
              const modifiedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
              });
              cache.put(request, modifiedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cachedResponse => {
            return cachedResponse || caches.match('/offline.html');
          });
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  // Sync any pending messages when back online
  const cache = await caches.open(DYNAMIC_CACHE);
  // Implementation would go here
}

// Push notifications support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'إشعار جديد من المركز السعودي اليمني',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
    },
  };

  event.waitUntil(
    self.registration.showNotification('المركز السعودي اليمني', options)
  );
});
