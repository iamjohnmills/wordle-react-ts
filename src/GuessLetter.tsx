import React from 'react'
import Game from './Game'
import EventBus from "./EventBus.js";

class GuessLetter extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
      class: 'App-Guess-Letter',
      classes: [],
		};
		this.timeout_class = null;
		this.timeout_keyboard = null;
	}
  componentDidMount() {
		//this.setState({ classes: [this.state.class] })
  }
  componentDidUpdate(prev) {
		if(JSON.stringify(this.props) === JSON.stringify(prev)) return;
		if(this.timeout_class) clearTimeout(this.timeout_class);
		if(this.timeout_keyboard) clearTimeout(this.timeout_keyboard);
    if(this.props.guessed && this.props.letter){
      const letter_obj = Game.getGuessLetter(this.props.turn, this.props.letter, this.props.letter_index);
	    const exact_class = letter_obj.exact ? 'is-exact' : null;
	    const somewhere_class = letter_obj.somewhere ? 'is-somewhere' : null;
	    const nowhere_class = letter_obj.nowhere ? 'is-nowhere' : null;
	    this.timeout_class = setTimeout(() => {
				this.setState({ classes: [this.state.class,'has-letter',exact_class,somewhere_class,nowhere_class] })
	    },300 * this.props.letter_index);
			this.timeout_keyboard = setTimeout(()=>{
      	EventBus.dispatch('setKeyboardKey', { letter_obj: letter_obj });
			},2000)
		} else if(!this.props.guessed && this.props.letter) {
			this.setState({ classes: [this.state.class,'has-letter'] })
		} else {
			this.setState({ classes: [this.state.class] })
		}
	}
  render() { return (
	  <div className={this.state.classes.filter(el_class => !!el_class).join(' ')}>
	    <div className="App-Guess-Letter-Content">
	      <span className="App-Guess-Letter-Content-Front">
	        <span>{this.props.letter ? this.props.letter : '\u00A0'}</span>
	      </span>
	      <span className="App-Guess-Letter-Content-Back">
	        <span>{this.props.letter ? this.props.letter : '\u00A0'}</span>
	      </span>
	    </div>
	  </div>
  )}
}

export interface IAppProps {
	guessed: boolean,
	turn: boolean,
	letter_index: boolean,
	letter: null,
}

export interface IAppState {
  class: string,
  classes: array,
}

export default GuessLetter
