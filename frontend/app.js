fetch ('/alertas-stock')
.then(respuesta => respuesta.json())
.then(datos => {
    const lista = document.getElementById('lista-alertas');

    if(datos.length === 0 ) {
        lista.innerHTML = "<p>No existen alertas de stock</p>";
        return;
    }

    datos.forEach (alerta => {
        const seccion = document.createElement('section');
        seccion.classList.add('alerta');

        seccion.innerHTML = `<strong>${alerta.producto}</strong><br>
        Stock actual: ${alerta.stock_actual}`;

        lista.appendChild(seccion);
    });
})

.catch (error => { console.error('Error al intentar conseguir alertas:', error);
});