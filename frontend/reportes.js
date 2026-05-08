document.addEventListener('DOMContentLoaded',() => {
    //Al cargar se valida si el usuario tiene permiso para ver la página
    verificarAcceso();
    cargarReportes();

    const formulario= document.getElementById('form-reporte');
    formulario.addEventListener('submit', (evento)=> {
        evento.preventDefault();
        const descripcion= document.getElementById('descripcion').value;
//Petición para guardar el problema en la base de datos
    fetch('https://localsmart.onrender.com/reportes',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'},
            body: JSON.stringify({descripcion})
    })
    .then(respuesta => respuesta.text())
    .then(() => {
        alert('Reporte enviado!');
        formulario.reset();
        cargarReportes();//se actualiza la lista para ver todos los reportes
    })
    .catch(error => {
        console.error('Error al enviar reporte:', error);
    });
    });
});
//Con esta función se bloquea el acceso si el usuario no es jefe
function verificarAcceso() {
    const rolActual = localStorage.getItem('rol');
    if(rolActual !== 'jefe'){
        //Si se intenta entrar con la url de forma manual, se devuelva al login
        alert('Ups! No estás autorizado para acceder');
        window.location.href = 'index.html';
    }
}
function cargarReportes() {
    fetch('https://localsmart.onrender.com/reportes')
    .then(respuesta => respuesta.json())
    .then(listado =>{
        const lista= document.getElementById('lista-reportes');
        if(!lista) return;
        lista.innerHTML = '';
        listado.forEach(reporte => {
            const seccion= document.createElement('section');
            seccion.classList.add ('card-incentivo');
            seccion.innerHTML=
            `<strong>Reporte N° ${reporte.id_reporte}</strong><br>
            ${reporte.descripcion}<br>
            <em>${formatearFecha(reporte.fecha)}</em><hr>`;
            lista.appendChild (seccion);
        });
    })
    .catch(error => {
        console.error('Error al cargar los reportes:', error);
    });
    //Función para mejorar el formato de la fecha
    function formatearFecha(fechaRecibida) {
        const fecha= new Date(fechaRecibida);
        return fecha.toLocaleString('es-CL', {
            day: '2-digit',
            month:'2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
