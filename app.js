const express = require('express')
const bodyParser = require('body-parser')
const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
const keys = require ('./keys')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Welcome to Marvel Character Finder")
})

app.get('/characters', (req, res) => {
    api_helper.make_API_call(`https://gateway.marvel.com:443/v1/public/characters?ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`)
        .then(response => {
            // res.json(response.data.results.forEach(character => character.name))
            res.json(response.data.results)
            // console.log(response.data.results[0].name)
            // const characters = response.data.results;
            // characters.

        })
        .catch(error => {
            res.send(error)
        })
})
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