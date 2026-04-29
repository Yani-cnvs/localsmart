document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    cargarTareas();
});
function cargarUsuarios(){
    fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(datos => {
        const select = document.getElementById('usuarios');
        datos.forEach(usuario =>{
            const option = document.createElement('option');
            option.value = usuario.id_usuario;
            option.textContent = usuario.nombre;
            select.appendChild(option);
        });

        });
    }

function cargarTareas(){
    fetch('http://localhost:3000/tareas-usuarios')
    .then(res => res.json())
    .then(datos => {
        const lista= document.getElementById('lista-tareas');
        lista.innerHTML= '';
        const tareasAgrupadas= {};
        datos.forEach(fila=> {
            if(!tareasAgrupadas[fila.id_tarea]){
                tareasAgrupadas[fila.id_tarea] = {
                    id: fila.id_tarea,
                    titulo: fila.titulo,
                    descripcion: fila.descripcion,
                    fecha: fila.fecha,
                    estado: fila.estado,
                    usuarios: []
                };
            }
        if(fila.usuario){
            tareasAgrupadas[fila.id_tarea].usuarios.push(fila.usuario);
        }
        });
    Object.values(tareasAgrupadas).forEach(tarea => {
        const seccion= document.createElement('section');
        const rol = localStorage.getItem('rol');
        let botones= '';
        if(rol === 'vendedor'){
            botones= `<button onclick="completar(${tarea.id})">Completar</button>`;}
        if(rol === 'jefe'){
            botones = `<button onclick="eliminar(${tarea.id})">Eliminar</button>`;}
        seccion.innerHTML = `
        <strong>${tarea.titulo}</strong><br>
        ${tarea.descripcion}<br>
        ${tarea.fecha}<br>
        ${tarea.estado}<br>
        Asignada a: ${tarea.usuarios.join(', ')}<br>
        ${botones}`;
        lista.appendChild(seccion);
        });
});
}
document.getElementById('form-tarea').addEventListener('submit', (e) =>{
    e.preventDefault();
    const titulo= document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const seleccionados= Array.from(document.getElementById('usuarios').selectedOptions).map(op => op.value);

    fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({titulo, descripcion, usuarios: seleccionados})
        })
        .then(() =>{
            alert('tarea creada con éxito');
            document.getElementById('form-tarea').reset();
            cargarTareas();
        })
});

function completar(id){
    fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'PUT'})
        .then(()=> cargarTareas());
}
function eliminar(id){
    fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE'})
        .then(()=> cargarTareas());
}