const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const cancionesRoutes = require('./rutas/rutas');

app.use(cors());
app.use(express.json());

app.use("/canciones", cancionesRoutes);

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor siendo escuchado en http://localhost:${puerto}`);
});
