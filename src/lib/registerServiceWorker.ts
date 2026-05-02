export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Try to register the updated service worker first
      const registration = await navigator.serviceWorker.register('/sw-update.js', {
        scope: '/',
      }).catch(() => {
        // Fallback to original if new one fails
        return navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
      });

      // Check for updates every 30 minutes
      setInterval(() => {
        registration.update();
      }, 30 * 60 * 1000);

      // Update on page focus
      window.addEventListener('focus', () => {
        registration.update();
      });

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available, prompt user to refresh
              if (confirm('تحديث جديد متاح! هل تريد إعادة تحميل الصفحة؟')) {
                window.location.reload();
              }
            }
          });
        }
      });

      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    console.log('Service Worker unregistered');
  }
};

// Check if app is running as PWA
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Request persistent storage
export const requestPersistentStorage = async () => {
  if (navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persist();
    console.log(`Persistent storage granted: ${isPersisted}`);
    return isPersisted;
  }
  return false;
};
