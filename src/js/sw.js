self.addEventListener('install', function(event) {

        let urlToCache = [
            '/',
            'bootstrap.js',
            'custom_player.js',
            'dash.all.min.js',
            'jquery-3.2.1.js',
            'keybindings.js',
            'layouter.js',
            'main.js',
            'modalSelector.js',
            'css.css',
            'bootstrap.min.css',
            'bootstrap.min.css.map',
            'layouter_css.css',
            'loader.css',
            'modalSelector.css',
            'Background.jpg',
            'dummy1.png',
            'dummy2.png',
            'dummy3.png',
            'dummy4.png',
        ]

        event.waitUntil(
            caches.open('multiperspectives-static-v2').then(function (cache) {
                return cache.addAll(urlToCache)
            })
        )
})


self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.delete('multiperspectives-static-v1')
    )
})

self.addEventListener('fetch', function (event) {

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) return response;
            return fetch(event.request)
        })

    )
});