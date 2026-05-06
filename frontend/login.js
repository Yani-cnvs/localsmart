document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const correo= document.getElementById('correo').value;
    const contrasena= document.getElementById('contrasena').value;

    fetch('http://localhost:3000/login', 
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({correo, contrasena})
    })
    .then(res =>{
        if(!res.ok) throw new Error('Error al logear');
        return res.json();
    })
    .then(data =>{
        localStorage.setItem('rol', data.rol);
        window.location.href = 'dashboard.html';
    })
    .catch(() =>{
        alert('Usuario o contraseña incorrectos, intenta nuevamente');
    });
});