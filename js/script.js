const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");

const startGame = document.querySelector(".btn__reset");
startGame.addEventListener("click", (e) => {});

const missed = 0;
const phrases = [
  "A nut for a jar of tuna",
  "Was it a car or a cat I saw",
  "My six pack is protected by a layer of fat",
  "Never ask a starfish for directions",
  "Never judge a book by its cover",
];


// function getRandomPhraseAsArray(arr) {
//   let phrase = "";

//   //A random number that's between 0 and array.length
//   const randomNumber = getRandomInt(arr.length - 1);

//   //i < arr.length == arr.length - 1
//   //arr[5], but it needs to be arr[4];
//   //loop through array to access its elements
//   for (let i = 0; i < arr.length; i++) {
//     //String === Character[] == Letter[].

//     // Use randomNumber to get a random index, and the random index to
//     // get a random phrase.
//     if (randomNumber == i){
//         //take one phrase from the array, for loop
//         phrase = arr[i];
//     }
    
//   }

//   //Taking sentences and turning it into letters including spaces, etc
//   //Turn phrase from string to an array[] of characters, using split()
//   const phraseArray = phrase.split(" ");

//   console.log(phraseArray);

//   // return character array
//   return phraseArray;
// }

function getRandomPhraseAsArray(arr) {
    //A random number that's between 0 and array.length - 1
    const randomNumber = Math.floor(Math.random() * (arr.length - 1));
    
    // Use randomNumber to get a random index, 
    // and the random index to get a random phrase.
    const phrase = arr[randomNumber];
  
    //Taking sentences and turning it into letters including spaces, etc
    //Turn phrase from string to an array[] of characters, using split()
    const phraseArray = phrase.split(" ");

    // return character array
    return phraseArray;
  }
getRandomPhraseAsArray(phrases);