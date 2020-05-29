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
    console.log(character.id)
    console.log(character.comics.available)
    return character
}

CharacterFinder.prototype.getComicsById = async function(id, num) {
    let comics = await APIUtil.fetchComicsTitlesById(id, num)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log(error);
        });
    console.log(typeof comics)
    return comics
}

CharacterFinder.prototype.getJoinComicList = async function(id1, num1, id2, num2) {
    let comics = await APIUtil.fetchJoinComicList(id1, num1, id2, num2)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log(error);
        });
    console.log(typeof comics)
    console.log(comics)
    console.log(comics.length)
    return comics
}



let c = new CharacterFinder('Emma Frost');
// c.getCharacterByName("Storm")
// c.getCharacterByName("Emma Frost")
c.getCharacterByName("Storm")
c.getCharacterByName("Emma Frost")
// c.getComicsById(1009310, 392)
c.getJoinComicList(1009629, 829, 1009310, 392)
// c.getJoinComicList(1009695, 30, 1009696, 49)
