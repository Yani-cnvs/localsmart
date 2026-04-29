document.addEventListener('DOMContentLoaded', ()=> {
    cargarUsuarios();
});

function cargarUsuarios() {
    fetch('http://localhost:3000/usuarios')
    .then(response => response.json())
    .then(datos => {
        const lista= document.getElementById('lista-usuarios');
        lista.innerHTML = '';
        datos.forEach(usuario => {
            const seccion= document.createElement('section');
            seccion.innerHTML= 
            `<strong><h3>${usuario.nombre}</h3></strong><br>
            Rol: ${usuario.id_rol == 1 ? 'Jefe' : 'Vendedor'}<br>
            <button onclick="eliminarUsuario(${usuario.id_usuario})">Eliminar usuario</button>`;
            lista.appendChild(seccion);
        });
});
    }
document.getElementById('form-usuario').addEventListener('submit', (e) =>{
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const rol = document.getElementById('rol').value;

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, rol})
    })
    .then(() =>{
        alert('Usuario creado');
        document.getElementById('form-usuario').reset();
        cargarUsuarios();
    });
});
function eliminarUsuario(id){

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE'})
        .then(() => cargarUsuarios());
}
