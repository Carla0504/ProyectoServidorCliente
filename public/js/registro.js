document.addEventListener('DOMContentLoaded', function() {
    let botonIniciarSesion = document.getElementById('iniciar_sesion');
    let botonRegistro = document.getElementById('registro');
    
    if (botonIniciarSesion) {
        botonIniciarSesion.addEventListener('click', function(e) {
            e.preventDefault();
            redirigir();
        });
    } else if (botonRegistro) {
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

        fetch("registro.php", {
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
            /**for (var i = 0; i < data.length; i++) {
                nombre = data[i]["nombre"];
                apellido = data[i]["apellido"];
                fecha_nacimiento = data[i]["fecha_nacimiento"];
                email = data[i]["email"];
                password = data[i]["password"];
                peso_base = data[i]["peso_base"];
                altura_base = data[i]["altura_base"];

                console.log("pintar usuario: " + nombre + " " + apellido);
            }*/

            redirigir();
        })

        .catch(error => {
            console.error("Error al obtener los usuarios:", error);
        });
    }

    function redirigir() {
        window.location.href = '/';
    }
});