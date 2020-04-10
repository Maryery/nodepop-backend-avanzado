'use strict';

const mongoose = require('mongoose');

// create an schema
const tagSchema = mongoose.Schema({
    tag: {
        type: String,
    }
});

tagSchema.statics.lista = function(filtro, limit, skip, sort, fields) {
    var query = Tag.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
    return query.exec();
};

// with the schema, create a model
const Tag = mongoose.model('Tag', tagSchema);

// export the model

module.exports = Tag;
