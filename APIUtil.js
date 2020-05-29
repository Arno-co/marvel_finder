const axios = require('axios');
const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
const keys = require('./keys')


module.exports = {
    fetchCharacterByName:  async function (name) {
        let apiKey = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
        await api_helper.make_API_call(apiKey)
            .then(response => {
                let data = JSON.stringify(response.data.results, null, 2)
                console.log(data[0].id);

            })
            .catch(error => {
                console.log(error);
            });
    }
}