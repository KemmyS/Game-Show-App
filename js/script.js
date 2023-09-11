const qwerty = document.getElementById("qwerty");

const phraseContainer = document.getElementById("phrase");
const phraseUl = phraseContainer.firstElementChild;

const overlay = document.querySelector("#overlay");
const overlayHeading = document.querySelector(".title")

const startGame = document.querySelector(".btn__reset");
startGame.addEventListener("click", (e) => {
    overlay.classList.remove("win");
    overlay.classList.add("start");
  overlay.style.display = "none";
});

const scoreBoardContainer = document.querySelector("#scoreboard");
const scoreBoard = scoreBoardContainer.firstElementChild;
const tries = scoreBoard.childNodes;
// const scoreBoardTry = scoreBoard.firstElementChild;
let missed = 0;

const phrases = [
  "Sierra Leone",
  "Liberia",
  "Guinea",
  "Senegal",
  "Ghana",
  "Nigeria",
];

/**
 * Create an getRandomPhraseAsArray function
 * @param {*} arr
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
  // that loops through an array of characters
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

const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);

/**
 * Create a checkLetter function.
 * @param {*} btn
 * @returns
 */
function checkLetter(btn) {
  // Create variable with a class of “letter”
  const listItems = phraseUl.childNodes;
  console.log(listItems);

  // Store the matching letter inside of a variable,
  let matchingLetter = null;

  // loop over the letters
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    console.log(listItem);

    // If there’s a match,add the “show” class
    //  to the list item containing that letter,
    if (btn.textContent === listItem.textContent) {
      listItem.classList.add("show");
      console.log(`Correct Letter = ${listItem.textContent}`);
    //   console.log(listItems);

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

    const letterFound = checkLetter(clickedBtn);
    console.log(letterFound);

    // If player guessed the wrong letter
    // remove one of the tries from the scoreboard.
    if (letterFound === null) {
      const scoreBoardTry = scoreBoard.firstElementChild;
      scoreBoard.removeChild(scoreBoardTry);

      // changing a liveHeart image to a lostHeart image.
      scoreBoardTry.firstElementChild.src = "/images/lostHeart.png";
      missed++;
    }

    checkWin();
  }

});

// Create a checkWin function
function checkWin(){
    // list items
    const listItems = [...phraseUl.childNodes];

    // Create variable with a class of “show”
    const letteredListItems = listItems.filter((li) => li.classList.contains("letter"));
    // console.log(`letter class: ${letteredListItems}`);

    const shownListItems = listItems.filter((li) => li.classList.contains("show"));
    // console.log(`show class: ${shownListItems}`);

    // check if player has chosen all correct letters
   if(letteredListItems.length == shownListItems.length){
    overlay.classList.remove("start");
    overlay.classList.add("win");
    overlayHeading.textContent = "Congratulations! you have won the game";
    overlay.style.display = "flex";
    winReset();
   }

   console.log(missed);
   if(missed > 4){

    overlay.classList.add("lose");
    overlayHeading.textContent = "Sorry! you lose the game";
    overlay.style.display = "flex";
    loseReset();
   }
}

function winReset(){
    const listItems = [...phraseUl.childNodes];
    listItems.forEach((li) => {
        if(li.classList.contains("show")){
            phraseUl.removeChild(li);
        }
    })
    
    // Remove all the listItems classes of letter
    // Get a new random phrase
    const randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);

    //Reset the keyboard?
    const keyRows = document.querySelectorAll(".keyrow")
    keyRows.forEach((keyRow) => {
        [...keyRow.children].forEach((keyBtn) => {
            keyBtn.classList.remove("chosen");
            keyBtn.disabled = false;
        });
    });

    missed = 0;
}

function loseReset(){
    const listItems = [...phraseUl.childNodes];
    listItems.forEach((li) => {
        if(li.classList.contains("show")){
            phraseUl.removeChild(li);
        }
    })
    
    // Remove all the listItems classes of letter
    // Get a new random phrase
    const randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);

    //Reset the keyboard?
    const keyRows = document.querySelectorAll(".keyrow")
    keyRows.forEach((keyRow) => {
        [...keyRow.children].forEach((keyBtn) => {
            keyBtn.classList.remove("chosen");
            keyBtn.disabled = false;
        });
    });

    missed = 0;
}
