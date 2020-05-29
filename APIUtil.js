const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
const keys = require('./keys')


module.exports = {
    fetchCharacterByName:  async function (name) {
        let apiKeyName = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
        let characterObject;
        const characterId = await api_helper.make_API_call(apiKeyName)
        .then(response => {
            // let data = JSON.stringify(response.data.results, null, 2)
            return(response.data.results[0].id);
        })
        .catch(error => {
            console.log(error);
        });
        
        let apiKeyId = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
        
        const character = await api_helper.make_API_call(apiKeyId)
            .then(response => {
                return response.data.results[0]
                // return JSON.stringify(response.data.results[0], null, 2)
            })
            .catch(error => {
                console.log(error);
            });

        return character    
        // const characterComicInfo = await addCi(character)    
    }
}



