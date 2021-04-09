/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor(){
        
        this.missed = 0; // Track the number of missed guesses by the player.
        this.phrases = this.createPhrases();
        this.activePhrase = null; // Phrase object that is currently in play.
    }

    /**
	 * Hides the start game overlay and begin game by selecting  a random phrase.
	 */
    startGame(){
        document.getElementById('overlay').style.display = 'none'; // Hides the start screen overlay
        this.activePhrase = this.getRandomPhrase(); // Sets the activephrase property to the chosen phrase.
                                                    // It creates a new instance of the Phrase class

        console.log(this.activePhrase);                                           
        this.activePhrase.addPhraseToDisplay();

        /*
        addPhraseToDisplay belongs to the Phrase class. It is only accessible to Phrase
        objects. In Game Class, I'm creating a new Phrase object called activePhrase. This
        is why I need to use 'this.activePhrase.addPhraseToDisplay()'. 
        If I were to try and use 'this.addPhraseToDisplay()', I would need to have an addPhraseToDisplay 
        method in my Game class, which it does not have. 
        */
    }

    /**
    * Creates 5 phrases objects
    * @return {array} An array of phrases used in the game
    */
    createPhrases(){
        const phrases = [
                        new Phrase('Hi Toby'),
                        new Phrase ('Good morning jefri'),
                        new Phrase ('Good Afternoon Sol'),
                        new Phrase ('Bye Justin'),
                        new Phrase ('My name is solange')
                        ];
        return phrases;
    }

    /** 
    * Randomly selects a phrase from the phrases array.
    *   @return  {object}   return a phrase object
    */
    getRandomPhrase(){
        const randomPhrase = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomPhrase];
    }


   /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button){
        button.disabled = true; // Disable the selected letter button.
        // If the phrase include the check letter (button.textcontent)
        if (this.activePhrase.checkLetter(button.textContent)){
            button.classList.add('chosen'); // Add .chosen class
            this.activePhrase.showMatchedLetter(button.textContent); //call the showMatchedLetter 
            // if the player has won the game, call gameover
            if (this.checkForWin()){
                this.gameOver(true);
            }   
        }
        else{
            button.classList.add('wrong');
            this.removeLife();
        }
       }

   /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't won
    */
    checkForWin(){
        const checkHideClass = document.getElementsByClassName('hide');
        // Return true if there are only elements with class .show 
        if (checkHideClass.length === 0){
            return true;
        }
        else {
            return false;
        } 
    }
   /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife(){
        const lifeHearts = document.querySelectorAll('.tries img');
        lifeHearts[this.missed].src = 'images/lostHeart.png';
        this.missed += 1;
        if (this.missed === 5){
            this.gameOver(false);
        }

    }


   /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon){
        const overlay = document.getElementById('overlay').style.display = 'block';
        //overlay.classList.remove('start');
        const gameOverMessage = document.getElementById('game-over-message');

        if (gameWon){
            gameOverMessage.textContent = 'You won, Congrats!';
            document.getElementById('overlay').className = 'win';
            
        }
        else {
            gameOverMessage.textContent = 'You lost, maybe next time!';
            document.getElementById('overlay').className = 'lose';
        }
        this.reset();
      
    }
  
    reset(){
        startButton.addEventListener('click', e =>{
            this.startGame();
            // Reset all heart images to display the 'liveHeart.png' image.
            const lostHearts = document.querySelectorAll('.tries img[src$="images/lostHeart.png"]');
            for (const heart of lostHearts){
                heart.src = 'images/liveHeart.png';
            }

            document.querySelector('#phrase ul').innerHTML = ''; //remove all li elements from the phrase ul element.
            this.activePhrase.addPhraseToDisplay();
            //Update each keys to have the .key class and not .chosen/.wrong classes
            for (const key of keyboard){
                    key.disabled = false;
                    key.classList.remove('wrong','chosen');
             
            }
            this.missed = 0;
            
        })
    }
}
