'use strict';

// thumbnail creation service

const cote = require('cote');
const resize = require('../imgThumb');

// declare microservice

const responder = new cote.Responder({ name: 'resize responder'});

// microservice logic

responder.on('Resize', async (req,done) => {
    console.log('service:', req.imgName, Date.now());
    await resize(req.imgName);
    done();
});