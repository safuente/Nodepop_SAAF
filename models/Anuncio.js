"use strict";

const mongoose = require('mongoose');
var i18n = require("../i18n");


// Definición esquema
const anuncioSchema = mongoose.Schema ({
    nombre: {
        type:String,
        index: true,
        
    },
    venta: Boolean,
    precio: Number,
    foto: { type: String},
    tags: { type : Array, enum :['lifestyle','mobile','motor', 'work'] }
});


// Añadimos método estático (afecta al modelo no solo a la instancia individual)

anuncioSchema.statics.list = function(filter,precio,skip,limit, callback){
    var query = Anuncio.find(filter).find(precio);
    query.skip(skip);
    query.limit(limit);
    query.exec(callback);
};

//Método estático para buscar tags

anuncioSchema.statics.listTags = function(tagList,callback){
    var jsonString = JSON.stringify((Anuncio.schema.path('tags').options.enum),callback);
};


//return Anuncio.schema.path(('tags').enumValues, callback);
  
// Creamos el modelo

const Anuncio = mongoose.model('Anuncio', anuncioSchema);



module.exports = Anuncio;


