const fs = require('fs');

function obtenerRepertorio() {
    return JSON.parse(fs.readFileSync("repertorio.json"));
}

function guardarRepertorio(repertorio) {
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio, null, 2));
}

function agregarCancion(req, res) {
    const nuevaCancion = req.body;

    const repertorio = obtenerRepertorio();

    nuevaCancion.id = (repertorio.length + 1).toString();

    repertorio.push(nuevaCancion);

    guardarRepertorio(repertorio);

    res.json(nuevaCancion);
}

function obtenerCanciones(req, res) {
    const repertorio = obtenerRepertorio();
    res.json(repertorio);
}

function actualizarCancion(req, res) {
    const cancionId = req.params.id;
    const datosActualizados = req.body;

    const repertorio = obtenerRepertorio();

    const cancionExistente = repertorio.find(cancion => cancion.id === cancionId);

    if (cancionExistente) {
        Object.assign(cancionExistente, datosActualizados);

        guardarRepertorio(repertorio);

        res.json(cancionExistente);
    } else {
        res.status(404).send("Canción no encontrada");
    }
}

function eliminarCancion(req, res) {
    const cancionId = req.params.id;

    const repertorio = obtenerRepertorio();

    const cancionIndex = repertorio.findIndex(cancion => cancion.id === cancionId);

    if (cancionIndex !== -1) {
        repertorio.splice(cancionIndex, 1);

        repertorio.forEach((cancion, index) => {
            cancion.id = (index + 1).toString();
        });

        guardarRepertorio(repertorio);
        res.send("Canción eliminada con éxito");
    } else {
        res.status(404).send("Canción no encontrada");
    }
}


module.exports = {
    agregarCancion,
    obtenerCanciones,
    actualizarCancion,
    eliminarCancion
};
