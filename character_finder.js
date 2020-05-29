const axios = require('axios');
const keys_helper = require('./keys_helper')
const keys = require('./keys')
const APIUtil = require('./APIUtil')


function CharacterFinder (primaryCharacter, secondaryCharacter = null) {
    this.primaryCharacter = primaryCharacter;
    this.secondaryCharacter = secondaryCharacter;

}

CharacterFinder.prototype.getId = function () {
    APIUtil.fetchCharacterByName(this.primaryCharacter)
}



let c = new CharacterFinder('Storm');
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