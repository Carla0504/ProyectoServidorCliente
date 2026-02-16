document.addEventListener('DOMContentLoaded', function() {
    let bloque = document.getElementById('bloques');
    
    if (bloque) {
        bloque.addEventListener('click', function(e) {
            e.preventDefault();

            fetch('/api/bloque', {
                    method:'GET',
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept':'application/json',
                        'X-Requested-With': 'XMLHttpRequest' //esto es para que laravel gestione bien la sesion
                    },
                })
                .then(function(response){
                    return response.json().then(function(data){
                        if(response.ok){
                            /*localStorage.setItem('token', response.access_token);//aportacion de Henry
                            window.location.href='/principal';*/
                            console.log(data);     
                            mostrarTabla(data);               
                        }else{
                            alert(data.message || 'Error');
                        }
                    })
                })
                .catch(function(error){
                    console.error('Error:', error);
                    alert('No se ha podido conectar');
                })
        });
    }

    function mostrarTabla(data) {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let tabla = document.createElement('table');
        
        let cabecera = document.createElement('thead');
        let filaCabecera = document.createElement('tr');

        let columnas = [
            'ID', 
            'Nombre',
            'Descripcion',
            'Tipo',
            'Duracion_estimada',
            'Potencia_pct_min',
            'Potencia_pct_max',
            'Pulso_pct_max',
            'Pulso_reserva_pct',
            'Comentario'
        ];

        columnas.forEach(texto => {
            let th = document.createElement('th');
            th.textContent = texto;
            filaCabecera.appendChild(th);
        });

        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        let cuerpo = document.createElement('tbody');

        data.forEach(bloque => {
            let fila = document.createElement('tr');

            let valores = [
                bloque.id,
                bloque.nombre,
                bloque.descripcion,
                bloque.tipo,
                bloque.duracion_estimada,
                bloque.potencia_pct_min,
                bloque.potencia_pct_max,
                bloque.pulso_pct_max,
                bloque.pulso_reserva_pct,
                bloque.comentario
            ];

            valores.forEach(valor => {
                let td = document.createElement('td');
                td.textContent = valor;
                fila.appendChild(td);
            });

            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        contenedor.appendChild(tabla);
    }
});