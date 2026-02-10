document.addEventListener('DOMContentLoaded', function() {
    let botonIniciarSesion = document.getElementById('iniciar_sesion');
    let botonRegistro = document.getElementById('registro');
    
    if (botonIniciarSesion) {
        botonIniciarSesion.addEventListener('click', function(e) {
            e.preventDefault();
            redirigirInicioSesion();
        });
    } else if (botonRegistro) {
        botonRegistro.addEventListener('click', function(e) {
            e.preventDefault();
            crearUsuario();
        });
    }

    function crearUsuario() {
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let peso_base = document.getElementById('peso_base').value;
        let altura_base = document.getElementById('altura_base').value;

        if (nombre && apellido && fecha_nacimiento && email && password && peso_base && altura_base) {
            window.location.href = '/login';
        } else {
            alert('Se han metido mal las credenciales');
        }
    }

    function redirigirInicioSesion() {
        window.location.href = '/';
    }
});