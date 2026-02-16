document.addEventListener('DOMContentLoaded', function() {
    let botonCerrarSesion = document.getElementById('cerrar_sesion');
    
    botonCerrarSesion.addEventListener('click', function(e) {
        e.preventDefault();
        cerrarSesion();
    });

    function cerrarSesion() {
        fetch('/api/logout',{
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json',
                'X-Requested-With': 'XMLHttpRequest', //esto es para que laravel gestione bien la sesion
            },
            body: JSON.stringify({
            })
        })
        .then(async response => {
            console.log("Respuesta backend:", response);

            if (response.ok) {
                window.location.href='../';                    
            } else {
                alert(response.message || 'Error');
            }
        })
        .catch(function(error){
            console.error('Error:', error);
            alert('No se ha podido conectar :(');
        })
    }
});