import dictionary from './dictionary/words.json'

class Game {
  constructor(){
    this.reset();
  }
  reset(){
    this.done = false;
    this.win = false;
    this.turn = 1;
    this.answer = null;
    this.answer_letters = [];
    this.guesses = this.buildGuesses(6);
  }
  buildGuesses(amount){
    let guesses = Array.apply(null, Array(amount))
    return guesses.map( (obj,index) => {
      return {
        active: index === 0,
        letters: [
          { letter: '', position: 0, exact: false, somewhere: false, nowhere: false },
          { letter: '', position: 1, exact: false, somewhere: false, nowhere: false },
          { letter: '', position: 2, exact: false, somewhere: false, nowhere: false },
          { letter: '', position: 3, exact: false, somewhere: false, nowhere: false },
          { letter: '', position: 4, exact: false, somewhere: false, nowhere: false },
        ]
      }
    });
  }
  start(){
    this.reset();
    const random_word = dictionary[Math.floor(Math.random()*dictionary.length)];
    this.answer = random_word;
    this.answer_letters = random_word.split('');
    // this.answer = 'budge'; //budge beady
    // this.answer_letters = this.answer.split('');
  }
  finish(){
    this.win = this.hasCorrectGuess()
    this.done = true;
  }
  hasCorrectGuess(){
    return this.guesses.some(guess => guess.letters.map(guess_letter => guess_letter.letter).join('') === this.answer_letters.join('') );
  }
  isFinished(){
    return this.hasCorrectGuess() || this.turn === 6;
  }
  isNextTurn(){
    return this.isValidGuess() && this.turn < 6;
  }
  checkCurrentGuess(){
    const guess_index = this.guesses.findIndex(guess => guess.active);
    this.guesses[guess_index].letters = this.guesses[guess_index].letters.map( (letter,letter_index,letters) => {
      const has_somewhere_duplicates = this.answer_letters.filter( (answer_letter,i,letters) => {
        return letters[letter_index] !== letter.letter & i !== letter_index && answer_letter === letter.letter
      }).length > 0;
      const unique_somewhere_index = letters.findIndex( (guess_letter,i,letters) => {
        return this.answer_letters[letter_index] !== guess_letter.letter && guess_letter.letter === letter.letter
      });
      const no_exact_elsewhere = letters.findIndex( (guess_letter,i) => guess_letter.letter === letter.letter && this.answer_letters[i] === letter.letter) === -1;
      const is_exact = this.answer_letters[letter_index] === letter.letter;
      const is_somewhere = no_exact_elsewhere && has_somewhere_duplicates && unique_somewhere_index === letter_index;
      return { letter: letter.letter, position: letter.position, exact: is_exact, somewhere: is_somewhere, nowhere: !is_somewhere };
    });
  }
  setNextTurn(){
    this.turn = this.turn + 1;
    const guess_index = this.guesses.findIndex(guess => guess.active);
    this.guesses[guess_index].active = false;
    this.guesses[guess_index + 1].active = true;
  }
  isValidGuess(){
    const guess_index = this.guesses.findIndex(guess => guess.active);
    if(this.guesses[guess_index].letters.filter(guess_letter => !!guess_letter.letter).length !== 5) return;
    const guess_word = this.guesses[guess_index].letters.map(guess_letter => guess_letter.letter).join('').toLowerCase();
    return dictionary.findIndex(entry => entry === guess_word ) !== -1;
  }
  getGuessLetter(turn,letter,letter_index){
    const letter_obj = this.guesses[turn-1].letters.find( (guess_letter,i) => guess_letter.letter === letter && i === letter_index );
    return letter_obj;
  }
  getCurrentGuessLetters(){
    const guess_index = this.guesses.findIndex(guess => guess.active);
    return this.guesses[guess_index].letters.map(guess_letter => guess_letter.letter);
  }
  setGuessLetter(letter){
    const guess_index = this.guesses.findIndex(guess => guess.active);
    if(this.guesses[guess_index].letters.filter(guess_letter => !!guess_letter.letter).length === 5) return this.getCurrentGuessLetters();
    const guess_letter_index = this.guesses[guess_index].letters.findIndex(guess_letter => !guess_letter.letter);
    this.guesses[guess_index].letters[guess_letter_index].letter = letter;
    return this.getCurrentGuessLetters();
  }
  removeGuessLetter(){
    const guess_index = this.guesses.findIndex(guess => guess.active);
    if(this.guesses[guess_index].letters.filter(guess_letter => !guess_letter.letter).length === 5) return this.getCurrentGuessLetters();
    const guess_letter_index = this.guesses[guess_index].letters.reverse().findIndex(guess_letter => !!guess_letter.letter);
    this.guesses[guess_index].letters[guess_letter_index].letter = '';
    this.guesses[guess_index].letters.reverse();
    return this.getCurrentGuessLetters();
  }
};

export default new Game();
