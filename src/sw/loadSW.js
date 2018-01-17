if (navigator.serviceWorker) {
    console.log('sw')
    navigator.serviceWorker.register('sw.js', { scope: '/' })
}