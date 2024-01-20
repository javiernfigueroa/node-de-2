// index.js
const express = require('express');
const cors = require('cors')
const app = express();
const cancionesRoutes = require('./rutas/rutas');

app.use(cors());
app.use(express.json());

app.use("/canciones", cancionesRoutes);

const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor siendo escuchado en http://localhost:${puerto}`);
});
