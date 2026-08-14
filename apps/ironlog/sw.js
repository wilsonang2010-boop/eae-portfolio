/* IronLog — offline service worker.
   The app is fully self-contained (single index.html + icons). We cache the
   shell and assets so the app works with no network. Bump CACHE on release. */
const CACHE = "ironlog-v19";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-192-maskable.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

/* No skipWaiting here on purpose. A new worker taking over mid-session would
   leave the open page running old JS against a new cache; instead we wait, the
   page notices us and offers a reload, and only then do we take over. */
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Background rest alarm. The page's own timers are throttled — and on a locked
   phone frozen — once the app isn't in front, so the countdown can run out
   with nothing firing. The page hands us the deadline and we raise the
   notification from out here. waitUntil keeps the worker alive up to the
   deadline; the OS can still evict us (iOS reliably does), so treat this as a
   safety net rather than a guarantee. */
let restAlarm = null;
function clearRestAlarm(){ if (restAlarm){ clearTimeout(restAlarm); restAlarm = null; } }

self.addEventListener("message", e => {
  const d = e.data || {};
  if (d.type === "skip-waiting"){ self.skipWaiting(); return; }
  if (d.type === "cancel-rest"){ clearRestAlarm(); return; }
  if (d.type !== "schedule-rest") return;
  clearRestAlarm();
  const delay = Math.max(0, (d.at || 0) - Date.now());
  if (delay > 15 * 60 * 1000) return;              // not a rest timer; ignore
  const fire = new Promise(resolve => {
    restAlarm = setTimeout(() => {
      restAlarm = null;
      self.registration.showNotification("IronLog", {
        body: d.body || "Rest complete — next set 💥",
        icon: "icon-192.png", badge: "icon-192.png",
        tag: "ironlog-rest", renotify: true, vibrate: [120, 80, 120]
      }).then(resolve, resolve);
    }, delay);
  });
  if (e.waitUntil) e.waitUntil(fire);
});

// Tapping the "rest complete" notification focuses the app instead of
// opening a second copy of it.
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type:"window", includeUncontrolled:true }).then(list => {
      for (const c of list){ if ("focus" in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});

// Network-first for the HTML shell (so updates land), cache-first for assets,
// with an offline fallback to the cached shell.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const isShell = req.mode === "navigate" || req.destination === "document";
  if (isShell) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put("./index.html", copy));
        return res;
      }).catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === "basic") {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
