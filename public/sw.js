const CACHE_NAME = 'stroke-rehab-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Warm up caching for standalone offline tablet support
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Handle notification click to bring the app to focus or open it instantly on user device
self.addEventListener('notificationclick', (e) => {
  e.notification.close();

  // Đây là logic tối ưu giúp đưa app ra cận cảnh khi click chạm vào thông báo ngoài thiết bị di động
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Nếu app đang mở sẵn, focus vào nó
      for (const client of windowClients) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      // Nếu app chưa mở, kích hoạt mở một tab/window độc lập mới
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Use a stale-while-revalidate or Network-first strategy for smooth offline support on older tablets
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const cacheToRecord = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, cacheToRecord);
        });
        return response;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
