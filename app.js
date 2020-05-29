const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
const keys = require ('./keys')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send(`Welcome to Marvel Character Finder`)
})

app.get('/characters', async (req, res) => {

        let output = [];

        for (i=0; i<=1500; i+=100) {
            let api_key = `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=${i}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`;
            await api_helper.make_API_call(api_key)
            .then(response => {
                let data = response.data.results
                for (let j = 0; j < data.length; j++) {
                    console.log(data[j].name)
                    output.push(data[j])
                }
            })
        }

    fs.writeFileSync('./characters.json', JSON.stringify(output, null, 2), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        });
        
        res.send("The list of Marvel characters names is available on the terminal and the characters are saved in './characters.json' file")

})

// TEST ROUTES

app.get(`/characters/:characterId`, (req, res) => {
    let characterId = req.params.characterId
    api_helper.make_API_call(`https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`)
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})

app.get(`/characters/:characterId/comics`, (req, res) => {
    console.log(req);
    let characterId = req.params.characterId
    api_helper.make_API_call(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`)
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))