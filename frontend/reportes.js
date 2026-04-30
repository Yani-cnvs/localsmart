document.addEventListener('DOMContentLoaded',() => {
    verificarAcceso();
    cargarReportes();
});
function verificarAcceso() {
    const rol = localStorage.getItem('rol');
    if(rol !== 'jefe'){
        alert('Ups! No estás autorizado para acceder');
        window.location.href = 'index.html';
    }
}
function cargarReportes() {
    fetch('http://localhost:3000/reportes')
    .then(res => res.json())
    .then(datos =>{
        const lista= document.getElementById('lista-reportes');
        lista.innerHTML = '';
        datos.forEach(reporte => {
            const seccion = document.createElement('section');
            seccion.innerHTML=
            `<strong>Reporte ${reporte.id}</strong><br>
            ${reporte.descripcion}<br>
            <em>${reporte.fecha}</em><hr>`;
            lista.appendChild(seccion);
        });
    });
}
document.getElementById('form-reporte').addEventListener('submit', (e) => {
    e.preventDefault();
    const descripcion = document.getElementById('descripcion').value;

    fetch('http://localhost:3000/reportes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({descripcion})
    })
    .then(() => {
        alert('Reporte enviado');
        document.getElementById('form-reporte').reset();
        cargarReportes();
    });
});