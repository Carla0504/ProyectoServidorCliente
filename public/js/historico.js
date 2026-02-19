//hay que cambiar los innerHTML lo sé

document.addEventListener('DOMContentLoaded', () => {
    cargarHistorico();
});


async function cargarHistorico() {
    const contenedor = document.getElementById('lista-historico');
    
    try {
        const response = await fetch('/api/resultado', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token de sesión 
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al obtener datos');

        const resultados = await response.json();
        renderizarTabla(resultados);

    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = '<p class="error">No se pudo cargar el histórico.</p>';
    }
}

function renderizarTabla(datos) {
    const tablaBody = document.querySelector('#tabla-resultados tbody');
    tablaBody.innerHTML = ''; 

    datos.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.fecha}</td>
            <td>${item.kilometros} km</td>
            <td>${item.duracion}</td>
            <td>${item.velocidad_media} km/h</td>
            <td><button onclick="verDetalle(${item.id})">Detalles</button></td>
        `;
        tablaBody.appendChild(row);
    });
}


async function verDetalle(id) {
    const res = await fetch(`/api/resultado/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const detalle = await res.json();
    alert(`Comentario del entrenamiento: ${detalle.comentario || 'Sin comentarios'}`);
}