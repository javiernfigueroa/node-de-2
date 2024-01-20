const express = require('express');
const router = express.Router();
const repertorioControlador = require('../controladores/controladores');

router.post("/", repertorioControlador.agregarCancion);
router.get("/", repertorioControlador.obtenerCanciones);
router.put("/:id", repertorioControlador.actualizarCancion);
router.delete("/:id", repertorioControlador.eliminarCancion);

module.exports = router;