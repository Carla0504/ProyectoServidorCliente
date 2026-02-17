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
                td.textContent = valor;
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
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let formulario = document.createElement('form');
        
        // TITULO
        let titulo = document.createElement('h2');
        titulo.textContent = 'Crear nuevo bloque';
        formulario.appendChild(titulo);

        // NOMBRE
        let nombreLabel = document.createElement('label');
        nombreLabel.textContent = 'Nombre';
        formulario.appendChild(nombreLabel);

        let nombreInput = document.createElement('input');
        nombreInput.type = 'text';
        nombreInput.name = 'nombre';
        nombreInput.required = true;
        formulario.appendChild(nombreInput);

        formulario.appendChild(document.createElement('br'));

        // DESCRIPCION
        let descripcionLabel = document.createElement('label');
        descripcionLabel.textContent = 'Descripcion';
        formulario.appendChild(descripcionLabel);

        let descripcionInput = document.createElement('input');
        descripcionInput.type = 'text';
        descripcionInput.name = 'descripcion';
        descripcionInput.required = true;
        formulario.appendChild(descripcionInput);

        formulario.appendChild(document.createElement('br'));

        // TIPO
        let tipoLabel = document.createElement('label');
        tipoLabel.textContent = 'Tipo';
        formulario.appendChild(tipoLabel);

        let tipoSelect = document.createElement('select');
        tipoSelect.name = 'tipo';
        tipoSelect.required = true;

        let opciones = ['rodaje', 'intervalos', 'fuerza', 'recuperacion', 'test'];

        for (let i = 0; i < opciones.length; i++) {
            let opcion = document.createElement('option');
            opcion.value = opciones[i];
            opcion.textContent = opciones[i];
            tipoSelect.appendChild(opcion);
        }

        formulario.appendChild(tipoSelect);
        formulario.appendChild(document.createElement('br'));

        // DURACION ESTIMADA
        let duracionLabel = document.createElement('label');
        duracionLabel.textContent = 'Duracion estimada';
        formulario.appendChild(duracionLabel);

        let duracionInput = document.createElement('input');
        duracionInput.type = 'number';
        duracionInput.name = 'duracion_estimada';
        duracionInput.required = true;
        formulario.appendChild(duracionInput);

        formulario.appendChild(document.createElement('br'));
        
        // POTENCIA PCT MIN
        let potenciaMinLabel = document.createElement('label');
        potenciaMinLabel.textContent = 'Potencia pct min';
        formulario.appendChild(potenciaMinLabel);

        let potenciaMinInput = document.createElement('input');
        potenciaMinInput.type = 'number';
        potenciaMinInput.name = 'potencia_pct_min';
        potenciaMinInput.required = true;
        formulario.appendChild(potenciaMinInput);

        formulario.appendChild(document.createElement('br'));

        // POTENCIA PCT MAX
        let potenciaMaxLabel = document.createElement('label');
        potenciaMaxLabel.textContent = 'Potencia pct max';
        formulario.appendChild(potenciaMaxLabel);

        let potenciaMaxInput = document.createElement('input');
        potenciaMaxInput.type = 'number';
        potenciaMaxInput.name = 'potencia_pct_max';
        potenciaMaxInput.required = true;
        formulario.appendChild(potenciaMaxInput);

        formulario.appendChild(document.createElement('br'));

        // PULSO PCT MAX
        let pulsoMaxLabel = document.createElement('label');
        pulsoMaxLabel.textContent = 'Pulso pct max';
        formulario.appendChild(pulsoMaxLabel);

        let pulsoMaxInput = document.createElement('input');
        pulsoMaxInput.type = 'number';
        pulsoMaxInput.name = 'pulso_pct_max';
        pulsoMaxInput.required = true;
        formulario.appendChild(pulsoMaxInput);

        formulario.appendChild(document.createElement('br'));

        // PULSO RESERVA PCT
        let pulsoReservaLabel = document.createElement('label');
        pulsoReservaLabel.textContent = 'Pulso reserva pct';
        formulario.appendChild(pulsoReservaLabel);

        let pulsoReservaInput = document.createElement('input');
        pulsoReservaInput.type = 'number';
        pulsoReservaInput.name = 'pulso_reserva_pct';
        pulsoReservaInput.required = true;
        formulario.appendChild(pulsoReservaInput);

        formulario.appendChild(document.createElement('br'));

        // COMENTARIO
        let comentarioLabel = document.createElement('label');
        comentarioLabel.textContent = 'Comentario';
        formulario.appendChild(comentarioLabel);

        let comentarioInput = document.createElement('input');
        comentarioInput.type = 'text';
        comentarioInput.name = 'comentario';
        comentarioInput.required = false;
        formulario.appendChild(comentarioInput);

        formulario.appendChild(document.createElement('br'));

        // BOTON CREAR
        let botonCrear = document.createElement('button');
        botonCrear.type = 'submit';
        botonCrear.textContent = 'Crear';
        formulario.appendChild(botonCrear);

        // BOTON CANCELAR
        let botonCancelar = document.createElement('button');
        botonCancelar.type = 'button';
        botonCancelar.textContent = 'Cancelar';
        botonCancelar.addEventListener('click', () => cargarBloques());
        formulario.appendChild(botonCancelar);

        // Agregar el formulario al contenedor
        contenedor.appendChild(formulario);

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            let datos = Object.fromEntries(new FormData(formulario));

            fetch('/api/bloque/crear', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                },
                body: JSON.stringify(datos)
            })
            .then(response => {
                return response.json().then(data => {
                    if(response.ok) {
                        alert('Bloque creado correctamente');
                        cargarBloques();
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(() => {
                alert('Error al crear el bloque');
            });
        });
    }

    function eliminarBloque(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este bloque?')) {
            return;
        }
        
        fetch(`/api/bloque/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            return response.json().then(data => {
                if(response.ok) {
                    cargarBloques(); // Recargar la tabla después de eliminar el bloque
                } else {
                    alert(data.message || 'Error');
                }
            })
        })
        .catch(() => {
            alert('Error al eliminar el bloque');
        });
    }
});