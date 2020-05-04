'use strict';

// middleware de comprbación de JWT

const jwt = require('jsonwebtoken');

module.exports = function() {
  return (req, res, next) => {
    // recoger el token de la petición
    const token = req.get('Authorization') || req.query.token || req.body.token;
    console.log(token); 
    
    // if they don't give us token they can't pass
    if (!token) {
        const error = new Error('no token provided');
        error.status = 401;
        next(error);
        return;
      }
    
    // verify that the token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            const error = new Error('invalid token');
            err.status = 401;
            next(error);
            return;
        }
        // for to know the user id, inside token
        req.apiAuthUserId = payload._id;
        console.log('._id: '+ payload._id)
        next();
    });
  };
}