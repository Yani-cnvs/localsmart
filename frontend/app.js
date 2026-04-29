document.addEventListener('DOMContentLoaded', () => {
    function ir(pagina){
    window.location.href =pagina;
}
//CERRAR SESIÓN no funciona
function cerrarSesion(){
    localStorage.removeItem('rol');
    window.location.href = 'login.html';
}

const rol = localStorage.getItem('rol');
    if(rol === 'vendedor') {
        const btnUsuarios = document.getElementById('btn-usuarios');
        const btnReportes = document.getElementById('btn-reportes');
        if(btnUsuarios) btnUsuarios.style.display = 'none';
        if(btnReportes) btnReportes.style.display = 'none';
}

fetch('http://localhost:3000/alertas-stock')
.then(respuesta => respuesta.json())
.then(datos =>{
    const lista = document.getElementById ('lista-alertas');
    if(!lista) return;
    if (datos.length === 0){
        lista.innerHTML = "<p>No existen alertas de stock</p>";
        return; 
    }
    datos.forEach(alerta => {
        const seccion = document.createElement('section');
        seccion.classList.add('alerta');
        seccion.innerHTML =`<strong>${alerta.producto}</strong><br>
        Stock actual: ${alerta.stock}`;
        lista.appendChild(seccion);
    });
})
.catch(error =>{
    console.error('Error al conseguir alertas:', error);
});
});