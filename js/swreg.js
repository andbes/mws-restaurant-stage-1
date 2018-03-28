
/* Register the service worker */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(registration => {
      console.log('ServiceWorker registration successful.');
    }, error => {
      console.log('ServiceWorker registration failed: ', error);
    });
} else {
   console.console.log('ServiceWorker not supported.');
}
