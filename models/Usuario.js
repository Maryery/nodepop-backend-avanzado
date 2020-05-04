'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create an schema
const usuarioSchema = mongoose.Schema({
    email:  { type: String, unique: true },
    password: String,
});

usuarioSchema.statics.hashPassword = function(plainPassword) {
    return bcrypt.hash(plainPassword, 10);
}

// with the schema, create a model
const Usuario = mongoose.model('Usuario', usuarioSchema);

// export the model
module.exports = Usuario;