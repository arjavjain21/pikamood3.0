// PikaMood Service Worker v1
// Cache-first for static assets, network-first for API calls

const CACHE_NAME = 'pikamood-v1';
const STATIC_ASSETS = [
  '/PikaMood.html',
  '/manifest.json',
  '/PikachuFace.jsx',
  '/PikaIcons.jsx',
  '/AppState.jsx',
  '/OnboardingScreen.jsx',
  '/HomeScreen.jsx',
  '/DiaryScreen.jsx',
  '/StatsScreen.jsx',
  '/SettingsScreen.jsx',
  '/DatabaseService.jsx',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap',
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith('http') || url.includes('fonts')));
    }).catch(() => {})
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for static, network-first for Supabase API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Network-first for Supabase API calls
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request)
        .then(response => response)
        .catch(() => new Response(JSON.stringify({ error: 'Offline' }), {
          headers: { 'Content-Type': 'application/json' }
        }))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});

// Background sync for offline check-ins
self.addEventListener('sync', event => {
  if (event.tag === 'sync-checkins') {
    event.waitUntil(syncPendingCheckins());
  }
});

async function syncPendingCheckins() {
  // Reads pending queue from IndexedDB and pushes to Supabase
  // Implemented in DatabaseService.jsx
}

// Push notifications
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'PikaMood ⚡', {
      body: data.body || 'Pika pika! Time to check in!',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-72.png',
      tag: 'pikamood-reminder',
      renotify: true,
      data: { url: '/PikaMood.html' },
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('PikaMood') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('/PikaMood.html');
    })
  );
});
