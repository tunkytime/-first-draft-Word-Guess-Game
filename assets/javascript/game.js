 
// global variables
var wins = 0;
var answer = [];
var availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYX";
var lettersGuessedArr = [];
var numberOfGuesses;
var currentWord;

// array of words
var words = [
"COMET",
"EARTH",
"GALAXY",
"INTERSTELLAR",
"MOON",
"NEBULA",
"NOVA",
"SUPERNOVA",
"EXTRATERRESTIAL",
"UNIVERSE"
];

// messages to display
  messages = {
    start: "Press any key to begin your journey!",
    win: "Brilliant!",
    lose: "You ran out of guesses!",
    wrong: "Guess again!",
    guessed: "Already guessed, please try again",
    validLetter: "Please enter a letter from A-Z",
    ultimateWinner: "Congratulations! You've guessed all the mystery words!"
  };

// elements
numOfWins = document.getElementById("numWins");
currentWordDisplay = document.getElementById("currentWord");
remainingGuesses = document.getElementById("remainingGuesses");
lettersGuessedDisplay = document.getElementById("lettersGuessed");
message = document.getElementById("message");
	
// display the number of guesses a user has when the game starts
var displayNumberOfGuesses = numberOfGuesses;

//document.querySelector("#numberOfGuesses").innerHTML = displayNumberOfGuesses;

	function newWord() {
		answer = [];
		lettersGuessedArr = [];
		numberOfGuesses = 10;
		lettersGuessed = lettersMatched = "";
		numLettersMatched = 0;
		
		numOfWins.innterHTMl = wins;
		remainingGuesses.innerHTML = numberOfGuesses;
		lettersGuessedDisplay.innerHTML = lettersGuessedArr.join(" ");
		
		// choose random word
		currentWord = words[Math.floor(Math.random() * words.length)];
		updateImg()

		// create the answer array
		for (var i = 0; i < currentWord.length; i++) {
		answer[i] = "_";
		}
		console.log(currentWord);
		console.log(answer);
		currentWordDisplay.innerHTML = answer.join(" ");
		//document.querySelector("#answer").innerHTML = "<p>" + answer.join(" ") + "</p>";
		gameRound();
}; // end newWord function

// run newWord() on load to start game
window.onload = newWord();
window.onload = updateImg();

function gameRound() {
	// get user guess
	document.onkeyup = function() {
		var guess = String.fromCharCode(event.keyCode).toUpperCase();
		console.log("User guess: " + guess);
		
		// test to see if guess is a valid letter (from availableLetter var)
		if (availableLetters.indexOf(guess) > -1) {
			// test to see if the letter has already been guessed
			if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
				message.innerHTML = messages.guessed;
			} else if (currentWord.indexOf(guess) > -1) {
				// add letter guessed to answer array
				for (var i = 0; i < currentWord.length; i++) {
					if (currentWord[i] === guess) {
						answer[i] = guess;
						console.log(answer);
						currentWordDisplay.innerHTML = answer.join(" ");
					}
				}
				// test to see if letter appears more than once
				for (var j = 0; j < currentWord.length; j++) {
					if (currentWord.charAt(j) === guess) {
						numLettersMatched += 1;
					}
				}
				
				lettersMatched += guess;
				console.log("Letters Matched: " + lettersMatched);
				if (numLettersMatched === currentWord.length) {
					// remove word from array that have been played
					words.splice(words.indexOf(`${currentWord}`), 1);
					wins++;
					numOfWins.innerHTML = wins;
					endGame(true);
				}
				
				} else {
					// guess is not in current word and hasn't been guessed yet
					lettersGuessed += guess;
					lettersGuessedArr.push(guess);
					console.log("Letters Guessed: " + lettersGuessed);
					console.log(lettersGuessedArr);		
					lettersGuessedDisplay.innerHTML = lettersGuessedArr.join(" ");
					numberOfGuesses--;
					remainingGuesses.innerHTML = numberOfGuesses;
					message.innerHTML = messages.wrong;
				if (numberOfGuesses === 0) {
					endGame(false);
					spaceMove();
					fadeOut();
				} else {
					gameRound();
					return;
				}
			}
		} else {
			message.innerHTML = messages.validLetter;
		}
	};
};

// function to start new game 
function endGame(won) {
	if (won) {
		if (words.length === 0) {
			// all words guessed correctly
			message.innerHTML = messages.ultimateWinner;
			
		} else {
			// correctly guessed currentWord
			message.innerHTML = messages.win + " The word was " + currentWord + ".";
			// randomly choose new word
			newWord();
		}
		
		} else {
			message.innerHTML = messages.lose + " The correct answer was " + currentWord + ".";
			// randomly choose new word
			newWord();
		}
};

// function to move space character
function spaceMove() {
  var elem = document.getElementById("spaceman");   
  var pos = 0;
  var id = setInterval(frame, 7);
  function frame() {
    if (pos == 120) {
			clearInterval(id);
		} else {
			pos++; 
			elem.style.top = pos + 5 + 'px'; 
			elem.style.left = pos + 90 + "px"; 
		}	
	}
}

// function to fadeout
function fadeOut() {
	var s = document.getElementById("spaceman").style;
	s.opacity = 1;
	(function fade(){(s.opacity-=.5)<0?s.display="none":setTimeout(fade,1000)})();
}

/*

// function to float
function makeNewPosition(){
    
    // Get container dimensions
    var h = $("#spacemanContainer").height();
    var w = $("#spacemanContainer").width();
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
}

function animateDiv(myclass){
    var newPosition = makeNewPosition();
    $(myclass).animate({ top: newPosition[0.75], right: newPosition[1] }, 2000,
	
	function()
		{animateDiv(myclass);        
    });
};

*/

// function to update image to match current word
function updateImg () {
	showImg = currentWord;
	
	switch (showImg) {
		case "COMET":
			spaceImg.src = "assets/images/comet.jpg";
			break;
		case "EARTH":
			spaceImg.src = "assets/images/earth.jpg";
			break;
		case "GALAXY":
			spaceImg.src = "assets/images/galaxy.jpg";
			break;
		case "INTERSTELLAR":
			spaceImg.src = "assets/images/interstellar.jpg";
			break;
		case "MOON":
			spaceImg.src = "assets/images/moon.jpeg";
			break;
		case "NEBULA":
			spaceImg.src = "assets/images/nebula.jpg";
			break;
		case "NOVA":
			spaceImg.src = "assets/images/nova.jpg";
			break;
		case "SUPERNOVA":
			spaceImg.src = "assets/images/supernova.jpg";
			break;
		case "EXTRATERRESTIAL":
			spaceImg.src = "assets/images/extraterrestial.jpg";
			break;
		case "UNIVERSE":
			spaceImg.src = "assets/images/universe.jpg";
			break;
	}
};