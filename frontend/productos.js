let todosLosProductos = [];

document.addEventListener('DOMContentLoaded', () => {
    //Se carga la página con los productos que están en la base de datos
    cargarProductos();
});
    const formularioProducto = document.getElementById('form-producto');

    if(formularioProducto){
        formularioProducto.addEventListener('submit',(evento) => {
        evento.preventDefault();
    const nombre= document.getElementById('nombre').value;
    const precio= document.getElementById('precio').value;
    const stock= document.getElementById('stock').value;
    const ubicacion= document.getElementById('ubicacion').value;
    const categoria= document.getElementById('categoria').value;
//Petición POST para guardar el producto en el servidor
    fetch('https://localsmart.onrender.com/productos',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nombre, precio, stock, ubicacion, categoria})
    })
    .then(respuesta => {
            if(!respuesta.ok) {
                throw new Error ( 'Error al guardar');
            }
            return respuesta.json();
        })
    .then(datos =>{
        console.log(datos);
        alert('Producto agregado exitosamente!');
        formularioProducto.reset();
        cargarProductos();
    })
    .catch(error=> {
        console.error('Error:', error);
    });
});
    }
//Con esta función cargamos toda la lista de productos en pantalla
function cargarProductos(){
    fetch('https://localsmart.onrender.com/productos')
    .then(respuesta => respuesta.json())
    .then(listado =>{
        const rolActual = localStorage.getItem('rol');
        const lista = document.getElementById('lista-productos');
        if (!lista) return;
        lista.innerHTML = ''; // Con esto evitamos duplicados.
        listado.forEach(producto =>{
            const item = document.createElement('section');
            item.classList.add('tarjeta-tarea');
                
            // Renderizado dinámico: el botón de eliminar solo aparece si se ingresó como jefe
            item.innerHTML = `
            <section class="producto-top">
                <section>
                <strong>${producto.nombre}</strong><br>
                Precio: $${producto.precio}<br>
                Stock: ${producto.stock ?? 0}<br>
                Ubicación: ${producto.ubicacion || "Sin ubicación específica"}
                </section>
                ${rolActual === 'jefe' ?
                `<button class="btn-eliminar-producto" onclick="eliminarProducto(${producto.id_producto})">🗑️</button>` : ''}
                </section>`;

                lista.appendChild(item);
        });    
    })
        .catch(error => {
        console.error('Error al cargar productos:', error);
});
}
//Función valida solo para el rol de jefe
function eliminarProducto(id) {
    if(!confirm('Desea eliminar este producto?')) return;
    fetch(`https://localsmart.onrender.com/productos/${id}`, {
        method: 'DELETE'
    })
    .then(respuesta=> {
        if(!respuesta.ok) {
            throw new Error('Error al intentar eliminar');
        }
        return respuesta.json();
    })
    .then(() => {
        console.log("Producto eliminado:", id);
        cargarProductos();//Actualizamos la vista después de borrar.
    }) .catch(error =>{
        console.error('Error al eliminar el producto:', error);
    });
}
cargarProductos();