const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
const keys = require('./keys')


module.exports = {
    fetchCharacterByName:  async function (name) {
        let apiKeyName = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
        const characterId = await api_helper.make_API_call(apiKeyName)
        .then(response => {
            return(response.data.results[0].id);
        })
        .catch(error => {
            console.log(error);
        });
        
        let apiKeyId = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
        
        const character = await api_helper.make_API_call(apiKeyId)
            .then(response => {
                return response.data.results[0]
            })
            .catch(error => {
                console.log(error);
            });

        return character     
    },
    fetchCharacterIdByName: async function (name) {
        let apiKeyName = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
        const characterId = await api_helper.make_API_call(apiKeyName)
            .then(response => {
                return (response.data.results[0].id);
            })
            .catch(error => {
                console.log(error);
            });
        return characterId
    },
    fetchComicsById: async function (id, num) {
        if (num%100 !== 0) {
            num=((Math.floor(num / 100)) +1) * 100
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
        return comics    
    },
    fetchComicsTitlesById: async function (id, num) {

        let comics = [];

        for (let i = 0; i <= num; i += 100) {
            let apiKeyIdComics = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=100&offset=${i}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`
            await api_helper.make_API_call(apiKeyIdComics)
                .then(response => {
                    let data = response.data.results
                    for (let j = 0; j < data.length; j++) {
                        comics.push(data[j].title)
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }
        return comics
    },
    fetchJoinComicList: async function (id1, num1, id2, num2) {
        if (num1 % 100 !== 0) {
            num1 = ((Math.floor(num1 / 100)) + 1) * 100
        }

        if (num2 % 100 !== 0) {
            num2 = ((Math.floor(num2 / 100)) + 1) * 100
        }

        let comicsCounter = {};

        const comicsTitlesList1 = await this.fetchComicsTitlesById(id1, num1)
            .then(response => {
                response.forEach(title =>{
                    if (!comicsCounter[title]) {
                        comicsCounter[title] = 1
                    } else {
                        comicsCounter[title] += 1
                    }
                })
                return comicsCounter
            })
        
        const comicsTitlesList2 = await this.fetchComicsTitlesById(id2, num2)
            .then(response => {
                response.forEach(title => {
                    if (!comicsCounter[title]) {
                        comicsCounter[title] = 1
                    } else {
                        comicsCounter[title] += 1
                    }
                })
                return comicsCounter
            })    

        const joinList = Object.keys(comicsCounter).filter(key => comicsCounter[key] > 1)
        return joinList;
    }
}


