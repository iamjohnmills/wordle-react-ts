import dictionary from './dictionary/words.json'

interface Letter {
  letter: string,
  position: number,
  exact: boolean,
  somewhere: boolean,
  nowhere: boolean
}

interface Guess {
  active: boolean,
  letters: Array<Letter>
}

class Game {
  public done: boolean;
  public win: boolean;
  public turn: number;
  public answer: string;
  public answer_letters: Array<string>;
  private guesses: Array<Guess>;

  constructor() {
    this.done = false;
    this.win = false;
    this.turn = 1;
    this.answer = '';
    this.answer_letters = [];
    this.guesses = [];
    this.reset();
  }
  reset(): void {
    this.done = false;
    this.win = false;
    this.turn = 1;
    this.answer = '';
    this.answer_letters = [];
    this.guesses = this.buildGuesses(6);
  }
  buildGuesses(amount:number): Array<Guess> {
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
  start(): void {
    this.reset();
    const random_word = dictionary[Math.floor(Math.random()*dictionary.length)];
    this.answer = random_word;
    this.answer_letters = random_word.split('');
    // this.answer = 'budge'; //budge beady
    // this.answer_letters = this.answer.split('');
  }
  finish(): void {
    this.win = this.hasCorrectGuess()
    this.done = true;
  }
  hasCorrectGuess(): boolean {
    return this.guesses.some(guess => guess.letters.map( (guess_letter:Letter) => guess_letter.letter).join('') === this.answer_letters.join('') );
  }
  isFinished(): boolean {
    return this.hasCorrectGuess() || this.turn === 6;
  }
  isNextTurn(): boolean {
    return this.isValidGuess() && this.turn < 6;
  }
  checkCurrentGuess(): void {
    const guess_index:number = this.guesses.findIndex( (guess:Guess) => guess.active);
    this.guesses[guess_index].letters = this.guesses[guess_index].letters.map( (letter:Letter,letter_index:number,letters:Array<Letter>) => {
      const has_somewhere_duplicates = this.answer_letters.filter( (answer_letter:string,i:number,letters:Array<string>) => {
        return letters[letter_index] !== letter.letter && i !== letter_index && answer_letter === letter.letter
      }).length > 0;
      const unique_somewhere_index:number = letters.findIndex( (guess_letter:Letter,i:number,letters:Array<Letter>) => {
        return this.answer_letters[letter_index] !== guess_letter.letter && guess_letter.letter === letter.letter
      });
      const no_exact_elsewhere:boolean = letters.findIndex( (guess_letter:Letter,i:number) => guess_letter.letter === letter.letter && this.answer_letters[i] === letter.letter) === -1;
      const is_exact:boolean = this.answer_letters[letter_index] === letter.letter;
      const is_somewhere:boolean = no_exact_elsewhere && has_somewhere_duplicates && unique_somewhere_index === letter_index;
      return { letter: letter.letter, position: letter.position, exact: is_exact, somewhere: is_somewhere, nowhere: !is_somewhere };
    });
  }
  setNextTurn(): void {
    this.turn = this.turn + 1;
    const guess_index:number = this.guesses.findIndex((guess:Guess) => guess.active);
    this.guesses[guess_index].active = false;
    this.guesses[guess_index + 1].active = true;
  }
  isValidGuess(): boolean {
    const guess_index:number = this.guesses.findIndex((guess:Guess) => guess.active);
    if(this.guesses[guess_index].letters.filter( (guess_letter:Letter) => !!guess_letter.letter).length !== 5) return false;
    const guess_word:string = this.guesses[guess_index].letters.map((guess_letter:Letter) => guess_letter.letter).join('').toLowerCase();
    return dictionary.findIndex((entry:string) => entry === guess_word ) !== -1;
  }
  getGuessLetter(turn:number,letter:string,letter_index:number): Letter | undefined {
    return this.guesses[turn-1].letters.find( (guess_letter:Letter,i:number) => guess_letter.letter === letter && i === letter_index );
  }
  getCurrentGuessLetters(): Array<string> {
    const guess_index:number = this.guesses.findIndex((guess:Guess) => guess.active);
    return this.guesses[guess_index].letters.map((guess_letter:Letter) => guess_letter.letter);
  }
  setGuessLetter(letter?:string): Array<string> {
    if(!letter) return this.getCurrentGuessLetters();
    const guess_index:number = this.guesses.findIndex((guess:Guess) => guess.active);
    if(this.guesses[guess_index].letters.filter((guess_letter:Letter) => !!guess_letter.letter).length === 5) return this.getCurrentGuessLetters();
    const guess_letter_index:number = this.guesses[guess_index].letters.findIndex((guess_letter:Letter) => !guess_letter.letter);
    this.guesses[guess_index].letters[guess_letter_index].letter = letter;
    return this.getCurrentGuessLetters();
  }
  removeGuessLetter(): Array<string> {
    const guess_index:number = this.guesses.findIndex((guess:Guess) => guess.active);
    if(this.guesses[guess_index].letters.filter((guess_letter:Letter) => !guess_letter.letter).length === 5) return this.getCurrentGuessLetters();
    const guess_letter_index:number = this.guesses[guess_index].letters.reverse().findIndex((guess_letter:Letter) => !!guess_letter.letter);
    this.guesses[guess_index].letters[guess_letter_index].letter = '';
    this.guesses[guess_index].letters.reverse();
    return this.getCurrentGuessLetters();
  }
};

export default new Game();
