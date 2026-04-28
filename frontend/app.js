const rol = localStorage.getItem('rol');
const mensajeRol = document.getElementById('mensaje-rol');
if(mensajeRol) {
    if(rol === 'jefe') {
        mensajeRol.textContent ='Bienvenido Jefe de Tienda!';
    } else if (rol === 'vendedor'){
        mensajeRol.textContent = 'Bienvenido Vendedor/a!';
    } else {
        mensajeRol.textContent = 'Error al ingresar, usuario desconocido';
    }
}

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