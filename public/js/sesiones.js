document.addEventListener('DOMContentLoaded', function() {
    let sesiones = document.getElementById('sesiones');
    
    if (sesiones) {
        sesiones.addEventListener('click', function(e) {
            e.preventDefault();
            cargarSesiones();
        });
    }

    function cargarSesiones() {
        fetch('/api/sesion', {
                method:'GET',
                credentials: 'include',
                headers: {
                    'Accept':'application/json',
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
        botonCrear.textContent = 'Crear nueva sesión';
        botonCrear.addEventListener('click', () => crearSesion());
        contenedor.appendChild(botonCrear);

        let tabla = document.createElement('table');
        let cabecera = document.createElement('thead');
        let filaCabecera = document.createElement('tr');

        let columnas = [
            'ID Plan',
            'Fecha',
            'Nombre',
            'Descripcion',
            'Estado',
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

        data.forEach(sesion => {
            let fila = document.createElement('tr');

            let valores = [
                sesion.id_plan,
                sesion.fecha,
                sesion.nombre,
                sesion.descripcion,
                sesion.completada == 1 ? 'Completada' : 'Pendiente'
            ];

            valores.forEach(valor => {
                let td = document.createElement('td');
                td.textContent = valor ?? '-'; // esto es para que si algun valor es null se muestre un guion
                fila.appendChild(td);
            });

            let tdBotones = document.createElement('td');

            let botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarSesion(sesion.id));
            tdBotones.appendChild(botonEliminar);
            
            fila.appendChild(tdBotones);
            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        contenedor.appendChild(tabla);
    }

    function crearSesion() {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let formulario = document.createElement('form');
        
        // TITULO
        let titulo = document.createElement('h2');
        titulo.textContent = 'Crear nueva sesión';
        formulario.appendChild(titulo);

        // FECHA
        let fechaLabel = document.createElement('label');
        fechaLabel.textContent = 'Fecha: ';
        formulario.appendChild(fechaLabel);

        let fechaInput = document.createElement('input');
        fechaInput.type = 'date';
        fechaInput.name = 'fecha';
        fechaInput.required = true;
        formulario.appendChild(fechaInput);
        
        formulario.appendChild(document.createElement('br'));

        // NOMBRE
        let nombreLabel = document.createElement('label');
        nombreLabel.textContent = 'Nombre: ';
        formulario.appendChild(nombreLabel);

        let nombreInput = document.createElement('input');
        nombreInput.type = 'text';
        nombreInput.name = 'nombre';
        nombreInput.required = true;
        formulario.appendChild(nombreInput);

        formulario.appendChild(document.createElement('br'));

        // DESCRIPCION
        let descripcionLabel = document.createElement('label');
        descripcionLabel.textContent = 'Descripción: ';
        formulario.appendChild(descripcionLabel);

        let descripcionInput = document.createElement('input');
        descripcionInput.type = 'text';
        descripcionInput.name = 'descripcion';
        descripcionInput.required = true;
        formulario.appendChild(descripcionInput);

        formulario.appendChild(document.createElement('br'));

        // COMPLETADA
        let completadaLabel = document.createElement('label');
        completadaLabel.textContent = 'Completada: ';
        formulario.appendChild(completadaLabel);

        let completadaInput = document.createElement('input');
        completadaInput.type = 'checkbox';
        completadaInput.name = 'completada';
        formulario.appendChild(completadaInput);

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

            fetch('/api/sesion/crear', {
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
                        alert('Sesión creada correctamente');
                        cargarSesiones();
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(() => {
                alert('Error al crear la sesión');
            });
        });
    }

    function eliminarSesion(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta sesión?')) {
            return;
        }
        
        fetch(`/api/sesion/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            return response.json().then(data => {
                if(response.ok) {
                    cargarSesiones(); // Recargar la tabla después de eliminar la sesión
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