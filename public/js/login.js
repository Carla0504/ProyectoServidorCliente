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
        
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': token // Laravel lo valida aquí
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(res => {
            if (res.status === 200) {
                window.location.href = '/principal';                    
            } else if (res.status === 422) {
                let mensajes = Object.values(res.body.errors).flat().join('\n');
                alert("Errores de validación:\n" + mensajes);
            } else {
                alert(res.body.message || 'Credenciales incorrectas');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se ha podido conectar con el servidor');
        });
    }

    function redirigirRegistro() {
        window.location.href = '/registro';
    }
});