import React from 'react'
import Game from './Game'
import EventBus from "./EventBus";
import Guess from './Guess'
import Keyboard from './Keyboard'

interface IAppProps {}

interface IAppState {
  answer: string,
  gameover: boolean,
  win: boolean,
}

class App extends React.Component<IAppProps, IAppState> {
  private el_app: React.RefObject<HTMLInputElement>;

	constructor(props: IAppProps) {
		super(props);
    this.el_app = React.createRef();
		this.state = {
      answer: '',
      win: false,
      gameover: false,
		};
	}
	componentDidMount(): void {
    EventBus.on('gameOver', this.handleGameOver.bind(this));
    EventBus.on('userKeyClick', this.handleKeyClick.bind(this));
    this.newGame();
	}
	handleClickNewGame(): void {
		EventBus.dispatch('resetGame', null );
    this.newGame();
	}
	newGame(): void {
    Game.start();
		//this.setState({ answer: 'react', gameover: true, win: true })
		this.setState({ answer: Game.answer, gameover: Game.done, win: Game.win })
    this.el_app?.current?.focus();
		console.log(Game.answer)
	}
  handleGameOver(): void {
    Game.finish()
    this.setState({ gameover: Game.done, win: Game.win });
  }
	handleKeyClick(letter: string): void {
		if(letter === 'enter'){
      EventBus.dispatch('userEnter', { turn: Game.turn } );
		} else if(letter === 'del'){
      EventBus.dispatch('userBackspace', { turn: Game.turn });
		} else {
    	EventBus.dispatch('userKeyPress', { turn: Game.turn, letter: letter });
		}
	}
  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
		event.preventDefault();
    if(event.code === 'Enter'){
      EventBus.dispatch('userEnter', { turn: Game.turn } );
    } else if(event.code === 'Backspace'){
      EventBus.dispatch('userBackspace', { turn: Game.turn });
    } else if(event.keyCode >= 65 && event.keyCode <= 90){
      EventBus.dispatch('userKeyPress', { turn: Game.turn, letter: event.key });
    } else if(event.code == 'Space'){
      EventBus.dispatch('userKeyPress', { turn: Game.turn, letter: ' ' });
    }
  }
	render() { return (
  <div className="App" ref={this.el_app} tabIndex={0} onKeyDown={this.handleKeyDown.bind(this)}>
    <div className="App-Header">
      <h1><span className="font-logo">Wordle</span> <span className="font-alt">REACT-TS</span></h1>
    </div>
		<div className="App-Game">
	    <div className="App-Guesses">
	      <Guess turn={1} />
	      <Guess turn={2} />
	      <Guess turn={3} />
	      <Guess turn={4} />
	      <Guess turn={5} />
	      <Guess turn={6} />
	    </div>
			<div className="App-Legend">
				<div><span className="App-Legend-Icon-Exact"></span> Letter is correct</div>
				<div><span className="App-Legend-Icon-Somewhere"></span> Letter in wrong spot</div>
				<div><span className="App-Legend-Icon-Nowhere"></span> Letter probably not in word</div>
			</div>
	    <Keyboard />
	    {this.state.gameover ?
	    <div className="App-Gameover">
	      <h2 className="mb-10">{this.state.win ? 'You Win!' : 'You lose.'}</h2>
				<p className="mb-10">{this.state.answer.toUpperCase().split('').map( (letter,i) => {
					return ( <span key={i} className="Answer-Letter"><span>{letter}</span></span> )
				})}</p>
	      <p className="mb-10"><button onClick={() => this.handleClickNewGame() } className="App-New-Game-Button">New Game</button></p>
	      <p className="mb-10">This is a demonstration of a Wordle clone built with React and Typescript by John Mills.</p>
				<p>Learn more about <a href="https://github.com/iamjohnmills" target="_blank">me</a> or view the <a href="https://github.com/iamjohnmills/wordle-react-ts" target="_blank">source code</a> for the project</p>
	    </div>
	    : null }
		</div>
  </div>
	) }
}

export default App
