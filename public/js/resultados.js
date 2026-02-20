document.addEventListener('DOMContentLoaded', function() {
    let resultado = document.getElementById('resultados');
    
    if (resultado) {
        resultado.addEventListener('click', function(e) {
            e.preventDefault();
            cargarResultados();  // CORREGIDO: llamada correcta
        });
    }
});
    
function cargarResultados() {
        fetch('/api/resultado', {
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
    botonCrear.textContent = 'Registrar nuevo entrenamiento';
    botonCrear.addEventListener('click', () => crearResultado());
    contenedor.appendChild(botonCrear);

    let tabla = document.createElement('table');
    let cabecera = document.createElement('thead');
    let filaCabecera = document.createElement('tr');

    let columnas = [
        'Fecha',
        'Duración',
        'Kilómetros',
        'Vel. Media',
        'Pulso Medio',
        'Pulso Max',
        'Potencia Media',
        'TSS',
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

    data.forEach(resultado => {
        let fila = document.createElement('tr');

        let valores = [
            resultado.fecha,
            resultado.duracion,
            resultado.kilometros + ' km',
            resultado.velocidad_media ? resultado.velocidad_media + ' km/h' : '-',
            resultado.pulso_medio ? resultado.pulso_medio + ' bpm' : '-',
            resultado.pulso_max ? resultado.pulso_max + ' bpm' : '-',
            resultado.potencia_media ? resultado.potencia_media + ' W' : '-',
            resultado.puntos_estres_tss ? resultado.puntos_estres_tss : '-',
            resultado.comentario || '-'
        ];

        valores.forEach(valor => {
            let td = document.createElement('td');
            td.textContent = valor ?? '-';
            fila.appendChild(td);
        });

        let tdBotones = document.createElement('td');

        let botonVer = document.createElement('button');
        botonVer.textContent = 'Ver detalles';
        botonVer.addEventListener('click', () => verDetalleResultado(resultado.id));
        tdBotones.appendChild(botonVer);

        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', () => editarResultado(resultado.id));
        tdBotones.appendChild(botonEditar);

        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarResultado(resultado.id));
        tdBotones.appendChild(botonEliminar);

        fila.appendChild(tdBotones);
        cuerpo.appendChild(fila);
    });

    tabla.appendChild(cuerpo);
    contenedor.appendChild(tabla);
}

function crearResultado() {
    let contenedor = document.getElementById('contenido');
    contenedor.innerHTML = ''; // Limpiar contenido previo

    let formulario = document.createElement('form');
    
    // TITULO
    let titulo = document.createElement('h2');
    titulo.textContent = 'Registrar nuevo entrenamiento';
    formulario.appendChild(titulo);

    // SESION
    let sesionLabel = document.createElement('label');
    sesionLabel.textContent = 'ID Sesión';
    formulario.appendChild(sesionLabel);

    let sesionInput = document.createElement('input');
    sesionInput.type = 'number';
    sesionInput.name = 'id_sesion';
    sesionInput.required = true;
    formulario.appendChild(sesionInput);
    formulario.appendChild(document.createElement('br'));

    // BICICLETA
    let biciLabel = document.createElement('label');
    biciLabel.textContent = 'ID Bicicleta';
    formulario.appendChild(biciLabel);

    let biciInput = document.createElement('input');
    biciInput.type = 'number';
    biciInput.name = 'id_bicicleta';
    biciInput.required = true;
    formulario.appendChild(biciInput);
    formulario.appendChild(document.createElement('br'));

    // FECHA
    let fechaLabel = document.createElement('label');
    fechaLabel.textContent = 'Fecha';
    formulario.appendChild(fechaLabel);
    
    let fechaInput = document.createElement('input');
    fechaInput.type = 'date';
    fechaInput.name = 'fecha';
    fechaInput.required = true;
    formulario.appendChild(fechaInput);
    formulario.appendChild(document.createElement('br'));

    // DURACION
    let duracionLabel = document.createElement('label');
    duracionLabel.textContent = 'Duración';
    formulario.appendChild(duracionLabel);

    let duracionInput = document.createElement('input');
    duracionInput.type = 'text';
    duracionInput.name = 'duracion';
    duracionInput.placeholder = 'HH:MM:SS';
    duracionInput.required = true;
    formulario.appendChild(duracionInput);
    formulario.appendChild(document.createElement('br'));

    // KILOMETROS
    let kmLabel = document.createElement('label');
    kmLabel.textContent = 'Kilómetros';
    formulario.appendChild(kmLabel);

    let kmInput = document.createElement('input');
    kmInput.type = 'number';
    kmInput.name = 'kilometros';
    kmInput.step = '0.01';
    kmInput.required = true;
    formulario.appendChild(kmInput);
    formulario.appendChild(document.createElement('br'));

    // RECORRIDO
    let recorridoLabel = document.createElement('label');
    recorridoLabel.textContent = 'Recorrido';
    formulario.appendChild(recorridoLabel);

    let recorridoInput = document.createElement('input');
    recorridoInput.type = 'text';
    recorridoInput.name = 'recorrido';
    formulario.appendChild(recorridoInput);
    formulario.appendChild(document.createElement('br'));

    // PULSO MEDIO
    let pulsoMedioLabel = document.createElement('label');
    pulsoMedioLabel.textContent = 'Pulso Medio';
    formulario.appendChild(pulsoMedioLabel);

    let pulsoMedioInput = document.createElement('input');
    pulsoMedioInput.type = 'number';
    pulsoMedioInput.name = 'pulso_medio';
    formulario.appendChild(pulsoMedioInput);
    formulario.appendChild(document.createElement('br'));

    // PULSO MAX
    let pulsoMaxLabel = document.createElement('label');
    pulsoMaxLabel.textContent = 'Pulso Máximo';
    formulario.appendChild(pulsoMaxLabel);

    let pulsoMaxInput = document.createElement('input');
    pulsoMaxInput.type = 'number';
    pulsoMaxInput.name = 'pulso_max';
    formulario.appendChild(pulsoMaxInput);
    formulario.appendChild(document.createElement('br'));

    // POTENCIA MEDIA
    let potenciaMediaLabel = document.createElement('label');
    potenciaMediaLabel.textContent = 'Potencia Media';
    formulario.appendChild(potenciaMediaLabel);

    let potenciaMediaInput = document.createElement('input');
    potenciaMediaInput.type = 'number';
    potenciaMediaInput.name = 'potencia_media';
    formulario.appendChild(potenciaMediaInput);
    formulario.appendChild(document.createElement('br'));

    // POTENCIA NORMALIZADA
    let potenciaNormLabel = document.createElement('label');
    potenciaNormLabel.textContent = 'Potencia Normalizada';
    formulario.appendChild(potenciaNormLabel);

    let potenciaNormInput = document.createElement('input');
    potenciaNormInput.type = 'number';
    potenciaNormInput.name = 'potencia_normalizada';
    formulario.appendChild(potenciaNormInput);
    formulario.appendChild(document.createElement('br'));

    // VELOCIDAD MEDIA
    let velocidadLabel = document.createElement('label');
    velocidadLabel.textContent = 'Velocidad Media';
    formulario.appendChild(velocidadLabel);

    let velocidadInput = document.createElement('input');
    velocidadInput.type = 'number';
    velocidadInput.name = 'velocidad_media';
    velocidadInput.step = '0.01';
    formulario.appendChild(velocidadInput);
    formulario.appendChild(document.createElement('br'));

    // TSS
    let tssLabel = document.createElement('label');
    tssLabel.textContent = 'Puntos Estrés TSS';
    formulario.appendChild(tssLabel);

    let tssInput = document.createElement('input');
    tssInput.type = 'number';
    tssInput.name = 'puntos_estres_tss';
    formulario.appendChild(tssInput);
    formulario.appendChild(document.createElement('br'));

    // IF
    let ifLabel = document.createElement('label');
    ifLabel.textContent = 'Factor Intensidad IF';
    formulario.appendChild(ifLabel);

    let ifInput = document.createElement('input');
    ifInput.type = 'number';
    ifInput.name = 'factor_intensidad_if';
    ifInput.step = '0.01';
    formulario.appendChild(ifInput);
    formulario.appendChild(document.createElement('br'));

    // ASCENSO
    let ascensoLabel = document.createElement('label');
    ascensoLabel.textContent = 'Ascenso (metros)';
    formulario.appendChild(ascensoLabel);

    let ascensoInput = document.createElement('input');
    ascensoInput.type = 'number';
    ascensoInput.name = 'ascenso_metros';
    formulario.appendChild(ascensoInput);
    formulario.appendChild(document.createElement('br'));

    // COMENTARIO
    let comentarioLabel = document.createElement('label');
    comentarioLabel.textContent = 'Comentario';
    formulario.appendChild(comentarioLabel);

    let comentarioInput = document.createElement('textarea');
    comentarioInput.name = 'comentario';
    comentarioInput.rows = 3;
    formulario.appendChild(comentarioInput);
    formulario.appendChild(document.createElement('br'));
    
    // BOTON CREAR
    let botonCrear = document.createElement('button');
    botonCrear.type = 'submit';
    botonCrear.textContent = 'Guardar entrenamiento';
    formulario.appendChild(botonCrear);

    // BOTON CANCELAR
    let botonCancelar = document.createElement('button');
    botonCancelar.type = 'button';
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.addEventListener('click', () => cargarResultados());
    formulario.appendChild(botonCancelar);

    contenedor.appendChild(formulario);

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        let datos = Object.fromEntries(new FormData(formulario));
        
        //convertir campos numericos para que lo pille como es
        if (datos.kilometros) datos.kilometros = parseFloat(datos.kilometros);
        if (datos.pulso_medio) datos.pulso_medio = parseInt(datos.pulso_medio);
        if (datos.pulso_max) datos.pulso_max = parseInt(datos.pulso_max);
        if (datos.potencia_media) datos.potencia_media = parseInt(datos.potencia_media);
        if (datos.potencia_normalizada) datos.potencia_normalizada = parseInt(datos.potencia_normalizada);
        if (datos.velocidad_media) datos.velocidad_media = parseFloat(datos.velocidad_media);
        if (datos.puntos_estres_tss) datos.puntos_estres_tss = parseInt(datos.puntos_estres_tss);
        if (datos.factor_intensidad_if) datos.factor_intensidad_if = parseFloat(datos.factor_intensidad_if);
        if (datos.ascenso_metros) datos.ascenso_metros = parseInt(datos.ascenso_metros);

        fetch('/api/resultado/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(datos)
        })
        .then(response => {
            return response.json().then(data => {
                if(response.ok) {
                    alert('Entrenamiento guardado correctamente');
                    cargarResultados();
                } else {
                    alert(data.message || 'Error al guardar');
                }
            })
        })
        .catch(() => {
            alert('Error al conectar con el servidor');
        });
    });
}

function verDetalleResultado(id) {
    fetch(`/api/resultado/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        let detalles = `
            Fecha: ${data.fecha}
            Duración: ${data.duracion}
            Distancia: ${data.kilometros} km
            Velocidad media: ${data.velocidad_media || '-'} km/h
            Pulso medio: ${data.pulso_medio || '-'} bpm
            Pulso máximo: ${data.pulso_max || '-'} bpm
            Potencia media: ${data.potencia_media || '-'} W
            Potencia normalizada: ${data.potencia_normalizada || '-'} W
            TSS: ${data.puntos_estres_tss || '-'}
            IF: ${data.factor_intensidad_if || '-'}
            Ascenso: ${data.ascenso_metros || '-'} m
            Recorrido: ${data.recorrido || '-'}
            Comentario: ${data.comentario || 'Sin comentarios'}
        `;
        alert(detalles);
    })
    .catch(() => {
        alert('Error al cargar los detalles');
    });
}

function editarResultado(id) {
    alert('Funcionalidad de edición en desarrollo');
}

function eliminarResultado(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este entrenamiento?')) {
        return;
    }
    
    fetch(`/api/resultado/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        return response.json().then(data => {
            if(response.ok) {
                alert('Entrenamiento eliminado');
                cargarResultados();
            } else {
                alert(data.message || 'Error al eliminar');
            }
        })
    })
    .catch(() => {
        alert('Error al conectar con el servidor');
    });
}