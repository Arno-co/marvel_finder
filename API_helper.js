const request = require('request');
// const api_helper = require('./API_helper');

module.exports = {
    make_API_call: function (url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    }
}