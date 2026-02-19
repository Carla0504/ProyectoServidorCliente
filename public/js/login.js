document.addEventListener('DOMContentLoaded', function() {
    let botonIniciarSesion = document.getElementById('iniciar_sesion');
    let botonRegistro = document.getElementById('registro');
    
    let formulario = document.getElementById('formulario-login');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            validarCredenciales();
        });
    }
    
    botonIniciarSesion.addEventListener('click', function(e) {
        e.preventDefault();
        validarCredenciales();
    });
    
    botonRegistro.addEventListener('click', function(e) {
        e.preventDefault();
        redirigirRegistro();
    });

    function validarCredenciales() {
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value;
        
        //let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        //validacion basica
        if (!email || !password) {
            alert('Por favor, completa todos los campos');
            return;
        }

        //para que diga que carga que si no no se si  lo hace, luego lo quitamos si quereis
        botonIniciarSesion.disabled = true;
        botonIniciarSesion.textContent = 'Iniciando sesión';

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(function(response) {
            return response.json().then(function(data) {
                if (response.ok) {
                    // Login exitoso
                    window.location.href = '/principal';
                } else {
                    // Error en el login
                    alert(data.message || 'Error en el inicio de sesión');
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se ha podido conectar con el servidor');
        })
        .finally(function() {
            // Restaurar botón
            botonIniciarSesion.disabled = false;
            botonIniciarSesion.textContent = 'Iniciar Sesión';
        });
    }

    function redirigirRegistro() {
        window.location.href = '/registro';
    }
});