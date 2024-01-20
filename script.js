async function cargarCanciones() {
    const response = await fetch('http://localhost:3000/canciones');
    const canciones = await response.json();

    const listaCanciones = document.getElementById('canciones-lista');
    listaCanciones.innerHTML = '';

    canciones.forEach(cancion => {
        const cancionElemento = document.createElement('div');
        cancionElemento.innerHTML = `
            ${cancion.id} - ${cancion.Artista} - <strong>${cancion.Cancion}</strong> - Tono: ${cancion.Tono}
            <button onclick="editarCancion('${cancion.id}')">Editar</button>
            <button onclick="eliminarCancion('${cancion.id}')">Eliminar</button>
            <div id="formulario-edicion-${cancion.id}" style="display: none;">
                <label for="editCancion-${cancion.id}">Nueva Canción:</label>
                <input type="text" id="editCancion-${cancion.id}" value="${cancion.Cancion}">

                <label for="editArtista-${cancion.id}">Nuevo Artista:</label>
                <input type="text" id="editArtista-${cancion.id}" value="${cancion.Artista}">

                <label for="editTono-${cancion.id}">Nuevo Tono:</label>
                <input type="text" id="editTono-${cancion.id}" value="${cancion.Tono}">

                <button onclick="guardarEdicion('${cancion.id}')">Guardar</button>
            </div>
        `;
        listaCanciones.appendChild(cancionElemento);
    });
}

function editarCancion(id) {
    const formularioEdicion = document.getElementById(`formulario-edicion-${id}`);
    formularioEdicion.style.display = 'block';
}

function guardarEdicion(id) {
    const nuevaCancion = document.getElementById(`editCancion-${id}`).value;
    const nuevoArtista = document.getElementById(`editArtista-${id}`).value;
    const nuevoTono = document.getElementById(`editTono-${id}`).value;

    fetch(`http://localhost:3000/canciones/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Cancion: nuevaCancion, Artista: nuevoArtista, Tono: nuevoTono }),
    })
    .then(response => response.json())
    .then(() => {
        const formularioEdicion = document.getElementById(`formulario-edicion-${id}`);
        formularioEdicion.style.display = 'none';
        cargarCanciones();
    });
}


async function agregarCancion() {
    const cancion = document.getElementById('cancion').value;
    const artista = document.getElementById('artista').value;
    const tono = document.getElementById('tono').value;

    if (cancion && artista && tono) {
        const response = await fetch('http://localhost:3000/canciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Cancion: cancion, Artista: artista, Tono: tono }),
        });

        document.getElementById('formulario-cancion').reset();

        cargarCanciones();
    } else {
        alert('Completa todos los campos del formulario.');
    }
}

window.onload = cargarCanciones;


async function eliminarCancion(id) {
    const confirmacion = confirm("¿Estás seguro de eliminar esta canción?");
    if (confirmacion) {
        const response = await fetch(`http://localhost:3000/canciones/${id}`, { method: 'DELETE' });

        cargarCanciones();
    }
}
