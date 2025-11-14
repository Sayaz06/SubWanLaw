self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("subplanner-cache").then(cache => {
            return cache.addAll([
                "./",
                "index.html",
                "style.css",
                "app.js",
                "manifest.json",
                "icon-192.png",
                "icon-512.png",
                "music-super-for-start.mp3"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});
