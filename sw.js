const staticAssets = [
  './',
  './style.css',
  './script.js'
]

self.addEventListener('install', async event => {
  const cache = await caches.open('todo-static')
  cache.addAll(staticAssets)
});

self.addEventListener('fetch', event => {
const req = event.request;
console.log(req)
event.respondWith(cacheFirst(req))
})

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req)
  console.log(cachedResponse)
  return cachedResponse || fetch(req)
}

