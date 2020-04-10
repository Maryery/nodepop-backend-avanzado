'use strict';

var express = require('express');
var router = express.Router();

const Tag = require('../../models/Tag');

/**
 * GET /tags
 * Returns a list of existing tags
 */
router.get('/', async (req, res, next) => {
    try {
      const tag= new RegExp(req.query.tags, "i");
      const limit = parseInt(req.query.limit || 10000);
      const skip = parseInt(req.query.skip);
      const sort = req.query.sort;
      const fields = req.query.fields;
      const filtro = {};
  
      const docs = await Tag.lista(filtro, limit, skip, sort, fields);
      res.json(docs);
    } catch(err) {
      next(err);
    }
  });

  module.exports = router;