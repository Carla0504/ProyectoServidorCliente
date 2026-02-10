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