//Función para guardar el rol y redirigir al dashboard
function entrar(tipo) {
    localStorage.setItem('rol', tipo);
    window.location.href='index.html';
}