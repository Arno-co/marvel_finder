# marvel_finder

## Technologies
  * JavaScript
  * Node.js
  * Express
  * Marvel API
  
## About

Marvel Finder is a simple Node / Express app that allows to fetch data from the Marvel API.
I've used different ways of getting the data: routes for the list of characters and an ES5 equivalent of a class to fetch a specific character's information by name. The class takes an optional secondary name / argument to retrieve the number and list of all comics where both characters appear together.

### Setting up
Please run the following command:
```
npm install
```

You need to add a `keys.js` file in the root folder with your public and private Marvel API key:
Please copy this code and insert your keys:
```
module.exports = {
    public: {your Marvel API public key as a string},
    private: {your Marvel API private key as a string}
}
```


### Running the app
Please run the following command:

```
npm run server
```

Open `http://localhost:3000` in your browser

Going to `http://localhost:3000/characters` will output a list of all Marvel characters in the server's terminal and will save all the characters objects in 'characters.json' file in the root folder.

To instantiate an object of CharacterFinder with one or two names, go to `character_finder.js` line 92 / 93 and input the names of the characters you're looking for.

Then go to the terminal in the root folder and run `node character_finder.js`:

```
$ node character_finder.js
```

The results will be displayed in the terminal.

You can also run the following command in Node.js REPL by running the following commands in the root folder terminal:

```
$ node 
```
(opens Node.js REPL)

And then, for example

```
let myFavoriteMarvelCharacter = new CharacterFinder('Carnage')
```
(If you use Node.js REPL, don't forget to comment out or delete lines 92/93 in `character_finder.js` or they will be instantiated as well).
