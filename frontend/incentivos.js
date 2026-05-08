document.addEventListener('DOMContentLoaded', ()=> {
//Aquí verificamos el rol para mostrar lo que corresponda a cada uno
const rolActual= localStorage.getItem('rol');
    if(rolActual === 'jefe'){
        ocultarElem('seccion-solicitud');
        ocultarElem('seccion-puntos');
    } else if(rolActual === 'vendedor'){
        //Los vendedores no pueden crear ni borrar los incentivos
        ocultarElem('seccion-crud');
}
    cargarIncentivos();
    mostrarPuntos();
    cargarCRUD();
//Listener para el formulario de canje
    const formularioSolicitud = document.getElementById('form-incentivo');
    if(formularioSolicitud){
        formularioSolicitud.addEventListener('submit', (evento) =>{
            evento.preventDefault();
            alert('Solicitud enviada!');
            evento.target.reset();
        });
}//Listener para el formulario que administra un jefe
    const formularioCrud = document.getElementById('form-crud');
    if(formularioCrud){
        formularioCrud.addEventListener('submit', guardarIncentivo);
    }

});//Con esta función se limpia la interfaz según el rol
function ocultarElem(id) {
    const elemento= document.getElementById(id);
    if (elemento) elemento.style.display= 'none';
}
//Aquí se usaron datos de prueba para mostrar puntos
function mostrarPuntos() {
    const totalPuntos= document.getElementById('puntos');
    if(totalPuntos) totalPuntos.textContent= "120 puntos"
}
function cargarIncentivos() {
    fetch('http://localhost:3000/incentivos')
    .then(respuesta => respuesta.json())
    .then(listado => {
        const lista = document.getElementById('lista-incentivos');
        if(!lista) return;
        lista.innerHTML = '';

        listado.forEach(item =>{
            const seccion = document.createElement('section');
            seccion.classList.add('card-incentivo');
            const rol = localStorage.getItem('rol');
//Renderizado condiciona ya que solo el jefe ve los botones que sirven para gestionar.
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
    .then(respuesta => respuesta.json())
    .then(listado =>{
        const tabla= document.getElementById('tabla-crud');
        if(!tabla) return;
        tabla.innerHTML= '';

        listado.forEach(fila => {
            tabla.innerHTML += 
            `<tr>
            <td>${fila.nombre}</td>
            <td>${fila.descripcion}</td>
            <td>${fila.puntos_requeridos}</td>
            <td>
            <button onclick= "editar(${fila.id_incentivo}, '${fila.nombre}', '${fila.descripcion}', ${fila.puntos_requeridos})">Editar</button>
            <button onclick= "eliminar(${fila.id_incentivo})">Eliminar</button>
            </td>
            </tr>`;
        });
    });
}
//Esta función maneja la creación y la actualización de los incnetivos
function guardarIncentivo(evento) {
    evento.preventDefault();

    const idIncentivo= document.getElementById('id-incentivo').value;
    const nombre= document.getElementById('crud-nombre').value;
    const descripcion= document.getElementById('crud-descripcion').value;
    const puntos= document.getElementById('crud-puntos').value;

    const metodo= idIncentivo ? 'PUT' : 'POST';
    const urlIncentivo= idIncentivo
    ? `http://localhost:3000/incentivos/${idIncentivo}`
    : 'http://localhost:3000/incentivos';

    fetch(urlIncentivo, {
        method: metodo,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            nombre, descripcion, puntos_requeridos: puntos
        })
        })
        .then(respuesta => respuesta.text())
        .then (resultado =>{
            console.log('Resultado operación:', resultado);
            document.getElementById('form-crud').reset();
            cargarCRUD();
            cargarIncentivos();
        })
        .catch(error=> console.error('Error en proceso:', error));
}
function editar(id, nombre, descripcion, puntos) {
    document.getElementById('id-incentivo').value = id;
    document.getElementById('crud-nombre').value = nombre;
    document.getElementById('crud-descripcion').value = descripcion;
    document.getElementById('crud-puntos').value = puntos;
}

function eliminar(id){
    if(!confirm('Desea eliminar el incentivo?')) return;
    fetch(`http://localhost:3000/incentivos/${id}`, { method: 'DELETE' })
    .then(() => {
        cargarCRUD();
        cargarIncentivos();
    });
}