
const mongoose = require('mongoose');
require('../lib/connectMongoose');
const Anuncio = require('../models/Anuncio');
const json = require('../cargar_anuncios/anuncios.json');



Anuncio.collection.deleteMany( function(err,res) {
  if (err) {
    // handle error
    console.log("Error borrando base de datos");
    process.exit(1);
    return;
  } else {
     console.log("Eliminados de la base de datos " + res.result.n+ ' anuncios');
  }
})

Anuncio.collection.insertMany(json, function(err,res) {
    if (err) {
      // handle error
      console.log("Error creando base de datos");
      process.exit(1);
      return;
    } else {
       console.log("Nueva base de datos cargada: "+ res.result.n+ ' anuncios añadidos' )
    }
    mongoose.connection.close()
 })
