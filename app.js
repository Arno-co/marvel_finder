const express = require('express')
const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
const app = express()
const port = 3000


app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call(`https://gateway.marvel.com:443/v1/public/characters?ts=${Date.now()}&apikey=61efcb5ae37b1756a04567d5c5de71c1&hash=${keys_helper.hashedKeys()}`)
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))