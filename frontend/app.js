//Redirección para navegación
function ir(destino){
window.location.href =destino;
}
//Borrar la sesión y volver al login.
function cerrarSesion(){
    localStorage.removeItem('rol');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {

const rolActual = localStorage.getItem('rol');
const cuadroMensaje = document.getElementById('mensaje-rol');
const areaPanel = document.getElementById('panel-vendedor');
if(rolActual === 'vendedor'){
    const graficos= document.querySelector('.estadisticas');
    if(graficos) graficos.style.display = 'none';
}
if(cuadroMensaje){
if(rolActual=== 'jefe') {
    cuadroMensaje.textContent = 'Panel de administración - Jefe de Área';}
    else if (rolActual === 'vendedor'){
        cuadroMensaje.textContent = 'Panel de trabajo - Vendedor';}
    else {
        cuadroMensaje.textContent = 'Usuario no válido, intenta de nuevo';
    }
    }
    if(rolActual === 'vendedor'){
        ocultarElem('btn-usuarios');
        ocultarElem('btn-reportes');
        ocultarElem('form-tarea');
        ocultarElem('form-producto');

        if(areaPanel) areaPanel.style.display = 'block'
    } else{
        if(areaPanel) areaPanel.style.display= 'none';
    }
 
    if(document.getElementById('lista-alertas')){
    cargarAlertas();
}
    cargarMetricas();

    if(document.getElementById('lista-sugerencias')){
    cargarSugerencias();
    }
});

function ocultarElem(id){
    const elemento = document.getElementById(id);
    if(elemento) elemento.style.display = 'none';
}

function cargarAlertas(){
fetch('http://localhost:3000/alertas-stock')
.then(respuesta => respuesta.json())
.then(listado =>{
    const lista = document.getElementById ('lista-alertas');
    if(!lista) return;
    if (listado.length === 0){
        lista.innerHTML = "<p>No existen alertas de stock</p>";
        return; 
    }
    listado.forEach(alerta => {
        const seccion = document.createElement('section');
        seccion.classList.add('alerta');
        seccion.innerHTML =`<strong>${alerta.producto}</strong><br>
        Stock actual: ${alerta.stock}`;
        lista.appendChild(seccion);
    });
})
.catch(error =>{
    console.error('No se han podido cargar las alertas:', error);
});
}
function cargarMetricas() {
    fetch('http://localhost:3000/productos')
    .then(respuesta => respuesta.json())
    .then(listado =>{
        const total = document.getElementById('total-productos');
        if(total) total.textContent = listado.length;
    });

fetch ('http://localhost:3000/tareas-usuarios')
.then(respuesta => respuesta.json())
.then(listado => {
    const totalTareas = document.getElementById('total-tareas');
    if(totalTareas){
    const pendientes = listado.filter(tarea => tarea.estado === 'pendiente');
    totalTareas.textContent = pendientes.length;
    }
});
    
    fetch('http://localhost:3000/alertas-stock')
    .then (respuesta => respuesta.json())
    .then(listado => {
        const alertas = document.getElementById('total-alertas');
        if(alertas) alertas.textContent= listado.length;
    });
}
function irAAlertas() {
    const seccionAlertas = document.getElementById('lista-alertas');
    if(seccionAlertas){
        seccionAlertas.scrollIntoView({ behavior:'smooth'});
        const todasAlertas = seccionAlertas.querySelectorAll('.alerta');
        seccionAlertas.classList.add('resaltar');

        setTimeout(()=> {
            todasAlertas.forEach(item => item.classList.remove('resaltar'));
        }, 2000);
        }
    }
//Funcion para cruzar datos  y aconsejar al usuario en las decisiones
function cargarSugerencias() {
    const listaSugerencias = document.getElementById('lista-sugerencias');
    if(!listaSugerencias) return;
    listaSugerencias.innerHTML= '';
    fetch('http://localhost:3000/alertas-stock')
    .then (respuesta=> respuesta.json())
    .then (listaProductos=> {
        listaProductos.forEach(prod => {
            const sugerencia = document.createElement('section');
            sugerencia.classList.add('sugerencia');
            sugerencia.innerHTML = `
            Reponer producto: <strong>${prod.producto}</strong><br>
            Stock actual: ${prod.stock}`;
            listaSugerencias.appendChild(sugerencia);
        });
    });

    fetch ('http://localhost:3000/tareas-usuarios')
    .then(peticion => peticion.json())
    .then(todasTareas => {
        const pendientes= todasTareas.filter(tarea => tarea.estado === 'pendiente');
        if(pendientes.length === 0) {
            const nota = document.createElement('section');
            nota.classList.add('sugerencia');
            nota.textContent = 'No hay tareas pendientes. Buen trabajo equipo!';
            listaSugerencias.appendChild(nota);
        }
    });
//Se usa Promise.all para cruzar los datos de stock y tareas.
    Promise.all([
        fetch('http://localhost:3000/alertas-stock').then (resultado => resultado.json()),
        fetch('http://localhost:3000/tareas-usuarios').then (resultado => resultado.json())
    ]).then(([alertas, tareas]) =>{
        const pendientes = tareas.filter(tarea =>tarea.estado === 'pendiente');
        if(alertas.length > 0 && pendientes.length > 0) {
            const aviso = document.createElement('section');
            aviso.classList.add('sugerencia');
            aviso.textContent = 'Dar prioridad a reposición de productos antes de pasar a otras tareas.';
            listaSugerencias.appendChild(aviso);
        }
    });
}
//Registro del service-worker para que la funcione como PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Aplicación lista!'));
}