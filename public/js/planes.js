document.addEventListener('DOMContentLoaded', function() {
    let plan = document.getElementById('planes');
    
    if (plan) {
        plan.addEventListener('click', function(e) {
            e.preventDefault();
            cargarPlanes();
        });
    }

    function cargarPlanes() {
        fetch('/api/plan', {
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
        botonCrear.textContent = 'Crear nuevo plan';
        botonCrear.addEventListener('click', () => crearPlan());
        contenedor.appendChild(botonCrear);

        let tabla = document.createElement('table');
        let cabecera = document.createElement('thead');
        let filaCabecera = document.createElement('tr');

        let columnas = [
            'ID Ciclista',
            'Nombre',
            'Descripcion',
            'Fecha Inicio',
            'Fecha Fin',
            'Objetivo',
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

        data.forEach(plan => {
            let fila = document.createElement('tr');

            let valores = [
                plan.id_ciclista,
                plan.nombre,
                plan.descripcion,
                plan.fecha_inicio,
                plan.fecha_fin,
                plan.objetivo,
                plan.activo == 1 ? 'Activo' : 'Pendiente'
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
            botonEditar.addEventListener('click', () => editarPlan(plan.id));
            tdBotones.appendChild(botonEditar);

            let botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarPlan(plan.id));
            tdBotones.appendChild(botonEliminar);

            fila.appendChild(tdBotones);
            cuerpo.appendChild(fila);
        });

        tabla.appendChild(cuerpo);
        contenedor.appendChild(tabla);
    }

    function crearPlan() {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let formulario = document.createElement('form');
        
        // TITULO
        let titulo = document.createElement('h2');
        titulo.textContent = 'Crear nuevo plan';
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

        // FECHA INICIO
        let fechaInicioLabel = document.createElement('label');
        fechaInicioLabel.textContent = 'Fecha inicio';
        formulario.appendChild(fechaInicioLabel);
        
        let fechaInicioInput = document.createElement('input');
        fechaInicioInput.type = 'date';
        fechaInicioInput.name = 'fecha_inicio';
        fechaInicioInput.required = true;
        formulario.appendChild(fechaInicioInput);
        
        formulario.appendChild(document.createElement('br'));

        // FECHA FIN
        let fechaFinLabel = document.createElement('label');
        fechaFinLabel.textContent = 'Fecha fin';
        formulario.appendChild(fechaFinLabel);

        let fechaFinInput = document.createElement('input');
        fechaFinInput.type = 'date';
        fechaFinInput.name = 'fecha_fin';
        fechaFinInput.required = true;
        formulario.appendChild(fechaFinInput);

        formulario.appendChild(document.createElement('br'));

        // OBJETIVO
        let objetivoLabel = document.createElement('label');
        objetivoLabel.textContent = 'Objetivo';
        formulario.appendChild(objetivoLabel);

        let objetivoInput = document.createElement('input');
        objetivoInput.type = 'text';
        objetivoInput.name = 'objetivo';
        objetivoInput.required = true;
        formulario.appendChild(objetivoInput);
        
        formulario.appendChild(document.createElement('br'));

        // ACTIVO
        let activoLabel = document.createElement('label');
        activoLabel.textContent = 'Activo';
        formulario.appendChild(activoLabel);

        let activoInput = document.createElement('input');
        activoInput.type = 'checkbox';
        activoInput.name = 'activo';
        formulario.appendChild(activoInput);

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
        botonCancelar.addEventListener('click', () => cargarPlanes());
        formulario.appendChild(botonCancelar);

        // Agregar el formulario al contenedor
        contenedor.appendChild(formulario);

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            let datos = Object.fromEntries(new FormData(formulario));

            fetch('/api/plan/crear', {
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
                        alert('Plan creado correctamente');
                        cargarPlanes();
                    } else {
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(() => {
                alert('Error al crear el plan');
            });
        });
    }

    function eliminarPlan(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar este plan?')) {
            return;
        }
        
        fetch(`/api/plan/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            return response.json().then(data => {
                if(response.ok) {
                    cargarPlanes(); // Recargar la tabla después de eliminar el plan
                } else {
                    alert(data.message || 'Error');
                }
            })
        })
        .catch(() => {
            alert('Error al eliminar el plan');
        });
    }

    async function editarPlan(id) {
        let contenedor = document.getElementById('contenido');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        let formulario = document.createElement('form');

        let plan = await fetch('/api/plan', {
                method:'GET',
                headers: {
                    'Accept':'application/json',
                },
            })
            .then(response => {
                return response.json().then(function(data) {
                    if(response.ok) {
                        for (let planData of data) {
                            if (planData['id'] == id) return planData;
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
        titulo.textContent = 'Editar un Plan';
        formulario.appendChild(titulo);

        // NOMBRE
        let nombreLabel = document.createElement('label');
        nombreLabel.textContent = 'Nombre';
        formulario.appendChild(nombreLabel);

        let nombreInput = document.createElement('input');
        nombreInput.type = 'text';
        nombreInput.name = 'nombre';
        nombreInput.value = plan.nombre;
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
        descripcionInput.value = plan.descripcion;
        descripcionInput.required = true;
        formulario.appendChild(descripcionInput);

        formulario.appendChild(document.createElement('br'));

        // FECHA INICIO
        let fechaInicioLabel = document.createElement('label');
        fechaInicioLabel.textContent = 'Fecha inicio';
        formulario.appendChild(fechaInicioLabel);
        
        let fechaInicioInput = document.createElement('input');
        fechaInicioInput.type = 'date';
        fechaInicioInput.name = 'fecha_inicio';
        fechaInicioInput.value = plan.fecha_inicio;
        fechaInicioInput.required = true;
        formulario.appendChild(fechaInicioInput);
        
        formulario.appendChild(document.createElement('br'));

        // FECHA FIN
        let fechaFinLabel = document.createElement('label');
        fechaFinLabel.textContent = 'Fecha fin';
        formulario.appendChild(fechaFinLabel);

        let fechaFinInput = document.createElement('input');
        fechaFinInput.type = 'date';
        fechaFinInput.name = 'fecha_fin';
        fechaFinInput.value = plan.fecha_fin;
        fechaFinInput.required = true;
        formulario.appendChild(fechaFinInput);

        formulario.appendChild(document.createElement('br'));

        // OBJETIVO
        let objetivoLabel = document.createElement('label');
        objetivoLabel.textContent = 'Objetivo';
        formulario.appendChild(objetivoLabel);

        let objetivoInput = document.createElement('input');
        objetivoInput.type = 'text';
        objetivoInput.name = 'objetivo';
        objetivoInput.value = plan.objetivo;
        objetivoInput.required = true;
        formulario.appendChild(objetivoInput);
        
        formulario.appendChild(document.createElement('br'));

        // ACTIVO
        let activoLabel = document.createElement('label');
        activoLabel.textContent = 'Activo';
        formulario.appendChild(activoLabel);

        let activoInput = document.createElement('input');
        activoInput.type = 'checkbox';
        activoInput.name = 'activo';
        activoInput.checked = plan.activo == 1;
        formulario.appendChild(activoInput);

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
        botonCancelar.addEventListener('click', () => cargarPlanes());
        formulario.appendChild(botonCancelar);

        // Agregar el formulario al contenedor
        contenedor.appendChild(formulario);

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            let datos = Object.fromEntries(new FormData(formulario));

            datos["activo"] = datos["activo"] == "on" ? 1 : 0;

            fetch(`/api/plan/${id}`, {
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
                        alert('Plan editado correctamente');
                        cargarPlanes();
                    } else {
                        console.log(data.data)
                        alert(data.message || 'Error');
                    }
                })
            })
            .catch(() => {
                alert('Error al editar el plan');
            });
        });
    }
});