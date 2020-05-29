const axios = require('axios');
const keys_helper = require('./keys_helper')
const keys = require('./keys')
const APIUtil = require('./APIUtil')


function CharacterFinder (primaryCharacterName, secondaryCharacterName = null) {
    this.primaryCharacterName = primaryCharacterName;
    this.secondaryCharacterName = secondaryCharacterName;
    this.primaryCharacterObject = {}

}

CharacterFinder.prototype.getCharacterByName = async function(name) {
    let character = await APIUtil.fetchCharacterByName(name)
    .then(response => {
       return response
    })
    .catch(error => {
        console.log(error);
    });
    console.log(character.name)
    return character
}

CharacterFinder.prototype.getComicsById = async function(id, num) {
    let comics = await APIUtil.fetchComicsById(id, num)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log(error);
        });
    console.log(comics)
    return comics
}



let c = new CharacterFinder('Emma Frost');
c.getCharacterByName("Emma Frost")
c.getComicsById(1009310, 392)

async function foo() {
    try {
        const result = await doSomething();
        const newResult = await doSomethingElse(result);
        const finalResult = await doThirdThing(newResult);
        console.log(`Got the final result: ${finalResult}`);
    } catch (error) {
        failureCallback(error);
    }
}