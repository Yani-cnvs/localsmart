document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
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
        })
        .catch(error => console.error(error));
});