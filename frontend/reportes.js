document.addEventListener('DOMContentLoaded',() => {
    verificarAcceso();
    cargarReportes();

    const form= document.getElementById('form-reporte');
    form.addEventListener('submit', (e)=> {
        e.preventDefautl();
        const descripcion= document.getElementById('descripcion').value;

    fetch('http://localhost:3000/reporte',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'},
            body: JSON.stringify({descripcion})
    })
    .then(res => res.text())
    .then(() => {
        alert('Reporte enviado');
        form.reset();
        cargarReportes();
    })
    .catch(error => {
        console.error('Error al enviar reporte:', error);
    });
    });
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
            seccion.classList.add('card-incentivo');
            seccion.innerHTML=
            `<strong>Reporte ${reporte.id_reporte}</strong><br>
            ${reporte.descripcion}<br>
            <em>${reporte.fecha}</em><hr>`;
            lista.appendChild(seccion);
        });
    })
    .catch(error => {
        console.error('Error al cargar los reportes:', error);
    });
}
