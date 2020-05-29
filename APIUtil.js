const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
const keys = require('./keys')


module.exports = {
    fetchCharacterByName:  async function (name) {
        let apiKeyName = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
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
    },
    fetchComicsById: async function (id, num) {
        if (num%100 !== 0) {
            num=((Math.abs(num) / 100) +1) * 100
        }
        console.log(num)

        let comics = [];
        
        for (let i=0; i<= num; i+=100 ) {
            let apiKeyIdComics = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=100&offset=${i}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
            await api_helper.make_API_call(apiKeyIdComics)
                .then(response => {
                    let data = response.data.results
                    for (let j = 0; j < data.length; j++) {
                        console.log(data[j].title)
                        comics.push(data[j])
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }
        console.log(comics)   
        return comics    
    }
}



