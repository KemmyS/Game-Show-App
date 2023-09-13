function reset(hasShowClass = false, leftOverTries) {
  // Remove all the listItems classes of letter
  const listItems = [...phraseUl.childNodes];
  listItems.filter(hasShowClass)
           .forEach((li) => phraseUl.removeChild(li));

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
  if (leftOverTries > 0) {
    resetTries(missed);
  } else{
    resetTries(numberOfTries);
  }

  missed = 0;
}
