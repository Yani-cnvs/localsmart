function ir(pagina){
window.location.href =pagina;
}
function cerrarSesion(){
    localStorage.removeItem('rol');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {

const rol = localStorage.getItem('rol');
const mensaje = document.getElementById('mensaje-rol');
const panel = document.getElementById('panel-vendedor');
if(rol === 'vendedor'){
    const stads= document.querySelector('.estadisticas');
    if(stads) stads.style.display = 'none';
}
if(mensaje){
if(rol=== 'jefe') {
    mensaje.textContent = 'Panel de administración - Jefe de Área';}
    else if (rol=== 'vendedor'){
        mensaje.textContent = 'Panel de trabajo - Vendedor';}
    else {
        mensaje.textContent = 'Usuario inexistente';
    }
    }
    if(rol=== 'vendedor'){
        ocultar('btn-usuarios');
        ocultar('btn-reportes');
        ocultar('form-tarea');
        ocultar('form-producto');

        if(panel) panel.style.display = 'block'
    } else{
        if(panel) panel.style.display= 'none';
    }
 
    if(document.getElementById('lista-alertas')){
    cargarAlertas();
}
    cargarMetricas();

    if(document.getElementById('lista-sugerencias')){
    cargarSugerencias();
    }
});

function ocultar(id){
    const elemento = document.getElementById(id);
    if(elemento) elemento.style.display = 'none';
}

function cargarAlertas(){
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
}
function cargarMetricas() {
    fetch('http://localhost:3000/productos')
    .then(res => res.json())
    .then(data =>{
        const el = document.getElementById('total-productos');
        if(el) el.textContent = data.length;
    });

fetch ('http://localhost:3000/tareas-usuarios')
.then(res => res.json())
.then(data => {
    const el = document.getElementById('total-tareas');
    if(el){
    const pendientes = data.filter(tarea => tarea.estado === 'pendiente');
    el.textContent = pendientes.length;
    }
});
    
    fetch('http://localhost:3000/alertas-stock')
    .then (res => res.json())
    .then(data => {
        const el = document.getElementById('total-alertas');
        if(el) el.textContent= data.length;
    });
}
function irAAlertas() {
    const seccion = document.getElementById('lista-alertas');
    if(seccion){
        seccion.scrollIntoView({ behavior:'smooth'});
        const alertas = seccion.querySelectorAll('.alerta');
        seccion.classList.add('resaltar');

        setTimeOut(()=> {
            alertas.forEach(a => a.classList.remove('resaltar'));
        }, 2000);
        }
    }
function cargarSugerencias() {
    const lista= document.getElementById('lista-sugerencias');
    if(!lista) return;
    lista.innerHTML;
    fetch('http://localhost:3000/alertas-stock')
    .then (res=> res.json())
    .then (productos=> {
        productos.forEach(p => {
            const s = document.createElement('section');
            s.classList.add('sugerencia');
            s.innerHTML = `
            Reponer producto: <strong>${p.producto}</strong><br>
            Stock actual: ${p.stock}`;
            lista.appendChild(s);
        });
    });

    fetch ('http://localhost:3000/tareas-usuarios')
    .then(res => res.json())
    .then(tareas => {
        const pendientes= tareas.filter(t => t.estado === 'pendiente');
        if(pendientes.length === 0) {
            const s = document.createElement('section');
            s.classList.add('sugerencia');
            s.textContent = 'No hay tareas pendientes. Buen trabajo equipo!';
            lista.appendChild(s);
        }
    });

    Promise.all([
        fetch('http://localhost:3000/alertas-stock').then (r => r.json()),
        fetch('http://localhost:3000/tareas-usuarios').then (r => r.json())
    ]).then(([alertas, tareas]) =>{
        const pendientes = tareas.filter(t =>t.estado === 'pendiente');
        if(alertas.length > 0 && pendientes.length > 0) {
            const s = document.createElement('section');
            s.classList.add('sugerencia');
            s.textContent = 'Priorizar reposición de productos antes de pasar a otras tareas.';
            lista.appendChild(s);
        }
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('PWA lista'));
}