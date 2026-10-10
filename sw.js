/* Мир героев: работа без интернета. Всё нужное кладётся в кэш при первом заходе;
   потом сайт открывается из кэша и тихо обновляется в фоне.
   При изменении сайта поменяй VERSION — старый кэш удалится. */
var VERSION = 'mir-geroev-4';
var FILES = [
  './',
  'css/fonts.css',
  'css/style.css',
  'fonts/caveat-700-cyrillic.woff2',
  'fonts/caveat-700-latin.woff2',
  'fonts/nunito-cyrillic.woff2',
  'fonts/nunito-latin.woff2',
  'img/apple-touch-icon.png',
  'img/heroes/candy.svg',
  'img/heroes/lana.svg',
  'img/heroes/liza.svg',
  'img/heroes/ulyana.svg',
  'img/heroes/yoshi.svg',
  'img/icon-192.png',
  'img/icon-512.png',
  'img/items/bell.svg',
  'img/items/cake.svg',
  'img/items/candy.svg',
  'img/items/cookie.svg',
  'img/items/feather.svg',
  'img/items/ghost.svg',
  'img/items/gift.svg',
  'img/items/hat.svg',
  'img/items/key.svg',
  'img/items/paw.svg',
  'img/items/pencil.svg',
  'img/items/pumpkin.svg',
  'img/items/snowflake.svg',
  'img/items/spoon.svg',
  'img/items/yarn.svg',
  'img/worlds/world-candy.svg',
  'img/worlds/world-lana.svg',
  'img/worlds/world-liza.svg',
  'img/worlds/world-ulyana.svg',
  'img/worlds/world-unknown.svg',
  'img/worlds/world-yoshi.svg',
  'img/worlds/yoshi-cat.svg',
  'index.html',
  'js/app.js',
  'js/vendor/qrcode.js',
  'manifest.webmanifest'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(function (c) {
    return c.match(e.request, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res.ok && res.type === 'basic') c.put(e.request, res.clone());
        return res;
      }).catch(function () { return hit || c.match('./'); });
      return hit || net;
    });
  }));
});
