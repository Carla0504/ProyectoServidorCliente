document.addEventListener('DOMContentLoaded', function() {
    let botonIniciarSesion = document.getElementById('iniciar_sesion');
    let botonRegistro = document.getElementById('registro');
    
    if (botonIniciarSesion) {
        botonIniciarSesion.addEventListener('click', function(e) {
            e.preventDefault();
            redirigir();
        });
    } 
    
    if (botonRegistro) {
        botonRegistro.addEventListener('click', function(e) {
            e.preventDefault();
            crearUsuario();
        });
    }

    function crearUsuario() {
        let datosUsuario = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            peso_base: document.getElementById('peso_base').value,
            altura_base: document.getElementById('altura_base').value
        };

        fetch('/api/registro',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept':'application/json'
            },
            body: JSON.stringify(datosUsuario)
        })
        
        .then(response => {
            return response.json();
        })

        .then(data => {
            console.log("Usuario creado correctamente", data);
            redirigir();
        })

        .catch(error => {
            console.error("Error al registrar el usuario:", error);
        });
    }

    function redirigir() {
        window.location.href = '/';
    }
});