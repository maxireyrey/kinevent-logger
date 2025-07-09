const CACHE_NAME = 'kinevent-logger-v1';
// Lista de archivos que componen la "cáscara" de la aplicación.
const urlsToCache = [
  '/kinevent-logger/',
  '/kinevent-logger/index.html',
  '/kinevent-logger/manifest.json',
  'https://cdn.tailwindcss.com/',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Evento de instalación: se abre el caché y se guardan los archivos.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: intercepta las peticiones.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Intenta encontrar la respuesta en el caché.
    caches.match(event.request)
      .then(response => {
        // Si la encuentra, la devuelve. Si no, la busca en la red.
        return response || fetch(event.request);
      })
  );
});
