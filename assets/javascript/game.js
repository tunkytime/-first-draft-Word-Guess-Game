// document.querySelector("#answer").innerHTML = answer.join(" ");
// document.querySelector("#guessesLeft").innerHTML = guessesLeft;

// global variables

var guessesLeft = 15;
var guesses = [];
var wins = 0;
var losses = 0;

// array of random words
var words = ["WORD1", "WORD2", "WORD3", "WORD4", "WORD5"];

// choose a random word
var word = words[Math.floor(Math.random() * words.length)];

// empty array to store answer
var answer = [];
for (var i = 0; i < word.length; i++) {
  answer[i] = "_";
}

// // start game

document.onkeyup = function (event) {
  var guess = String.fromCharCode(event.keyCode).toUpperCase();

  if (guesses.indexOf(guess) === -1 && word.indexOf(guess) === -1) {
    guesses.push(guess);
    guessesLeft--;
  }
  // update the game stats
  for (var k = 0; k < word.length; k++) {
    if (word[k] === guess) {
      for (var j = 0; j < word.length; j++) {
        if (word[j] === guess) {
          answer[j] = guess;
        }
      }
    }
  }
  if (answer.indexOf("_") === -1) {
    wins++;
    alert("You win!");
    confirm("Play again?");
  }
  if (guesses === 0) {
    alert("You lose!");
    confirm("Play again?");
  }

  // display word in HTML
  var html =
    "<p>Wins</p>" +
    "<p>" + wins + "</p>" +
    "<p>Current Word</p>" +
    "<p>" + answer.join(" ") + "</p>" +
    "<p>Letters Already Guessed: " + guesses.join(" ") + "</p>" +
    "<p>Number of Guesses Remaining: " + guessesLeft + "</p>";

  document.querySelector("#html").innerHTML = html;
  console.log(word.length);
}
// end of game