document.addEventListener('DOMContentLoaded', function() {
    let sesionBloque = document.getElementById('sesion_bloque');
    
    if (sesionBloque) {
        sesionBloque.addEventListener('click', function(e) {
            e.preventDefault();
            cargarSesionBloque();
        });
    }

    function cargarSesionBloque() {
        fetch('/api/sesionbloque', {
                method:'GET',
                headers: {
                    'Accept':'application/json',
                },
            })
            .then(response => {
                return response.json().then(function(data) {
                    if(response.ok) {
                        mostrarTabla(data);               
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(function(error) {
                alert('No se ha podido conectar');
            })
    }

    function mostrarTabla(data) {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let botonCrear = document.createElement('button');
        botonCrear.textContent = 'Crear nuevo sesion bloque';
        botonCrear.addEventListener('click', () => crearSesionBloque());
        contenedor.appendChild(botonCrear);

        let tabla = document.createElement('table');
        let cabecera = document.createElement('thead');
        let filaCabecera = document.createElement('tr');

        let columnas = [
            'ID Sesion',
            'ID Bloque',
            'Orden',
            'Repeticiones',
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

        data.forEach(sesionBloque => {
            let fila = document.createElement('tr');

            let valores = [
                sesionBloque.id_sesion_entrenamiento,
                sesionBloque.id_bloque_entrenamiento,
                sesionBloque.orden,
                sesionBloque.repeticiones,
            ];

            valores.forEach(valor => {
                let td = document.createElement('td');
                td.textContent = valor ?? '-'; // esto es para que si algun valor es null se muestre un guion
                fila.appendChild(td);
            });

            let tdBotones = document.createElement('td');
            tdBotones.classList.add('botones');

            let botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', () => editarSesionBloque(sesionBloque.id));
            tdBotones.appendChild(botonEditar);

            let botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarSesionBloque(sesionBloque.id));
            tdBotones.appendChild(botonEliminar);

            fila.appendChild(tdBotones);
            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        contenedor.appendChild(tabla);
    }

    function crearSesionBloque() {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let formulario = document.createElement('form');
        
        // TITULO
        let titulo = document.createElement('h2');
        titulo.textContent = 'Crear nuevo sesion bloque';
        formulario.appendChild(titulo);

        // ID SESION
        let sesionLabel = document.createElement('label');
        sesionLabel.textContent = 'ID SESION';
        formulario.appendChild(sesionLabel);

        let sesionInput = document.createElement('input');
        sesionInput.type = 'number';
        sesionInput.name = 'id_sesion_entrenamiento';
        formulario.appendChild(sesionInput);

        formulario.appendChild(document.createElement('br'));

        // ID BLOQUE
        let bloqueLabel = document.createElement('label');
        bloqueLabel.textContent = 'ID BLOQUE';
        formulario.appendChild(bloqueLabel);

        let bloqueInput = document.createElement('input');
        bloqueInput.type = 'number';
        bloqueInput.name = 'id_bloque_entrenamiento';
        formulario.appendChild(bloqueInput);

        formulario.appendChild(document.createElement('br'));
        
        // ORDEN
        let ordenLabel = document.createElement('label');
        ordenLabel.textContent = 'ORDEN';
        formulario.appendChild(ordenLabel);

        let ordenInput = document.createElement('input');
        ordenInput.type = 'number';
        ordenInput.name = 'orden';
        formulario.appendChild(ordenInput);

        formulario.appendChild(document.createElement('br'));
        
        // REPETICIONES
        let repeticionesLabel = document.createElement('label');
        repeticionesLabel.textContent = 'REPETICIONES';
        formulario.appendChild(repeticionesLabel);

        let repeticionesInput = document.createElement('input');
        repeticionesInput.type = 'number';
        repeticionesInput.name = 'repeticiones';
        formulario.appendChild(repeticionesInput);

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
        botonCancelar.addEventListener('click', () => cargarSesionBloque());
        formulario.appendChild(botonCancelar);

        // Agregar el formulario al contenedor
        contenedor.appendChild(formulario);

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            let datos = Object.fromEntries(new FormData(formulario));

            fetch('/api/sesionbloque/crear', {
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
                        alert('Sesion bloque creado correctamente');
                        cargarSesionBloque();
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(() => {
                alert('Error al crear el sesion bloque');
            });
        });
    }

    function eliminarSesionBloque(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este sesion bloque?')) {
            return;
        }
        
        fetch(`/api/sesionbloque/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            return response.json().then(data => {
                if(response.ok) {
                    cargarSesionBloque(); // Recargar la tabla después de eliminar el sesionBloque
                } else {
                    alert(data.message || 'Error');
                }
            })
        })
        .catch(() => {
            alert('Error al eliminar el sesion bloque');
        });
    }

    async function editarSesionBloque(id) {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let formulario = document.createElement('form');

        let sesionBloque = await fetch('/api/sesionbloque', {
                method:'GET',
                headers: {
                    'Accept':'application/json',
                },
            })
            .then(response => {
                return response.json().then(function(data) {
                    if(response.ok) {
                        for (let sesionBloqueData of data) {
                            if (sesionBloqueData['id'] == id) return sesionBloqueData;
                        }
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(function(error) {
                alert('No se ha podido conectar');
            });

        
        // TITULO
        let titulo = document.createElement('h2');
        titulo.textContent = 'Editar un Sesion Bloque';
        formulario.appendChild(titulo);

        // ID SESION
        let sesionLabel = document.createElement('label');
        sesionLabel.textContent = 'ID SESION';
        formulario.appendChild(sesionLabel);

        let sesionInput = document.createElement('input');
        sesionInput.type = 'number';
        sesionInput.name = 'id_sesion_entrenamiento';
        formulario.appendChild(sesionInput);

        formulario.appendChild(document.createElement('br'));

        // ID BLOQUE
        let bloqueLabel = document.createElement('label');
        bloqueLabel.textContent = 'ID BLOQUE';
        formulario.appendChild(bloqueLabel);

        let bloqueInput = document.createElement('input');
        bloqueInput.type = 'number';
        bloqueInput.name = 'id_bloque_entrenamiento';
        formulario.appendChild(bloqueInput);

        formulario.appendChild(document.createElement('br'));
        
        // ORDEN
        let ordenLabel = document.createElement('label');
        ordenLabel.textContent = 'ORDEN';
        formulario.appendChild(ordenLabel);

        let ordenInput = document.createElement('input');
        ordenInput.type = 'number';
        ordenInput.name = 'orden';
        formulario.appendChild(ordenInput);

        formulario.appendChild(document.createElement('br'));
        
        // REPETICIONES
        let repeticionesLabel = document.createElement('label');
        repeticionesLabel.textContent = 'REPETICIONES';
        formulario.appendChild(repeticionesLabel);

        let repeticionesInput = document.createElement('input');
        repeticionesInput.type = 'number';
        repeticionesInput.name = 'repeticiones';
        formulario.appendChild(repeticionesInput);

        formulario.appendChild(document.createElement('br'));
        
        // BOTON EDITAR
        let botonEditar = document.createElement('button');
        botonEditar.type = 'submit';
        botonEditar.textContent = 'Editar';
        formulario.appendChild(botonEditar);

        // BOTON CANCELAR
        let botonCancelar = document.createElement('button');
        botonCancelar.type = 'button';
        botonCancelar.textContent = 'Cancelar';
        botonCancelar.addEventListener('click', () => cargarSesionBloque());
        formulario.appendChild(botonCancelar);

        // Agregar el formulario al contenedor
        contenedor.appendChild(formulario);

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            let datos = Object.fromEntries(new FormData(formulario));

            datos["activo"] = datos["activo"] == "on" ? 1 : 0;

            fetch(`/api/sesionbloque/${id}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                },
                body: JSON.stringify(datos)
            })
            .then(response => {
                return response.json().then(data => {
                    if(response.ok) {
                        alert('Sesion bloque editado correctamente');
                        cargarSesionBloque();
                    } else {
                        console.log(data.data)
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(() => {
                alert('Error al editar el sesion bloque');
            });
        });
    }
});