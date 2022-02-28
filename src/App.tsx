import React from 'react'
import Game from './Game'
import EventBus from "./EventBus.js";
import Guess from './Guess'
import Keyboard from './Keyboard'

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
    this.app = React.createRef();
		this.state = {
      answer: null,
      win: null,
      gameover: false,
			started: false,
		};
	}
	componentDidMount() {
    EventBus.on('gameOver', this.handleGameOver.bind(this));
    this.newGame();
	}
	handleClickNewGame(){
		EventBus.dispatch('resetGame');
    this.newGame();
	}
	newGame(){
    Game.start();
		this.setState({ answer: Game.answer, gameover: Game.done, win: Game.win })
    this.app.current.focus();
		console.log(Game.answer)
	}
  handleGameOver(event){
    Game.finish()
    this.setState({ gameover: Game.done, win: Game.win });
  }
  handleKeyDown(event: KeyboardEvent<HTMLInputElement>){
    if(event.code === 'Enter'){
      EventBus.dispatch('userEnter', { turn: Game.turn } );
    	this.setState({ started: true });
    } else if(event.code === 'Backspace'){
      EventBus.dispatch('userBackspace', { turn: Game.turn });
    } else if(event.keyCode >= 65 && event.keyCode <= 90){
      EventBus.dispatch('userKeyPress', { turn: Game.turn, letter: event.key });
    } else if(event.code == 'MetaLeft'){
      EventBus.dispatch('userKeyPress', { turn: Game.turn, letter: '⌘' });
    }
  }
	render() { return (
  <div className="App" ref={this.app} tabIndex="0" onKeyDown={this.handleKeyDown.bind(this)}>

    <div className="App-Header">
      <h1><span className="font-logo">Wordle</span> <span className="font-alt">+ REACT-TS</span></h1>
    </div>

		<div className="App-Game">

	    <div className="App-About">
	      <p>This is a demonstration of a Wordle clone built with React and Typescript.</p>
	    </div>

	    <div className="App-Guesses">
	      <Guess turn={1} />
	      <Guess turn={2} />
	      <Guess turn={3} />
	      <Guess turn={4} />
	      <Guess turn={5} />
	      <Guess turn={6} />
	    </div>

	    {this.state.started ?
			<div className="App-Legend">
				<div><span className="App-Legend-Icon-Exact"></span> Letter is correct</div>
				<div><span className="App-Legend-Icon-Somewhere"></span> Letter in wrong spot</div>
				<div><span className="App-Legend-Icon-Nowhere"></span> Letter not in word</div>
			</div>
	    : null }

	    <Keyboard />

	    {this.state.gameover ?
	    <div className="App-Gameover">
	      <h2>{this.state.win ? 'You Win!' : 'You lose.'}</h2>
				{!this.state.win ?
					<p>Answer: {this.state.answer}</p>
				: null}
	      <button onClick={() => this.handleClickNewGame() } className="App-New-Game-Button">New Game</button>
	      <p>This is a demonstration of a Wordle clone built with React and Typescript by John Mills.</p>
				<p>Learn more about <a href="/" target="_blank">me</a> or view the <a href="/" target="_blank">source code</a> for the project</p>
	    </div>
	    : null }

		</div>


  </div>
	) }
}

export interface IAppProps {}

export interface IAppState {
  answer: string,
  gameover: boolean,
  win: boolean,
	started: boolean,
}

export default App
