document.addEventListener('DOMContentLoaded', ()=> {
    cargarIncentivos();
    mostrarPuntos();
});

function mostrarPuntos() {
    document.getElementById('puntos').textContent = 120 puntos;
}
function cargarIncentivos() {
    fetch('http://localhost:3000/puntos-incentivos')
    .then(res => res.json())
    .then(datos => {
        const lista = document.getElementById('lista-incentivos');
        lista.innerHTML = '';

        datos.forEach(item =>{
            const seccion = document.createElement('section');
            Selection.innetHTML=
            `<strong>${item.incentivo}</strong><br>
            Usuario: ${item.usuario}<br>
            Puntos acumulados: ${item.puntos}`;
            lista.appendChild(seccion);
        });
    });
}
document.getElementById('form-incentivo').addEventListener('submit', (e) {
    e.preventDefault();
    alert('Solicitud enviada!');
    e.target.reset();
});