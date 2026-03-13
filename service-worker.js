const CACHE_NAME = 'qrguardian-supervision-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',

  // CDN
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',

  // icons
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];


// INSTALL
self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {

        console.log("Cache installation");

        for (const url of urlsToCache) {

          try {

            const response = await fetch(url, { mode: 'no-cors' });

            await cache.put(url, response);

          } catch (err) {

            console.warn("Impossible de cacher :", url);

          }

        }

      })
  );
});


// FETCH
self.addEventListener('fetch', event => {

  if (event.request.method !== 'GET') return;

  event.respondWith(

    caches.match(event.request)
      .then(cached => {

        const networkFetch = fetch(event.request)
          .then(response => {

            if (response && response.status === 200) {

              const clone = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, clone));

            }

            return response;

          })
          .catch(() => cached);

        return cached || networkFetch;

      })
      .catch(() => {

        if (event.request.mode === 'navigate') {

          return caches.match('/index.html');

        }

      })

  );

});


// ACTIVATE
self.addEventListener('activate', event => {

  event.waitUntil(

    caches.keys().then(names => {

      return Promise.all(

        names.map(name => {

          if (name !== CACHE_NAME) {

            console.log("Delete cache :", name);

            return caches.delete(name);

          }

        })

      );

    })

  );

  return self.clients.claim();

});
