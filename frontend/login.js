document.getElementById('form-login').addEventListener('submit', (evento) => {
    evento.preventDefault();
    //Se capturan los valores ingresados  
    const correoIngresado= document.getElementById('correo').value;
    const contrasenaIngresada= document.getElementById('contrasena').value;
//Se envian los datos al servidor por una peticion POST
    fetch('http://localhost:3000/login', 
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({correo: correoIngresado, contrasena: contrasenaIngresada})
    })
    //Con esto lanzamos una excepción si el servidor repsonde con un error
    .then(respuesta =>{
        if(!respuesta.ok) throw new Error('Error en el login');
        return respuesta.json();
    })
    .then(listadoUsuario =>{
        if(listadoUsuario.rol) {
            //Con esto fuardamos el rol en el navegador
        localStorage.setItem('rol', listadoUsuario.rol);
        window.location.href = 'dashboard.html';//Aquí se redirige al panel que corresponde según el rol
        }
    })//Mensaje para majear posible error.
    .catch(error =>{
        console.log("Fallo en el inicio de sesión:", error);
        alert('Usuario o contraseña incorrectos, intenta nuevamente');
    });
});