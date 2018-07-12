/* ServiceWorker Functions - registered in main.js */

const cacheName = 'v4';
const cacheFiles = [
	'/',
	'index.html',
	'restaurant.html',
	'manifest.json',
	'./js/dbhelper.js',
	'./js/main.js',
	'./js/swreg.js',
	'./js/restaurant_info.js',
	'./css/styles.css',
	'./img/logo192.png',
	'./img/logo512.png',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg',
	
];


/* delay event until the promise is resolved, open cache and add all the default files to the cache. */
self.addEventListener('install', event => {
		console.log('SW installed');
		event.waitUntil(
			caches.open(cacheName).then(cache => {
			console.log('SW caching');
			return cache.addAll(cacheFiles);
			})
	);
});

/* delete previous cached files if a new version of the cache is available */
self.addEventListener('activate', event => {
	console.log('SW activated');
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(cacheNames.map(thisCacheName => {
				if (thisCacheName !== cacheName) {
					console.log('SW removing cached files');
					return caches.delete(thisCacheName);
				}
			}));
		})
	);
});

/*  Answer to event request :  if cache matches with the response, send the response, otherwise, check network. */
self.addEventListener('fetch', event => {
	console.log('SW fetch event', event.request.url);
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				console.log('SW found in cache', event.request.url, response);
				return response || fetch(event.request).then(response => {
					console.log('SW not found in cache, check network', event.request.url);
					cache.put(event.request, response.clone());
					console.log('SW new network data cached', event.request.url);
					return response;
				});
			});
		})
	);
});
