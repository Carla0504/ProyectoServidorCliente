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
        let datosUsuario = {
            usuario: document.getElementById('usuario').value,
            password: document.getElementById('password').value,
        };
        
        fetch("route/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(datosUsuario)
        })
        
        .then(response => {
            return response.json();
        })

        .then(data => {
            console.log("Respuesta del servidor:", data);

            if ((data.usuario === datosUsuario.usuario || data.usuario === datosUsuario.email) && data.password === datosUsuario.password) {
                window.location.href = '/principal';
            } else {
                alert('Se han metido mal las credenciales');
            }
        })

        .catch(error => {
            console.error("Error al validar las credenciales:", error);
        });
    }

    function redirigirRegistro() {
        window.location.href = '/registro';
    }
});