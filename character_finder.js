const APIUtil = require('./APIUtil')


function CharacterFinder (primaryCharacterName, secondaryCharacterName = null) {
    this.primaryCharacterName = primaryCharacterName;
    this.secondaryCharacterName = secondaryCharacterName;
    this.primaryCharacterObject = {}

    this.handleRequest(this.primaryCharacterName, this.secondaryCharacterName)
}

CharacterFinder.prototype.handleRequest = async function(name1, name2) {
    if (!name2) {
        let character = await this.getCharacterByName(name1)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error);
            });
        console.log(`Here are the details of ${character.name}:`)
        console.log(JSON.stringify(character, null, 2)) 
    } else {
        let character1 = await this.getCharacterByName(name1)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error);
            });

        let character2 = await this.getCharacterByName(name2)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error);
            });

        let id1 = character1.id;
        let num1 = character1.comics.available;
        let id2 = character2.id;
        let num2 = character2.comics.available;

        const comics = await this.getJoinComicList(id1, num1, id2, num2)  
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error);
            });  
        console.log(`Here is the number of comics where ${name1} and ${name2} appear together: ${comics.length}`)
        console.log(`Here is the list of comics where both characters appear together:`)
        console.log(comics)
    }
}

CharacterFinder.prototype.getCharacterByName = async function(name) {
    let character = await APIUtil.fetchCharacterByName(name)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log(error);
        });
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
    return comics
}


let firstCase = new CharacterFinder('Carnage')
let secondCase = new CharacterFinder('Storm','Emma Frost');

