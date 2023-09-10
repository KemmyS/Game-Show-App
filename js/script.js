const qwerty = document.getElementById("qwerty");

const phraseContainer = document.getElementById("phrase");
const phraseUl = phraseContainer.firstElementChild;

const overlay = document.querySelector("#overlay")
const startGame = document.querySelector(".btn__reset");
startGame.addEventListener("click", (e) => {
    overlay.style.display = "none"
});

const missed = 0;
const phrases = [
  "A nut for a jar of tuna",
  "Was it a car or a cat I saw",
  "My six pack is protected by a layer of fat",
  "Never ask a starfish for directions",
  "Never judge a book by its cover",
];

// Create a getRandomPhraseAsArray function.
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

// Create an addPhraseToDisplay function 
function addPhraseToDisplay(arr){
   
    // that loops through an array of characters
    for( let i = 0; i < arr.length; i++){
        //Create an empty <li></li> using the DOM
        const listItem = document.createElement("li");

        //Store the array element inside the <li></li> as text
        listItem.textContent = arr[i].toLowerCase();

        //Character in the array is not a space.
        if(arr[i] !== " "){
            //Add the class “letter” to the list item
            listItem.classList.add("letter")
        };

        // Add the <li></li> as a child of the <ul></ul> through the DOM
        phraseUl.append(listItem);
    }

}

const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);

// Create a checkLetter function.
function checkLetter(btn){
    // Create variable with a class of “letter”
    const listItems = phraseUl.childNodes;

//    store the matching letter inside of a variable,
    let matchingLetter = null;
  
  // loop over the letters 
  for( let i = 0; i < listItems.length; i++ ){
      const listItem = listItems[i];
  
      // If there’s a match,add the “show” class
      //  to the list item containing that letter, 
      if(btn.textContent === listItem.textContent ){
        listItem.classList.add("show")
  
      // store the matching letter inside of a variable
         matchingLetter = btn.textContent
  
      }
    //   return that letter.
      return matchingLetter;
  }
}

  const qButton = qwerty.firstElementChild.firstElementChild;
  console.log(qButton);
//   console.log(qButton.textContent);
  checkLetter(qButton);