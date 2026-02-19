//hay que cambiar los innerHTML lo sé

document.addEventListener('DOMContentLoaded', function() {
    let historico = document.getElementById('historico');
    
    if (historico) {
        historico.addEventListener('click', function(e) {
            e.preventDefault();
            cargarHistorico();
        });
    }
});


function cargarHistorico() {
    fetch('/api/historico-ciclista', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        mostrarTablaHistorico(data);
    })
    .catch(() => {
        alert('Error al cargar histórico');
    });
}

function mostrarTablaHistorico(data) {
    let contenedor = document.getElementById('contenido');
    contenedor.innerHTML = '';

    let tabla = document.createElement('table');

    let columnas = [
        'Fecha',
        'Peso',
        'FTP',
        'Pulso Max',
        'Pulso Reposo',
        'Potencia Max',
        'Grasa Corporal',
        'VO2max',
        'Comentario'
    ];

    let thead = document.createElement('thead');
    let trHead = document.createElement('tr');

    columnas.forEach(col => {
        let th = document.createElement('th');
        th.textContent = col;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    tabla.appendChild(thead);

    let tbody = document.createElement('tbody');

    data.forEach(item => {
        let tr = document.createElement('tr');

        let valores = [
            item.fecha,
            item.peso ?? '-',
            item.ftp ?? '-',
            item.pulso_max ?? '-',
            item.pulso_reposo ?? '-',
            item.potencia_max ?? '-',
            item.grasa_corporal ?? '-',
            item.vo2max ?? '-',
            item.comentario ?? '-'
        ];

        valores.forEach(valor => {
            let td = document.createElement('td');
            td.textContent = valor;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
}

async function verDetalle(id) {
    const res = await fetch(`/api/resultado/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const detalle = await res.json();
    alert(`Comentario del entrenamiento: ${detalle.comentario || 'Sin comentarios'}`);
}