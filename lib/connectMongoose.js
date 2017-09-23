"use strict";

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', (err) => {
    console.log('error de conexion', err);
    process.exit(1);
});

conn.once('open', () =>{
    console.log('Conectado a MongoDB');
});

// la cadena de conexion es como una url pero con protocolo mongodb
mongoose.connect('mongodb://localhost/')

// no necesitamos exportar la conexion ya que mongoose
// se encarga de mantenerla internamente
