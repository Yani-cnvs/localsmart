document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
})

    const formulario = document.getElementById('form-producto');

    if(formulario){
        formulario.addEventListener('submit',(e) => {
        e.preventDefault();
    const nombre= document.getElementById('nombre').value;
    const precio= document.getElementById('precio').value;
    const stock= document.getElementById('stock').value;
    const ubicacion= document.getElementById('ubicacion').value;
    const categoria= document.getElementById('categoria').value;

    fetch('http://localhost:3000/productos',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nombre, precio, stock, ubicacion, categoria})
    })
    .then(res => res.text())
    .then(data =>{
        console.log(data);
        alert('Producto agregado!');
        formulario.reset();
        cargarProductos();
    })
    .catch(error=> {
        console.error('Error:', error);
    });
});
    }

function cargarProductos(){
    fetch('http://localhost:3000/productos')
    .then(res => res.json())
    .then(datos =>{
        const lista=document.getElementById('lista-productos');
        lista.innerHTML='';

        datos.forEach(p => {
            const item = document.createElement('section');
            item.classList.add('tarjeta-tarea');
            item.innerHTML= `<strong>${p.nombre}</strong><br>
            Precio: $${p.precio}<br>
            Ubicación: ${p.ubicacion || "Sin ubicación"}`;
            lista.appendChild(item);
        });    
    })
        .catch(error => {
        console.error('Error al cargar productos:', error);
});
}
cargarProductos();