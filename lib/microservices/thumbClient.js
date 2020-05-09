'use strict';

//Client of resize image

const cote = require('cote');

const requester = new cote.Requester({ name: 'rezise client'});

function resize(imgName){
    console.log('hola');
    requester.send({
        type: 'Resize',
        imgName,
    });
}

module.exports = resize;