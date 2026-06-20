// Arquivo sw.js
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    // Apenas repassa as requisições sem cachear para não travar o app
    return;
});
