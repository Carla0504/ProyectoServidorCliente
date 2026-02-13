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

        fetch('/api/login', {
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
            console.log("Respuesta backend:", response);

            if (response.ok) {
                localStorage.setItem('token', response.access_token);
                window.location.href='/principal';                    
            } else {
                alert('Error');
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert('No se ha podido conectar :(');
        })
    }


    function redirigirRegistro() {
        window.location.href = '/registro';
    }
});