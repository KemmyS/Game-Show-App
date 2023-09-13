const qwerty = document.getElementById("qwerty");

const phraseContainer = document.getElementById("phrase");
const phraseUl = phraseContainer.firstElementChild;

const overlay = document.querySelector("#overlay");
const overlayHeading = document.querySelector(".title");

//found 2 bugs
// After 3 wins, the previous phrase is combined with current phrase
// After 3 losses the hearts/tries are doubled

const startGame = document.querySelector(".btn__reset");
startGame.addEventListener("click", (e) => {
  overlay.classList.remove("win");
  overlay.classList.add("start");
  overlay.style.display = "none";
});

const gameOverHeading = document.querySelector(".game-over");
const scoreBoardContainer = document.querySelector("#scoreboard");
const scoreBoard = scoreBoardContainer.firstElementChild;

const tries = scoreBoard.children;
const numberOfTries = tries.length;

let missed = 0;

const phrases = [
  "Sierra Leone",
  "Liberia",
  "Guinea",
  "Senegal",
  "Ghana",
  "Nigeria",
];

function successFailureBtn() {
  startGame.style.color = "green";
  startGame.style.width = "150px";
  startGame.style.height = "50px";
  startGame.style.padding = "12px";
  startGame.style.boxShadow = "5px 5px 5px 0px rgba(176, 164, 164, 1)";
}

/**
 * Retrieves a random phrase from an array and returns
 * that phrase as a character array.
 *
 * @param {String[]} arr the array of phrases
 * @returns an array of a string phrase from the phrases array.
 */
function getRandomPhraseAsArray(arr) {
  //A random number that's between 0 and array.length - 1
  const randomNumber = Math.floor(Math.random() * (arr.length - 1));

  // Use randomNumber to get a random index,
  // and the random index to get a random phrase.
  const phrase = arr[randomNumber];

  //Taking sentences and turning it into letters including spaces, etc
  //Turn phrase from string to an array[] of characters, using split()
  const phraseArray = phrase.split("");

  // return character array
  return phraseArray;
}

/**
 * Create an addPhraseToDisplay function
 * @param {*} arr
 */
function addPhraseToDisplay(arr) {
  // loop through an array of characters
  for (let i = 0; i < arr.length; i++) {
    //Create an empty <li> using the DOM
    const listItem = document.createElement("li");

    //Store the array element inside the <li> as text
    listItem.textContent = arr[i].toLowerCase();

    //Character in the array is not a space.
    if (arr[i] !== " ") {
      //Add the class “letter” to the list item
      listItem.classList.add("letter");
    }

    // Add the <li> as a child of the <ul> through the DOM
    phraseUl.append(listItem);
  }
}

// call the getRandomPhraseAsArray function as a variable
// and pass the phrases array to as its parameter.
const randomPhrase = getRandomPhraseAsArray(phrases);

// call addPhraseToDisplay and pass randomPhrase as a parameter
addPhraseToDisplay(randomPhrase);

/**
 * Create a checkLetter function.
 * @param {*} btn
 * @returns
 */
function checkLetter(btn) {
  // Create variable with a class of “letter”
  const listItems = phraseUl.childNodes;

  // Store the matching letter inside of a variable,
  let matchingLetter = null;

  // loop over the letters
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];

    // If there’s a match,add the “show” class
    //  to the list item containing that letter,
    if (btn.textContent === listItem.textContent) {
      listItem.classList.add("show");

      // store the matching letter inside of a variable
      matchingLetter = btn.textContent;
    }
  }

  //   return that letter.
  return matchingLetter;
}

qwerty.addEventListener("click", (e) => {
  // event delegation to listen only to button events.
  if (e.target.tagName === "BUTTON") {
    const clickedBtn = e.target;

    // add the “chosen” class to button
    clickedBtn.classList.add("chosen");

    // set “disabled” attribute to true
    // so the same letter can’t be chosen twice.
    clickedBtn.disabled = true;

    // call the checkLetter function and pass clickedBtn
    const letterFound = checkLetter(clickedBtn);

    const scoreBoardTries = scoreBoard.children;
      if (letterFound === null) {

        if(missed < 5) {
          const scoreBoardTryImg = scoreBoardTries[missed].firstElementChild;
          console.log(scoreBoardTryImg);
          // scoreBoard.removeChild(scoreBoardTries);
          // change liveHeart image to a lostHeart image.
          scoreBoardTryImg.src = "/images/lostHeart.png";
          //   increment the missed counter
        }
        missed++;
      }
    // If player guessed the wrong letter
    // remove one of the tries from the scoreboard.
    

    checkWin();
  }
});

// Create a checkWin function
function checkWin() {
  const listItems = [...phraseUl.childNodes];

  // Create variable with a class of “letter”
  const letteredListItems = listItems.filter((li) =>
    li.classList.contains("letter")
  );

  // Create variable with a class of “show”
  const shownListItems = listItems.filter((li) =>
    li.classList.contains("show")
  );

  // check if player has chosen all correct letters
  if (letteredListItems.length == shownListItems.length) {
    setTimeout(() => {
      overlay.classList.remove("start");
      overlay.classList.remove("lose");
      overlay.classList.add("win");
      overlay.style.display = "flex";

      gameOverHeading.textContent = "You Won!";
      gameOverHeading.style.display = "flex";
      gameOverHeading.style.margin = "20px auto";
      gameOverHeading.style.fontSize = "50px";
      gameOverHeading.style.fontWeight = "700";

      //Change the "Start Game" Button through the DOM
      successFailureBtn();
      startGame.textContent = "Play Again";
      startGame.addEventListener("click", winReset);
    }, 2000);
  }

  // check if player has chosen all wrong letters
  if (missed > 4) {
    overlay.classList.remove("win");
    overlay.classList.add("lose");

    overlay.style.display = "flex";

    gameOverHeading.textContent = "You lose!";
    gameOverHeading.style.display = "flex";
    gameOverHeading.style.margin = "20px auto";
    gameOverHeading.style.fontSize = "50px";
    gameOverHeading.style.fontWeight = "700";

    //Change the "Start Game" Button through the DOM
    successFailureBtn();
    startGame.textContent = "Try Again";
    startGame.addEventListener("click", loseReset);
  }
}

function winReset() {
  // Remove all the listItems classes of letter
  const listItems = [...phraseUl.childNodes];
  listItems.forEach((li) => {
    if (li.classList.contains("show")) {
      phraseUl.removeChild(li);
    }
  });

  // Get a new random phrase by
  //  by calling the addPhraseToDisplay function
  // and pass randomPhrase function;
  const randomPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(randomPhrase);

  //Reset the keyboard
  const keyRows = document.querySelectorAll(".keyrow");
  keyRows.forEach((keyRow) => {
    [...keyRow.children].forEach((keyBtn) => {
      keyBtn.classList.remove("chosen");
      keyBtn.disabled = false;
    });
  });

  //Reset the number of tries
  const leftOverTries = numberOfTries - missed;
  if (leftOverTries > 0) {
    resetTries(missed + 1);
  }

  missed = 0;
}

function loseReset() {
  // Remove all the listItems classes of letter
  const listItems = [...phraseUl.children];
  listItems.forEach((li) => {
    phraseUl.removeChild(li);
  });

  // Get a new random phrase by
  //  by calling the addPhraseToDisplay function
  // and pass randomPhrase function;
  const randomPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(randomPhrase);

  //Reset the keyboard
  const keyRows = document.querySelectorAll(".keyrow");
  keyRows.forEach((keyRow) => {
    [...keyRow.children].forEach((keyBtn) => {
      keyBtn.classList.remove("chosen");
      keyBtn.disabled = false;
    });
  });

  //Reset the number of tries
  resetTries(numberOfTries + 1);
  missed = 0;
}

function resetTries(length) {
  const scoreBoardTries = scoreBoard.children;

  for (let i = 0; i < length; i++) {
    const scoreBoardTry = scoreBoardTries[i];
    if(scoreBoardTry) {
      scoreBoardTry.firstElementChild.src = "/images/liveHeart.png";
    }
  }
}
