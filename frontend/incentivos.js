document.addEventListener('DOMContentLoaded', ()=> {

const rol= localStorage.getItem('rol');
    if(rol === 'jefe'){
        ocultar('seccion-solicitud');
        ocultar('seccion-puntos');
    } else if(rol === 'vendedor'){
        ocultar('seccion-crud');
}
    cargarIncentivos();
    mostrarPuntos();
    cargarCRUD();

    const formSolicitud = document.getElementById('form-incentivo');
    if(formSolicitud){
        formSolicitud.addEventListener('submit', (e) =>{
            e.preventDefault();
            alert('Solicitud enviada!');
            e.target.reset();
        });
}
    const formCrud = document.getElementById('form-crud');
    if(formCrud){
        formCrud.addEventListener('submit', guardarIncentivo);
    }

});
function ocultar(id) {
    const elem= document.getElementById(id);
    if (elem) elem.style.display= 'none';
}

function mostrarPuntos() {
    const elem= document.getElementById('puntos');
    if(elem) elem.textContent= "120 puntos"
}
function cargarIncentivos() {
    fetch('http://localhost:3000/incentivos')
    .then(res => res.json())
    .then(datos => {
        const lista = document.getElementById('lista-incentivos');
        lista.innerHTML = '';

        datos.forEach(item =>{
            const seccion = document.createElement('section');
            seccion.classList.add('card-incentivo');
            const rol = localStorage.getItem('rol');

            seccion.innerHTML=
            `${rol === 'jefe' ? `<p class="estado">Canje solicitado</p>` : ''}
            ${item.nombre}<br>
            Puntos: ${item.puntos_requeridos}
            ${rol === 'jefe' ? `
            <button class="btn-validar">Validar canje</button>
            <button class="btn-eliminar" onclick="eliminar(${item.id_incentivo})">Eliminar</button>
            ` : ''}
            `;
            lista.appendChild(seccion);
        });
    });
}
function cargarCRUD(){
    fetch('http://localhost:3000/incentivos')
    .then(res => res.json())
    .then(datos =>{
        const tabla= document.getElementById('tabla-crud');
        tabla.innerHTML= '';

        datos.forEach(i => {
            tabla.innerHTML += 
            `<tr>
            <td>${i.nombre}</td>
            <td>${i.descripcion}</td>
            <td>${i.puntos_requeridos}</td>
            <td>
            <button onclick= "editar(${i.id_incentivo}, '${i.nombre}', '${i.descripcion}', ${i.puntos_requeridos})">Editar</button>
            <button onclick= "eliminar(${i.id_incentivo})">Eliminar</button>
            </td>
            </tr>`;
        });
    });
}
function guardarIncentivo(e) {
    e.preventDefault();

    const id= document.getElementById('id-incentivo').value;
    const nombre= document.getElementById('crud-nombre').value;
    const descripcion= document.getElementById('crud-descripcion').value;
    const puntos= document.getElementById('crud-puntos').value;

    const metodo= id ? 'PUT' : 'POST';
    const url= id
    ? `http://localhost:3000/incentivos/${id}`
    : 'http://localhost:3000/incentivos';

    fetch(url, {
        method: metodo,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            nombre, descripcion, puntos_requeridos: puntos
        })
        })
        .then(res => res.text())
        .then(datos =>{
            console.log('RESPUESTA:', datos);
            document.getElementById('form-crud').reset();
            cargarCRUD();
            cargarIncentivos();
        })
        .catch(error=> console.error('ERROR:', error));
}
function editar(id, nombre, descripcion, puntos) {
    document.getElementById('id-incentivo').value = id;
    document.getElementById('crud-nombre').value = nombre;
    document.getElementById('crud-descripcion').value = descripcion;
    document.getElementById('crud-puntos').value = puntos;
}

function eliminar(id){
    if(!confirm('Desea eliminar el incentivo?')) return;
    fetch(`http://localhost:3000/incentivos/${id}`,
        {
            method: 'DELETE'
        }
    )
    .then(()=> cargarCRUD());
}