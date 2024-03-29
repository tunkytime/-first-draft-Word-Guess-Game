// global variables
var wins = 0;
var lives = 3;
var pos = 0;
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
"COSMOS",
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
    lose: "You fell into the black hole!",
    wrong: "You're getting closer to the black hole...",
    guessed: "Already guessed, please try again",
    validLetter: "Please enter a letter from A-Z",
    ultimateWinner: "Whew! You escaped the black hole... for now.",
	ultimateLoser: "You fell into the massive black hole and are gone forever."
  };

// elements
numOfWins = document.getElementById("numWins");
numOfLives = document.getElementById("numLives");
currentWordDisplay = document.getElementById("currentWord");
remainingGuesses = document.getElementById("remainingGuesses");
lettersGuessedDisplay = document.getElementById("lettersGuessed");
message = document.getElementById("message");

function newWord() {
		answer = [];
		lettersGuessedArr = [];
		numberOfGuesses = 25;
		lettersGuessed = lettersMatched = "";
		numLettersMatched = 0;
		
		numOfWins.innerHTML = wins;
		numOfLives.innerHTML = lives;
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

// before game starts
$(window).on("load",function(){
	$("#myModal").modal("show");
});

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
					playSoundCorrect();
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
					numberOfGuesses-=5;
					remainingGuesses.innerHTML = numberOfGuesses;
					message.innerHTML = messages.wrong;
				if (numberOfGuesses === 0) {
					lives--;
					spaceMove();
					playSoundIncorrect();
					changeBg();
					endGame(false);					
				} else {
					gameRound();
					return;
				}
				if (lives === 0) {
					gameOver();
				}
				
			}
		} else {
			message.innerHTML = messages.validLetter;
		}
	};
};

// start get new word or end game if won
function endGame(won) {
	if (won) {
		if (words.length === 0) {
			// all words guessed correctly
			message.innerHTML = messages.ultimateWinner;
			youWin();
		} else {
			// correctly guessed currentWord
			message.innerHTML = messages.win + " The mystery was " + currentWord + ".";
			// randomly choose new word
			newWord();
		}
		
		} else {
			message.innerHTML = messages.lose;
			// randomly choose new word
			newWord();
		}
};

// game over
function gameOver() {
	document.getElementById("gameplay").style.display = "none";
	document.getElementById("gameover").style.display = "block";
	document.getElementById("spaceman-gameover").style.display = "block";
	playSoundGameOver();
	setTimeout(playSoundMusic, 3000);
	// after game ends
};

function youWin() {
	document.getElementById("gameplay").style.display = "none";
	document.getElementById("youwin").style.display = "block";
	playSoundYell();
	setTimeout(playSoundWinningMusic, 2000);
}

function reload() {
  location.reload();
}

// function to move space character
function spaceMove() {
	var spaceman = document.getElementById("spaceman");
	var pos = 0;
	var time = setInterval(frame, 4);
	function frame() {
		if (pos == 120) {
			clearInterval(time);
			spaceman.style.top = "5px";
			spaceman.style.left = "90px";
		} else {
			pos++; 
			spaceman.style.top = pos + 5 + 'px'; 
			spaceman.style.left = pos + 90 + "px";
		}
	}
}

// function to play sound
function playSoundCorrect() {
	document.getElementById("audioCorrect").play();
};

function playSoundIncorrect() {
	document.getElementById("audioIncorrect").play();
}

function playSoundGameOver() {
	document.getElementById("voice").play();
}

function playSoundMusic() {
	document.getElementById("music").play();
}

function playSoundWinningMusic() {
	document.getElementById("winningMusic").play();
}

function playSoundYell() {
	document.getElementById("yell").play();
}

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
		case "COSMOS":
			spaceImg.src = "assets/images/cosmos.jpg";
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

// function to change background image 
var images = [
	"assets/images/bg2.jpg",
	"assets/images/bg3.jpg",
	"assets/images/bg4.jpg",
	"assets/images/bg5.jpg",   
	"assets/images/bg6.jpg",   
];

var index = 0;
	
function changeBg() {
	index = (index + 1 < images.length) ? index + 1 : 0;
		$(".background").fadeOut(300, function(){
		$(this).css("background-image", "url("+ images[index] + ")")
		$(this).fadeIn(300);
  });
}