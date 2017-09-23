"use strict";

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

router.get('/', (req, res, next) => {
    const tag = req.query.tag;
    const venta = req.query.venta;
    var precio = req.query.precio;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const nombre= req.query.nombre;
    const filter = {};
    
    if (nombre) {
        filter.nombre = new RegExp('^' +   req.query.nombre,   "i");;
    }

    if (venta) {
        filter.venta = venta;
    }

    if(tag){
        filter.tags = tag;  
    }
    
    if (precio) {
        if (req.query.precio==='10-50') {
            precio={   'precio': {  '$gte':   '10',   '$lte':   '50'  }   }
        }
        else if (req.query.precio==='10-') {
            precio =  { precio:   {   '$gte': '10'   }   };
        }
        else if (req.query.precio==='-50') {
            precio = {   precio:   {   '$lte':'50'   }   }
        }
        else if(req.query.precio==='50') {
            precio = {  precio:   '50' }
        }
        else{
            precio=== req.query.precio
        }
         
    }
   
  

// recuperar una lista de anuncios
Anuncio.list(filter,precio, skip, limit, (err,lista)=>{   
   if (err){
    console.log('Error', err);
    next(err);
    return;
    }
    
    res.json({ success: true, rows: lista })
    
});
});

// POST /
//Crear un anuncio
router.post('/', (req, res, next) => {
    const anuncio = new Anuncio(req.body);
    anuncio.save((err, anuncioGuardado)=>{
        if (err) {
            console.log('Error', err);
            next(err);// para que retorne anuncio guardado
            return;
        }
        res.json({success: true, result: anuncioGuardado});

    });
})


module.exports = router;