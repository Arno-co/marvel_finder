const keys = require('./keys');
const md5 = require('md5');

module.exports = {
   hashedKeys: function () {
       let ts = Date.now();
        let API_key = md5(ts+keys.private+keys.public);
        return API_key;
    }
}