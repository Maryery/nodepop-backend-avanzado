'use strict';

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');

/**
 * GET /api/anuncios
 * Returns a list of ads
 */

router.get('/', async (req, res, next) => {
    try {
      const name = new RegExp(req.query.name, "i");
      const sell = req.query.sell;
      const price = req.query.price;
      const tags= new RegExp(req.query.tags, "i");
      const limit = parseInt(req.query.limit || 10000);
      const skip = parseInt(req.query.skip);
      const sort = req.query.sort;
      const fields = req.query.fields;
      const filtro = {};

      if (typeof name !== 'undefined') {
        filtro.name = name; 
      }

      if (typeof sell !== 'undefined') {
        filtro.sell = sell;
      }

      if (typeof tags !== 'undefined') {
        filtro.tags = tags;
      }

      if (typeof price !== 'undefined') {
          if (price.includes('-')) {
            const priceRange = price.split('-');
            if (priceRange.length === 2) {
              filtro.price = { $gte: parseInt(priceRange[0]), $lte: parseInt(priceRange[1]) };
            } else {
              if (price.startsWith('-')) {
                  filtro.price = { $lte: priceRange[1] };
              } else {
                  filtro.price = { $gte: priceRange[0] };
              }
            }  
          } else {
            filtro.price = price;
          }
      }
      const docs = await Anuncio.lista(filtro, limit, skip, sort, fields);
      res.json(docs);
    } catch(err) {
      next(err);
    }    
});
  
const multer = require('multer');
const upload = multer({ dest: './public/assets/img'});

// POST /api/anuncios
// Create a new Ad

router.post('/', upload.single('photo'),  async (req,res,next) => {
  try {
    req.body.photo = req.file.filename;
    const anuncioData = req.body;

    // Create an obj in memory
    const anuncio = new Anuncio(anuncioData);

    // We keep it in the DB
    const anuncioGuardado = await anuncio.save();

    res.status(201).json({ result : anuncioGuardado });

  } catch(err) {
    next(err);
  }
});

module.exports = router;