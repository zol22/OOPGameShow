/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startButton = document.querySelector('#btn__reset');
const keyboard = document.querySelectorAll('.key');
let game;

startButton.addEventListener('click', (e) => {
    game = new Game();
    game.startGame();
});

for(const key of keyboard){
    key.addEventListener('click',(e)=>{
        game.handleInteraction(key);

        
    })
}
//Let players use their physical computer keyboard to enter guesses
addEventListener('keyup', e => {
    for (const key of keyboard){
        // if what the player is tying is equal to the key button textcontent && key is not disabled
        if (e.key == key.textContent && !key.disabled){
            game.handleInteraction(key);
        }
        
    }
})

