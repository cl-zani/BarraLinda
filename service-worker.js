const CACHE_NAME = 'barralinda-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Erro no cache:', err))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Ignorar requisições de API e supabase — sempre buscar da rede
  if (url.includes('/api/') || url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).catch(() => caches.match('./index.html'));
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (!cacheWhitelist.includes(name)) return caches.delete(name);
        })
      )
    )
  );
  event.waitUntil(clients.claim());
});
