// Nombre de caché de la aplicación
const nombreCache= 'localsmart-v1';

// Archivos que se guardarán para uso offline
const archivosCache= [
    '/',
    '/index.html',
    '/dashboard.html',
    '/productos.html',
    '/tareas.html',
    '/usuarios.html',
    '/incentivos.html',
    '/reportes.html',
    '/style.css',
    '/app.js',
    '/login.js',
    '/productos.js',
    '/tareas.js',
    '/usuarios.js',
    '/reportes.js',
    '/manifest.json'
];

// Se ejecuta cuando el Service Worker se instala
self.addEventListener('install', evento =>{
    console.log ('Service Worker instalado!');

    evento.waitUntil (
        caches.open (nombreCache)
        .then(cache=> {
            console.log('Archivos guardados en caché');
            
            return cache.addAll(archivosCache);
        })
    );

});

// Se ejecuta cada vez que la aplicación hace una petición
self.addEventListener('fetch', evento => {

    evento.respondWith(

        caches.match(evento.request)
        .then(respuestaCache => {

        if(respuestaCache) {
            return respuestaCache;
            }
            return fetch(evento.request);
        })
    );
});