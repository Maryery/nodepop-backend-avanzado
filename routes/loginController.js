'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');


class LoginController {

    /**
     * POST /api/authenticate
     */

    async postJWT(req, res, next) {
        try {
            // collect input parameters
            const email = req.body.email;
            const password = req.body.password;

            // search the user in the database
            const usuario = await Usuario.findOne({ email: email });

            // if the user does not exist or the password does not match
            if (!usuario || !await bcrypt.compare(password, usuario.password)) {
                const error = new Error('invalid credentials');
                error.status = 401;
                next(error);
                return;
            }

            // I find the user and the password is correct


            // create a jsw
            const token = jwt.sign({ _id: usuario._id}, process.env.JWT_SECRET, {
                expiresIn: '2d'
            });

            // reply
            res.json({ token: token});

        } catch (err) {
            next(err);
        }
    }
}

module.exports = new LoginController();