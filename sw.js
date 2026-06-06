/* Luxfox Expat Tools — Service Worker (Offline-Shell) */
const CACHE = 'fx-app-v2';
const ASSETS = [
  'app.html',
  'manifest.json',
  'luxfox-logo.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Live-Kurse nie cachen (App regelt Offline-Fallback selbst via localStorage)
  if (url.hostname.includes('er-api.com') || url.hostname.includes('exchangerate')) {
    return;
  }

  // App-Shell: Cache-first, im Hintergrund aktualisieren
  e.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.status === 200 && url.origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
