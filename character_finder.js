const axios = require('axios');
const keys_helper = require('./keys_helper')
const keys = require('./keys')
const APIUtil = require('./APIUtil')


function CharacterFinder (primaryCharacter, secondaryCharacter = null) {
    this.primaryCharacter = primaryCharacter;
    this.secondaryCharacter = secondaryCharacter;

}

CharacterFinder.prototype.getId = async function() {
    let character = await APIUtil.fetchCharacterByName(this.primaryCharacter)
    .then(response => {
       return response
    })
    .catch(error => {
        console.log(error);
    });
    console.log(typeof character)
    return character
    // console.log(typeof characterObject)
    // console.log(characterObject.comics.items, 'character')
}



let c = new CharacterFinder('Emma Frost');
c.getId()

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