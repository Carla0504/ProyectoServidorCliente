document.addEventListener('DOMContentLoaded', function() {
    let sesiones = document.getElementById('sesiones');
    
    sesiones.addEventListener('click', function(e) {
        e.preventDefault();
        cerrarSesion();
    });

    function cerrarSesion() {
        fetch('/api/sesionbloque',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(async response => {
            console.log("Respuesta backend:", response);

            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href='/';                    
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