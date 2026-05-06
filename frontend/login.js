//Función para guardar el rol y redirigir al dashboard
function entrar(tipo) {
    localStorage.setItem('rol', tipo);
    window.location.href='index.html';
}
document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const correo= document.getElementById('correo').value;
    const password= document.getElementById('password').value;

    fetch('http://localhost:3000/login', 
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({correo, password})
    })
    .then(res =>{
        if(!res.ok) throw new Error('Error al logear');
        return res.json();
    })
    .then(data =>{
        localStorage.setItem('rol', data.rol);
        window.location.href = 'index.html';
    })
    .catch(() =>{
        alert('Usuario o contraseña incorrectos, intenta nuevamente');
    });
});