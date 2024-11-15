const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public'));

// Lectura y parseo del body
app.use( express.json() );


// Rutas
app.use('/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos

const port = process.env.PORT || 3000;

// Escuchar peticiones
app.listen( process.env.PORT, "0.0.0.0", function () {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});