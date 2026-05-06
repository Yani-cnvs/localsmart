document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    cargarTareas();
    const formulario = document.getElementById('form-tarea');
    if(formulario){
        formulario.addEventListener('submit', crearTarea);
    }
});
function cargarUsuarios(){
    fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(datos => {
        const select = document.getElementById('usuarios');
        if(!select) return;
        select.innerHTML= '';
        datos.forEach(usuario =>{
            const option = document.createElement('option');
            option.value = usuario.id_usuario;
            option.textContent = usuario.nombre;
            select.appendChild(option);
        });

        })
        .catch(error => console.error(error));
    }

function cargarTareas(){
    fetch('http://localhost:3000/tareas-usuarios')
    .then(res => res.json())
    .then(datos => {

        const lista = document.getElementById('lista-tareas');
        if(!lista) return;
        lista.innerHTML = '';
            if(datos.length === 0){
            lista.innerHTML = '<p>No hay tareas pendientes</p>';
            return;
        }

        datos.forEach(tarea => {
            const seccion = document.createElement('section');
            seccion.classList.add('tarjeta-tarea');
            const rol= localStorage.getItem('rol');
            let botones= '';

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

function crearTarea(e){
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    const seleccionados = Array.from(
        document.getElementById('usuarios').selectedOptions
    ).map(op => op.value);

    if(seleccionados.length === 0){
        alert('Elige un usuario');
        return;
    }
    fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo,
            descripcion,
            usuarios: seleccionados
        })
    })
    .then(() => {
        alert('Tarea creada!');
        document.getElementById('form-tarea').reset();
        cargarTareas();
    })
    .catch(error => console.error(error));
}

function completar(id){
    fetch(`http://localhost:3000/tareas/${id}`, {
    method: 'PUT'
    })
    .then(() => cargarTareas());
}
function eliminar(id){
    fetch(`http://localhost:3000/tareas/${id}`, {
    method: 'DELETE'
    })
    .then(() => cargarTareas());
}
function formatearFecha(fecha) {
        const f= new Date(fecha);
        return f.toLocaleString('es-CL', {
            day: '2-digit',
            month:'2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
}