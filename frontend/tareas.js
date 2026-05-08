document.addEventListener('DOMContentLoaded', () => {
    //Al iniciar se cargan los empleados y las tareas
    cargarUsuarios();
    cargarTareas();
    const formulario = document.getElementById('form-tarea');
    if(formulario){
        formulario.addEventListener('submit', crearTarea);
    }
});
function cargarUsuarios(){
    fetch('https://localsmart.onrender.com/usuarios')
    .then(respuesta => respuesta.json())
    .then(listado => {
        const select = document.getElementById('usuarios');
        if(!select) return;
        select.innerHTML= '';
        listado.forEach(usuario =>{
            const opcion = document.createElement('option');
            opcion.value = usuario.id_usuario;
            opcion.textContent = usuario.nombre;
            select.appendChild(opcion);
        });

        })
        .catch(error => console.error(error));
    }
//Con esa función se muestra el listado de tareas cruzando los datos con los nombres de los usuarios
function cargarTareas(){
    fetch('https://localsmart.onrender.com/tareas-usuarios')
    .then(respuesta => respuesta.json())
    .then(listado => {

        const lista = document.getElementById('lista-tareas');
        if(!lista) return;
        lista.innerHTML = '';
            if(listado.length === 0){
            lista.innerHTML = '<p>No hay tareas pendientes por ahora</p>';
            return;
        }

        listado.forEach(tarea => {
            const seccion = document.createElement('section');
            seccion.classList.add('tarjeta-tarea');
            const rol= localStorage.getItem('rol');
            let botones= '';
//La lógica de los botones es: el vendedor completa, el jefe elimina
            if(rol === 'vendedor'){
                botones += `<button onclick="completar(${tarea.id_tarea})">Completar</button>`;
            }
            if(rol === 'jefe'){
                botones += `<button onclick="eliminar(${tarea.id_tarea})">Eliminar</button>`;
            }

            seccion.innerHTML = `
                <strong>${tarea.titulo}</strong><br>
                ${tarea.descripcion}<br>
                Fecha: ${formatearFecha(tarea.fecha)}<br>
                Estado: ${tarea.estado}<br>
                Asignada a: ${tarea.usuario || 'Sin asignar'}<br>
                ${botones}`;

            lista.appendChild(seccion);
        });
    })
    .catch(error => {
        console.error('Error al cargar las tareas:', error);
    });
}
//Función que procesa la creación de una tarea para uno o más usuarios
function crearTarea(evento){
    evento.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
//Se conviernen las opciones seleccionadas del select en un array de ids
    const seleccionados = Array.from(
        document.getElementById('usuarios').selectedOptions
    ).map(opcion => opcion.value);

    if(seleccionados.length === 0){
        alert('Elige un usuario');
        return;
    }
    fetch('https://localsmart.onrender.com/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo,
            descripcion,
            usuarios: seleccionados//se envía el array de ids al backend
        })
    })
    .then(() => {
        alert('Tarea creada!');
        document.getElementById('form-tarea').reset();
        cargarTareas();//se recarga la lista
    })
    .catch(error => console.error("Error al crear:", error));
}

function completar(id){
    fetch(`https://localsmart.onrender.com/tareas/${id}`, {
    method: 'PUT'
    })
    .then(() => cargarTareas());
}
function eliminar(id){
    fetch(`https://localsmart.onrender.com/tareas/${id}`, {
    method: 'DELETE'
    })
    .then(() => cargarTareas());
}
//Función para mejorar la fecha y que sea más legible
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