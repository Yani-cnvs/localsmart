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

        const tareasAgrupadas = {};

        datos.forEach(fila => {
            if(!tareasAgrupadas[fila.id_tarea]){
                tareasAgrupadas[fila.id_tarea] = {
                    id: fila.id_tarea, titulo: fila.titulo, descripcion: fila.descripcion, fecha: fila.fecha, estado: fila.estado, usuarios: []
                };
            }

            if(fila.usuario){
                tareasAgrupadas[fila.id_tarea].usuarios.push(fila.usuario);
            }
        });
        Object.values(tareasAgrupadas).forEach(tarea => {

            const seccion = document.createElement('section');
            seccion.classList.add('tarjeta-tarea');
            
            const rol = localStorage.getItem('rol');
            let botones = '';

            if(rol === 'vendedor'){
                botones += `<button onclick="completar(${tarea.id})">Completar</button>`;
            }
            if(rol === 'jefe'){
                botones += `<button onclick="eliminar(${tarea.id})">Eliminar</button>`;
            }
            const titulo= tarea.titulo || 'Sin título';
            const descripcion = tarea.descripcion || 'Sin descripción';
            let fechaFormateada= 'sin fecha';
            if(tarea.fecha){
                const fecha = new Date (tarea.fecha);
                if(!isNaN(fecha)){
                    fechaFormateada = fecha. toLocaleDateString();
                }
            }
            const usuariosUnicos = [...new Set(tarea.usuarios)];
            
            seccion.innerHTML = `
                <strong>${tarea.titulo}</strong><br>
                ${tarea.descripcion}<br>
                Fecha: ${new Date(tarea.fecha).toLocaleDateString()}<br>
                Estado: ${tarea.estado}<br>
                Asignada a: ${tarea.usuarios.join(', ')}<br>
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
        alert('Selecciona un usuario para asignar tarea');
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