document.addEventListener('DOMContentLoaded', function() {
    let botonEnviar = document.getElementById('enviar');
    let botonRegistro = document.getElementById('registro');
    
    if (botonEnviar) {
        botonEnviar.addEventListener('click', function(e) {
            e.preventDefault();
            validarCredenciales();
        });
    } else if (botonRegistro) {
        botonRegistro.addEventListener('click', function(e) {
            e.preventDefault();
            redirigirRegistro();
        });
    }

    function validarCredenciales() {
        let usuario = document.getElementById('usuario').value;
        let password = document.getElementById('password').value;

        if ((usuario === 'admin' || usuario === 'admin@gmail.com') && password === '1234') {
            window.location.href = '/principal';
        } else {
            alert('Se han metido mal las credenciales');
        }
    }

    function redirigirRegistro() {
        window.location.href = '/registro';
    }
});