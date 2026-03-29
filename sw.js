const CACHE_NAME = 'focusflow-pro-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'worklogo.png'
];

// Installieren des Service Workers und Speichern der Dateien
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Netzwerk-Anfragen abfangen: Erst im Cache suchen, dann im Internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Cache aktualisieren, wenn eine neue Version vorliegt
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
                  .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
