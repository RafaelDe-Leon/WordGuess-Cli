//NPM modules to obtain player input (letter guesses) and to add color to the display
var Word = require("./word.js");
var inquirer = require('inquirer');
var colors = require('colors');

wordList = ["YOSHI", "MARIO", "PEACH", "LUIGI", "DAISY", "BOWSER", "PAULINE", "TOAD", "MARTH", "ROSALINA", "PETEY PIRANHA", "LUCINA", "DONKEY KONG", "LINK", "ZELDA", 'FALCON', "FOX"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

//Chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'chosenWord' is used for comparison later to check if the word is solved
function startGame() {
    if (wordList.length<2) {
        
        wordList = ["YOSHI", "MARIO", "PEACH", "LUIGI", "DAISY", "BOWSER", "PAULINE", "TOAD", "MARTH", "ROSALINA", "PETEY PIRANHA", "LUCINA", "DONKEY KONG", "LINK", "ZELDA", 'FALCON', "FOX"];
    }
    select = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 10 letter guesses to find the Nintendo character.\n".cyan)
    promptUser();
}

//Allows the user to input a letter guess, restarts the game if player is out of wrong guesses.
function promptUser() {
    if (counter < 10) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter.".blue
            }
        ]).then(function(data) {
                checkAnswer(data);
        });
    }
    else{
        console.log("\nSorry, you're out of guesses.\n".red.inverse);
        console.log("\n" + chosenWord.rainbow);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

//checks that the user's input is in correct format and compares the letter to gameWord to see if guess is correct
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n".red);
            counter++;
            console.log(((10 - counter) + " guesses remaining").red);
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n".yellow);
        promptUser();
    }
}

//If the user's guess is correct, the word array displays the word with the guessed letter(s), 
//If the entire word is correct (filled in), the game restarts.
function rightGuess() {
    console.log("\nYou guessed correctly.\n".green);
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord().america);
        console.log('\nYou win!!\n'.america);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();