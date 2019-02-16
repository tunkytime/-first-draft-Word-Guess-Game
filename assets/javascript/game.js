// VARIABLES
var words = ["word1", "word12", "word123", "word1234", "word12345"];
var words = words[Math.floor(Math.random() * words.length)];

var answers = [];
for (var i = 0; i < words.length; i++) {
    answers[i] = "___";
}

var remainingLetters = words.length;

// EVENT LISTENER

document.onkeyup = function (event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(userGuess);

    // CHOOSE RANDOM WORD FROM ARRAY

    var randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(randomWord);
    console.log(answers);

    // IF userGuess IS SOMEWHERE IN THE WORD

    // DISPLAY WORD ON SCREEN

    var displayWord =
        "<p>" + answers.join(" ") + "</p>";

    document.querySelector("#display-word").innerHTML = displayWord;

}

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