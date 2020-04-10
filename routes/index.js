'use strict';

var express = require('express');
var router = express.Router();
const { query, validationResult } = require('express-validator');
const anuncioRequest = require('./api/calls/internalRequest');

router.get('/', async function (req, res, next) {
  try {
    let queryparams = '';
    for (let i = 1; i < req.url.length; i++){
      queryparams += req.url[i];
    }
    console.log(queryparams);
    const dbData = await anuncioRequest(queryparams);
    if (dbData[0] === 'error'){
      throw(dbData[1]);
    }
    res.render('index', {
      title: 'Nodepop',
      data: dbData,
    });
  }
  catch (err) {
    next(err);
  }
});

router.get('/api/anuncios', [
  query('name').isString().withMessage('Must be a string'),
  query('sell').isBoolean().withMessage('Must be a boolean'),
  query('price').isNumeric().withMessage('Must be a number'),
  query('photo').isString().withMessage('Must be a string'),
  query('tags').isString().withMessage('Must be a string'), 
], (req, res, next) => {
    validationResult(req).throw(); //throw exception if there are validation errors
    console.log(req.query);
    res.send(req.query);
});

router.get('/tags', [
  query('tags').isString().withMessage('Must be a string'),
], (req, res, next) => {
  validationResult(req).throw(); //throw exception if there are validation errors
  console.log(req.query);
  res.send(req.query);
});

router.post('/api/anuncios', [
  query('name').isString().withMessage('Must be a string'),
  query('sell').isBoolean().withMessage('Must be a boolean'),
  query('price').isNumeric().withMessage('Must be a number'),
  query('photo').isString().withMessage('Must be a string'),
  query('tags').isString().withMessage('Must be a string'), 
], (req, res, next) => {
    validationResult(req).throw(); //throw exception if there are validation errors
    console.log(req.body);
    res.send('ok');
});

module.exports = router;
