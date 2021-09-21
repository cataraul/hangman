// Keyboard's buttons selecting
const buttons = document.querySelectorAll(".key--letter");
// Selecting the hangman

const hangHead = document.getElementById("man-head");
const hangBody = document.getElementById("man-body");
const armL = document.getElementById("armL");
const armR = document.getElementById("armR");
const legL = document.getElementById("legL");
const legR = document.getElementById("legR");
const baseline = document.getElementById("baseline");
const bar = document.getElementById("bar");
const topline = document.getElementById("topline");
const rope = document.getElementById("rope");
// Selecting the word that has to be guessed to display it
const word = document.getElementById("word");
//How many tries has left
const triesLeft = document.getElementById("tries-left-header");
// In how many tries the player has won
const triesNeeded = document.getElementById("tries-needed");
//The word that made the player lose.
const lostWord = document.getElementById("game-lost-word");
//Restart the game button
const playAgain = document.querySelectorAll(".restart");
//Close the modal
const closeModal = document.querySelectorAll(".close-modal");
const modalLose = document.querySelector(".modal-lose");
const modalWin = document.querySelector(".modal-win");
const hangmanParts = [
  legR,
  legL,
  armR,
  armL,
  hangBody,
  hangHead,
  rope,
  topline,
  bar,
  baseline,
];
let words = ["javascript", "ruby", "java", "phyton", "html", "css"];
let tries = 10;

// Function declarations
// Generation random word
function randomWord() {
  let random = Math.floor(Math.random() * words.length);
  return words[random];
}

// Updating the tries left
function updateTries(triesLeft) {
  triesNeeded.textContent = triesLeft;
}
let generatedWord = randomWord();

function showModal(situation) {
  if (situation == "win") {
    modalWin.style.display = "flex";
    modalWin.classList.add("showModal");
  }
  if (situation == "lose") {
    modalLose.style.display = "flex";
    modalLose.classList.add("showModal");
  }
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  triesLeft.innerHTML = `No more tries left!`;
}
function closeModalFunc(situation) {
  // tries = 10;
  // modalWin.style.display = "none";
  // modalLose.style.display = "none";
  // buttons.forEach((button) => {
  //   button.disabled = false;
  // });
  // hangmanParts.forEach((part) => {
  //   part.classList.add("dissapear");
  // });
  // clearInterval(buttonCheck(wordToGuess));
  // createWord();
  location.reload();
}
function createWord() {
  word.innerHTML = "";
  let wordToGuess = generatedWord.split("");
  wordToGuess.forEach((letter) => {
    let span = document.createElement("span");
    span.classList.add("letter");
    let buttonLetter = document.createElement("button");
    buttonLetter.classList.add("letter-button");
    span.appendChild(buttonLetter);
    buttonLetter.textContent = letter;
    word.appendChild(span);
  });
  buttonCheck(wordToGuess);
  if (tries == 10) {
    triesLeft.innerHTML = `Guess The word!`;
  }
  // console.log(wordToGuess);
}
let correctLetters = [];
let triesNeededCounter = 0;
function buttonCheck(wordToGuess) {
  let correctWord = wordToGuess.join("");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      button.disabled = true;
      triesNeededCounter++;
      let buttonValue = this.dataset.char.toLowerCase();
      if (wordToGuess.join("").includes(buttonValue)) {
        let buttonLetter = document.querySelectorAll(".letter-button");
        buttonLetter.forEach((letter) => {
          if (buttonValue === letter.textContent) {
            letter.style.opacity = 1;
            correctLetters.push(buttonValue);
            if (correctLetters.sort().join("") == wordToGuess.sort().join("")) {
              showModal("win");
              triesNeeded.textContent = triesNeededCounter;
            }
          }
        });
      } else {
        tries--;
        triesLeft.innerHTML = `
            You have <span  id="tries-left"> ${tries}</span> tries left. 
            `;
        hangmanParts[tries].classList.remove("dissapear");
        if (tries === 0) {
          showModal("lose");
          lostWord.textContent = correctWord;
        }
      }
    });
  });
}

playAgain.forEach((playAgainButton) => {
  playAgainButton.addEventListener("click", function () {
    // console.log("closing");

    closeModalFunc();
  });
});

createWord();
