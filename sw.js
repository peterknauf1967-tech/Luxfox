/* Luxfox Expat Tools — Service Worker */
const CACHE = 'fx-app-v3';
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
  if (url.hostname.includes('er-api.com') || url.hostname.includes('exchangerate')) return;

  const accept = req.headers.get('accept') || '';
  const isHTML = req.mode === 'navigate' || req.destination === 'document' || accept.includes('text/html');

  // HTML / Navigationen: NETWORK-FIRST -> immer frischer Inhalt; Cache nur als Offline-Fallback
  if (isHTML) {
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.status === 200 && url.origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req).then(c => c || caches.match('app.html')))
    );
    return;
  }

  // Übrige Assets (CSS/JS/Bilder): cache-first mit Hintergrund-Update
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
