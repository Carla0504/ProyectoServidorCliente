document.addEventListener('DOMContentLoaded', function() {
    let bloque = document.getElementById('bloques');
    
    if (bloque) {
        bloque.addEventListener('click', function(e) {
            e.preventDefault();
            cargarBloques();
        });
    }

    function cargarBloques() {
        fetch('/api/bloque', {
                method:'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'X-Requested-With': 'XMLHttpRequest' //esto es para que laravel gestione bien la sesion
                },
            })
            .then(function(response) {
                return response.json().then(function(data) {
                    if(response.ok) {
                        console.log(data);     
                        mostrarTabla(data);               
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('No se ha podido conectar');
            })
    }

    function mostrarTabla(data) {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let botonCrear = document.createElement('button');
        botonCrear.textContent = 'Crear nuevo bloque';
        botonCrear.addEventListener('click', () => crearBloque());
        contenedor.appendChild(botonCrear);

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
            'Comentario', 
            'Acciones'
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
                td.textContent = valor ?? '-'; // esto es para que si algun valor es null se muestre un guion
                fila.appendChild(td);
            });

            let tdBotones = document.createElement('td');

            let botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarBloque(bloque.id));
            tdBotones.appendChild(botonEliminar);
            
            fila.appendChild(tdBotones);
            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        contenedor.appendChild(tabla);
    }

    function crearBloque() {
        let nombre = prompt('Ingrese el nombre del bloque:');
        if (!nombre) {
            alert('El nombre es obligatorio');
            return;
        }

        let descripcion = prompt('Ingrese la descripción del bloque:');
        
        let tipo = prompt('Tipo (rodaje, intervalos, fuerza, recuperacion, test):');
        if (!tipo) {
            alert('El tipo es obligatorio');
            return;
        }

        let duracion_estimada = prompt('Ingrese la duración (formato HH:MM:SS, ej: 01:00:00):');
        let potencia_pct_min = prompt('Ingrese la potencia mínima del bloque (en porcentaje):');
        let potencia_pct_max = prompt('Ingrese la potencia máxima del bloque (en porcentaje):');
        let pulso_pct_max = prompt('Ingrese el pulso máximo del bloque (en porcentaje):');
        let pulso_reserva_pct = prompt('Ingrese el pulso de reserva del bloque (en porcentaje):');
        let comentario = prompt('Ingrese un comentario para el bloque:');

        fetch('/api/bloque/crear', {
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    descripcion: descripcion,
                    tipo: tipo,
                    duracion_estimada: duracion_estimada,
                    potencia_pct_min: potencia_pct_min,
                    potencia_pct_max: potencia_pct_max,
                    pulso_pct_max: pulso_pct_max,
                    pulso_reserva_pct: pulso_reserva_pct,
                    comentario: comentario
                })
            })
            .then(function(response) {
                return response.json().then(function(data) {
                    if(response.ok) {
                        cargarBloques(); // Recargar la tabla después de crear el bloque
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Error al crear el bloque');
            })
    }

    function eliminarBloque(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este bloque?')) {
            fetch(`/api/bloque/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(function(response) {
                return response.json().then(function(data) {
                    if(response.ok) {
                        cargarBloques(); // Recargar la tabla después de eliminar el bloque
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Erro al eliminar el bloque');
            });
        }
    }
});