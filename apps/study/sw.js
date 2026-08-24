/* O-Level HQ service worker.
   The whole app is one self-contained HTML file, so "offline" means keeping
   that file, the manifest and the icons in a cache and serving them when the
   network is unavailable.

   BUILD is the single thing to bump when the app changes. It names the cache
   (so the old copy is evicted rather than served forever) and it is what the
   page compares itself against to decide whether it is looking at a stale
   copy. The same string must appear in index.html — see BUILD there. */

const BUILD = '2026-08-20d';
const CACHE = 'olevel-hq-' + BUILD;

/* The host sleeps when idle and can take the better part of a minute to wake.
   Waiting that long on a blank tab is worse than showing the cached copy, so
   the cache wins after this many milliseconds — but the network request is
   left running so the next load is fresh. */
const NAV_TIMEOUT = 5000;

const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // Individually, so one failed icon cannot fail the whole install.
      .then(cache => Promise.all(CORE.map(url => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  const data = event.data;
  /* Let the page tell a waiting worker to take over immediately. */
  if (data === 'skip-waiting') { self.skipWaiting(); return; }
  /* Let the page ask which build is actually installed, so it can say so out
     loud instead of leaving the user guessing. */
  if (data && data.type === 'version' && event.ports && event.ports[0]) {
    event.ports[0].postMessage({ build: BUILD });
  }
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Leave cross-origin requests (the Google Fonts stylesheet) to the browser.
  // Offline they simply fail and the page falls back to its embedded font.
  if (url.origin !== self.location.origin) return;

  // The worker script itself, and anything explicitly asking to skip us, must
  // reach the network untouched — the page fetches sw.js to read the deployed
  // BUILD, and answering that from cache would defeat the whole check.
  if (url.pathname.endsWith('/sw.js') || url.searchParams.has('fresh')) return;

  if (req.mode === 'navigate') { event.respondWith(navigate(req)); return; }

  // Everything else same-origin (icons, manifest): cache first.
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }))
  );
});

/* Network first, so a deployed update is picked up on the next load, with the
   cached copy as the fallback — but bounded, so a sleeping host cannot hang
   the page. Whichever way it resolves, the network copy is still written to
   the cache when it eventually arrives. */
function navigate(req) {
  const net = fetch(req).then(res => {
    if (res && res.ok) caches.open(CACHE).then(c => c.put('./index.html', res.clone()));
    return res;
  });

  return caches.match('./index.html').then(cached => {
    if (!cached) return net;               // nothing to fall back to
    return new Promise(resolve => {
      let settled = false;
      const done = r => { if (!settled) { settled = true; resolve(r); } };
      const timer = setTimeout(() => done(cached), NAV_TIMEOUT);
      net.then(res => { clearTimeout(timer); done(res); },
               ()   => { clearTimeout(timer); done(cached); });
    });
  });
}
