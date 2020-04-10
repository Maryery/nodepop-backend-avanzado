'use strict';

const mongoose = require('mongoose');

// create an schema
const anuncioSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: {
        type: [String],
        enum: ['work', 'lifestyle', 'motor', 'mobile']
    }
});

anuncioSchema.statics.lista = function(filtro, limit, skip, sort, fields) {
    var query = Anuncio.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
    return query.exec();
};

// with the schema, create a model
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// export the model
module.exports = Anuncio;
