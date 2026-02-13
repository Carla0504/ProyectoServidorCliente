document.addEventListener('DOMContentLoaded', function() {
    let botonIniciarSesion = document.getElementById('iniciar_sesion');
    let botonRegistro = document.getElementById('registro');
    
    botonIniciarSesion.addEventListener('click', function(e) {
        e.preventDefault();
        validarCredenciales();
    });
    
    botonRegistro.addEventListener('click', function(e) {
        e.preventDefault();
        redirigirRegistro();
    });

    function validarCredenciales() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    console.log("Email:", email);
    console.log("Password:", password);

    fetch('/api/login',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(async response => {
        const data = await response.json();
        console.log("Respuesta backend:", data);

        if(response.ok){
            localStorage.setItem('token', data.access_token);
            window.location.href='/principal';                    
        }else{
            alert(JSON.stringify(data));
        }
    })
    .catch(function(error){
        console.error('Error:', error);
        alert('No se ha podido conectar :(');
    })
}


    function redirigirRegistro() {
        window.location.href = '/registro';
    }
});