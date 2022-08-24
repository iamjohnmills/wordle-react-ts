import React from 'react'
import Game from './Game'
import EventBus from "./EventBus";
import GuessLetter from "./GuessLetter";

interface KeyPressEvent {
  turn: number,
  letter?: string
}

interface IAppProps {
  turn: number,
}

interface IAppState {
  class: string,
  classes: Array<string>,
  guessed: boolean,
  success: boolean,
  letters: Array<string>,
}

class Guess extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      class: 'App-Guess',
      classes: [],
      guessed: false,
      success: false,
      letters: ['','','','',''],
    };
  }
  componentDidMount(): void {
    EventBus.on('userEnter', this.handleUserEnter.bind(this));
    EventBus.on('userBackspace', this.handleUserBackspace.bind(this));
    EventBus.on('userKeyPress', this.handleUserKeyPress.bind(this));
    EventBus.on('resetGame', this.init.bind(this));
    this.init()
  }
  init(): void {
    this.setState({ guessed: false, success: false, letters: ['','','','',''], classes: [this.state.class] });
  }
  handleUserEnter(event:KeyPressEvent): void {
    if( event.turn !== this.props.turn || this.state.guessed ) return;
    this.setState({ guessed: true });
    if( Game.isFinished() ){
      Game.checkCurrentGuess();
      setTimeout(() => {
        if(Game.hasCorrectGuess()){
          this.setState({ success: true });
          setTimeout(() => {
            EventBus.dispatch('gameOver');
          },800)
        } else {
          EventBus.dispatch('gameOver');
        }
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
  handleUserBackspace(event:KeyPressEvent): void {
    if(event.turn !== this.props.turn) return;
    this.setState({ guessed: false, letters: Game.removeGuessLetter(), classes: [this.state.class] });
  }
  handleUserKeyPress(event:KeyPressEvent): void {
    if(event.turn !== this.props.turn) return;
    this.setState({ letters: Game.setGuessLetter(event.letter) });
  }
  render() { return (
    <div className={this.state.classes.join(' ')}>
      { this.state.letters.map( (guess_letter:string,i:number,letters:Array<string>) => {
        return (
          <GuessLetter key={i} success={this.state.success} guessed={this.state.guessed} turn={this.props.turn} letter={guess_letter} letter_index={i} />
        )
      }) }
    </div>
  )}
}

export default Guess
