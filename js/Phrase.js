/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {

    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

   /** 
    * Display phrase on game board.
    */
    addPhraseToDisplay(){
        // String is split between each character
        const letters = this.phrase.split('');
        const ul = document.querySelector('#phrase ul');

        for (let i = 0 ; i < letters.length;  i++){
            let li = document.createElement('li');
            // if the letter is a space
            if (letters[i] == ' '){
                li.setAttribute('class', 'space');
            }
            else{
                li.setAttribute('class', `hide letter ${letters[i]}`);

            }
            li.textContent = letters[i];
            ul.appendChild(li);
        }
       
       
    }

   /** 
    * Checking if user's selected letter is in the phrase
    *   @param {string} letter - Letter the user clicked.
    *   @return  {boolean}   return true if the letter is in the phrase
    */
    checkLetter(letter){
       
        return this.phrase.includes(letter);
    }

   /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter){
        // select all of the letter DOM elements that have a CSS class name that matches
        //the selected letter
        const letters = document.querySelectorAll('.letter');
        for(const char of letters) {
            // if the letters on the board matches the player's selection
            if (char.innerText === letter) {
            //replace each selected element's hide CSS class with the show CSS class.
               char.classList.remove('hide');
               char.classList.add('show');
            } 

       
        }
    }

 }