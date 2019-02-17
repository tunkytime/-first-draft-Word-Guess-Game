// array of random words
var words = ["word1", "word12", "word123", "word1234", "word12345"];

// choose a random word
var word = words[Math.floor(Math.random() * words.length)];

// empty array to store answer
var answer = [];
for (var i = 0; i < word.length; i++) {
    answer[i] = "_";
}

// empty array to store letter guesses
var incorrectGuesses = [];


var remainingLetters = word.length;

// start game
// get the player's guess

document.onkeyup = function (event) {
    var guess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(guess);
    console.log(incorrectGuesses);
    console.log(word);
    console.log(answer);

    if (word.indexOf(guess) === -1) {
        incorrectGuesses.push(" " + guess);
    } else {
        // update the game stats
        for (var j = 0; j < word.length; j++) {
            if (word[j] === guess) {
                answer[j] = guess;
                remainingLetters--;
            }
        }
    }
    // display word in HTML

    var displayWord =
        "<p>" + answer.join(" ") + "</p>" +
        "<p>Incorrect Guesses: " + incorrectGuesses + "</p>";

    document.querySelector("#display-word").innerHTML = displayWord;
}
// end of game


/* Display the following on the page: */

/* Press any key to get started! */
// Write in HTML file

/* Wins: (# of times user guessed the word correctly). */
// place inside p tag and assign an id

/* If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`. */

/* As the user guesses the correct letters, reveal them: `m a d o _ _ a`. */

/* Number of Guesses Remaining: (# of guesses remaining for the user). */

/* Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`). */

/* After the user wins/loses the game should automatically choose another word and make the user play it. */