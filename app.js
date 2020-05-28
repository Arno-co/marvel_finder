const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const api_helper = require('./API_helper')
const keys_helper = require('./keys_helper')
// const characters = require('./characters.json')
const keys = require ('./keys')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send(`Welcome to Marvel Character Finder`)
    // res.json(characters.forEach(character => character.name))
})

app.get('/characters', (req, res) => {

    // let writeStream = fs.createWriteStream('./characters.json');

    // for (let i = 0; i <= 200; i += 100) {
    //     api_helper.make_API_call(`https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=${i}&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`)
    //         .then(response => {
    //             res.json(response);
    //             let data = JSON.stringify(response.data.results, null, 2)
    //             console.log(data)
    //             // writeStream.write(data);
    //         })
    //         .catch(error => {
    //             res.send(error)
    //         })
    // }

    // write some data with a base64 encoding
    

    // the finish event is emitted when all data has been flushed from the stream
    // writeStream.on('finish', () => {
    //     console.log('wrote all data to file');
    // });

    // close the stream
    // writeStream.end();


    // const fileName = './characters.json'
    // fs.exists(fileName, function (exists) {
    //     if (exists) {
    //         // get information about the file
    //         fs.stat(fileName, function (error, stats) {
    //             // open the file (getting a file descriptor to it)
    //             fs.open(fileName, "r", function (error, fd) {
    //                 // var buffer = new Buffer(stats.size);

    //                 // // read its contents into buffer
    //                 // fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
    //                 //     var data = buffer.toString("utf8", 0, buffer.length);

    //                 //     console.log(data);
    //                 //     fs.close(fd);
    //                 // });

                    
    //             });
    //         });
    //     }
    // });
    
    api_helper.make_API_call(`https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${Date.now()}&apikey=${keys.public}&hash=${keys_helper.hashedKeys()}`)
        .then(response => {
            res.json(response);
            let data = JSON.stringify(response.data.results, null, 2)
            fs.writeFile('./characters.json', data, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
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