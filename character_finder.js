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