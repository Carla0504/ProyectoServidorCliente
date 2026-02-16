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
            method: 'POST',
            credentials: 'include', //esto es para que laravel gestione bien la sesion
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'//esto es para que laravel gestione bien la sesion
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(function(response) {
            return response.json().then(function(data) {
                if (response.ok) {
                    window.location.href = '/principal';                    
                } else {
                    alert(data.message || 'Error');
                }
            });
        })
        .catch(function(error){
            console.error('Error:', error);
            alert('No se ha podido conectar :(');
        });
    }

    function redirigirRegistro() {
        window.location.href = '/registro';
    }
});