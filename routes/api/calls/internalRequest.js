'use strict';

const axios = require('axios').default;

async function anuncioRequest(queryParams) {
    return axios({
        method: 'GET',
        url: `http://localhost:3000/anuncios${queryParams}`,
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            const throwError = ['error', error];
            return throwError;
        })
}

module.exports = anuncioRequest;