document.addEventListener('DOMContentLoaded', function() {
    let bloque = document.getElementById('bloque');
    
    bloque.addEventListener('click', function(e) {
        e.preventDefault();

        fetch('/api/bloque',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify({})
            })
            .then(function(response){
                return response.json().then(function(response){
                    if(response.ok){
                        localStorage.setItem('token', response.access_token);//aportacion de Henry
                        window.location.href='/principal';                    
                    }else{
                        alert(response.message || 'Error');
                    }
                })
            })
            .catch(function(error){
                console.error('Error:', error);
                alert('No se ha podido conectar :(');
            })
    });
});