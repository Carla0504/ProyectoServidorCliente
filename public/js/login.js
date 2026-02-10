document.addEventListener('DOMContentLoaded', function() {
    let boton = document.getElementById('enviar');
    
    if (boton) {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            validarCredenciales();
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
});