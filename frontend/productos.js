function cargarProductos(){
    fetch('http://localhost:3000/productos')
    .then(res => res.json())
    .then(datos =>{
        const lista=document.getElementById('lista-productos');
        lista.innerHTML='';

        datos.forEach(p => {
            const item = document.createElement('section');
            item.classList.add('card');
            item.innerHTML= `<strong>${p.nombre}</strong><br>
            Precio: $${p.precio}`;
            lista.appendChild(item);
        });    
    });
}

document.getElementById('form-producto').addEventListener('submit', (e) =>{
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
    .then(() =>{
        cargarProductos();
        document.getElementById('form-producto').reset();
    });
});

cargarProductos();