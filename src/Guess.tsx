import React from 'react'
import Game from './Game'
import EventBus from "./EventBus.js";
import GuessLetter from "./GuessLetter";

class Guess extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
      class: 'App-Guess',
      classes: [],
      guessed: false,
      letters: ['','','','',''],
		};
	}
  componentDidMount() {
    EventBus.on('userEnter', this.handleUserEnter.bind(this));
    EventBus.on('userBackspace', this.handleUserBackspace.bind(this));
    EventBus.on('userKeyPress', this.handleUserKeyPress.bind(this));
    EventBus.on('resetGame', this.init.bind(this));
    this.init()
  }
  init(){
    this.setState({ guessed: false, letters: ['','','','',''], classes: [this.state.class] });
  }
  async handleUserEnter(event){
    if( event.turn !== this.props.turn || this.state.guessed ) return;
    this.setState({ guessed: true });
    if( Game.isFinished() ){
      Game.checkCurrentGuess();
      setTimeout(() => {
        EventBus.dispatch('gameOver');
      },2000)
    } else if( Game.isNextTurn() ){
      Game.checkCurrentGuess();
      setTimeout(() => {
        Game.setNextTurn();
      },2000);
    } else {
      this.setState({ classes: [this.state.class,'invalid-word'] });
      setTimeout(() => {
        this.setState({ guessed: false, classes: [this.state.class] });
      },820)
    }
  }
  handleUserBackspace(event){
    if(event.turn !== this.props.turn) return;
    this.setState({ guessed: false, letters: Game.removeGuessLetter(), classes: [this.state.class] });
  }
  handleUserKeyPress(event){
    if(event.turn !== this.props.turn) return;
    this.setState({ letters: Game.setGuessLetter(event.letter) });
  }
  render() { return (
    <div className={this.state.classes.join(' ')}>
      { this.state.letters.map( (guess_letter,i,letters) => {
        return (
          <GuessLetter key={i} guessed={this.state.guessed} turn={this.props.turn} letter={guess_letter} letter_index={i} />
        )
      }) }
    </div>
  )}
}

export interface IAppProps {
  turn: number,
}

export interface IAppState {
  class: string,
  classes: array,
  guessed: boolean,
  letters: array,
}

export default Guess
