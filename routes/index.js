"use strict";



const express = require('express');
const router = express.Router();

const Anuncio = require('../models/Anuncio');


/*GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.params)
  Anuncio.find({}, (err,lista) => {
  if (err){
    console.log('Error')
    next(err);
    return;
  } 
  res.render('index', { 
    title: 'Nodepop',
    anuncios: lista
  
  });
});
});

 // recupera lista de tags del modelo Anuncio
 router.get('/tags', function(req, res, next) {
    Anuncio.listTags({} ,(err,tagList)=>{   
      if (err){
        console.log('Error', err);
        next(err);
        return;
      }
      res.json({ success:true, rows:tagList });
  
    });
   });





 
module.exports = router;

