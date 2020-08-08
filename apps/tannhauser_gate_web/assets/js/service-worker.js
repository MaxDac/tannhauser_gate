const CACHE_NAME = 'static-cache-v1';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
    "/",
    "/js/app.js",
    "/js/service-worker.js",
    "/css/app.css",
    "/images/download.jpg",
    "/images/icon-192.png",
    "/images/icon-192x192.png",
    "/images/icon-512.png",
    "/images/icon-512x512.png",
    "/images/logo.png",
    "/images/logo-30x30.png",
    "/images/logo-square.png",
    "/images/map.jpg",
    "/images/map.png",
    "/images/map-dot.png",
    "/images/map-dot-blurred.png"
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.

    return self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.

});
