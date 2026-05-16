document.addEventListener('DOMContentLoaded', ()=> {
    const rolActual= localStorage.getItem('rol');
    if(rolActual !== 'jefe'){
        alert("No tienes permiso para acceder a esta página");
        window.location.href = 'index.html';
        return;
    }
    //Se carga la lista de usuarios
    cargarUsuarios();
});
//Con esta función se obtienen todos los usuarios registrados
function cargarUsuarios() {
    fetch('https://localsmart.onrender.com/usuarios')
    .then(respuesta => respuesta.json())
    .then(listado => {
        const lista= document.getElementById('lista-usuarios');
        if(!lista) return;
        lista.innerHTML = '';

        listado.forEach(persona => {
            const seccion = document.createElement('section');
            seccion.classList.add('usuario-card');
            const tipoRol = persona.id_rol == 1 ? 'Jefe' : 'Vendedor';
            
            seccion.innerHTML= 
            `<section class="usuario-info">
            <h3>${persona.nombre}</h3>
            <p>${persona.correo}</p>
            <p>Rol: ${tipoRol}</p>
            </section>
            <button class="btn-eliminar-usuario" onclick="eliminarUsuario(${persona.id_usuario})">Eliminar 🗑️</button>`;
            lista.appendChild(seccion);
        });
})
.catch(error => console.log("Problema al cargar el listado:", error));
}
//Manejamos el registro de nuevos usuarios
document.getElementById('form-usuario').addEventListener('submit', (evento) =>{
    evento.preventDefault();
    const nombre= document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const rolSeleccionado = document.getElementById('rol').value;

    const id_rol = (rolSeleccionado === 'jefe') ? 1 : 2;

    //Petición para guartdar el nuevo registro en el servidor
    fetch('https://localsmart.onrender.com/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, correo, contrasena, rol: rolSeleccionado})
    })
    .then(respuesta =>{
        if(respuesta.ok){
            alert("Se guardó el usuario con éxito!");
        document.getElementById('form-usuario').reset();
        cargarUsuarios();
        }
    })
    .catch(error => alert("No se pudo registrar:" + error));
});
//Función para eliminar el usuario por medio del id
function eliminarUsuario(id){
    if (!confirm('Deseas eliminar este usuario?')) return;
    fetch(`https://localsmart.onrender.com/usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(respuesta=> {
        console.log("Se ha eliminaro el ID:", id);
        cargarUsuarios();
    })
    .catch(error=> console.log("Error al intentar borrar:", error));
}