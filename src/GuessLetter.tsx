import React from 'react'
import Game from './Game'
import EventBus from "./EventBus";

interface IAppProps {
	guessed: boolean,
	success: boolean,
	turn: number,
	letter_index: number,
	letter: string,
}

interface IAppState {
  class: string,
  classes: Array<string>,
}

interface Letter {
  letter: string,
  position: number,
  exact: boolean,
  somewhere: boolean,
  nowhere: boolean
}

class GuessLetter extends React.Component<IAppProps, IAppState> {
  private timeout_class?: ReturnType<typeof setTimeout>;
  private timeout_keyboard?: ReturnType<typeof setTimeout>;

	constructor(props: IAppProps) {
		super(props);
		this.state = {
      class: 'App-Guess-Letter',
      classes: [],
		};
	}
  componentDidUpdate(prev: IAppProps): void {
		if(JSON.stringify(this.props) === JSON.stringify(prev)) return;
		if(this.timeout_class) clearTimeout(this.timeout_class);
		if(this.timeout_keyboard) clearTimeout(this.timeout_keyboard);
		if(this.props.guessed && this.props.letter){
      const letter_obj:Letter|undefined = Game.getGuessLetter(this.props.turn, this.props.letter, this.props.letter_index);
			if(!letter_obj) return;
	    const exact_class:string = letter_obj.exact ? 'is-exact' : '';
	    const somewhere_class:string = letter_obj.somewhere ? 'is-somewhere' : '';
	    const nowhere_class:string = letter_obj.nowhere ? 'is-nowhere' : '';
	    this.timeout_class = setTimeout(() => {
				if(this.props.success){
					this.setState({ classes: [this.state.class,'has-letter','success',exact_class,somewhere_class,nowhere_class] })
				} else {
					this.setState({ classes: [this.state.class,'has-letter',exact_class,somewhere_class,nowhere_class] })
				}
	    },(this.props.success ? 100 : 300) * this.props.letter_index);
			this.timeout_keyboard = setTimeout(()=>{
				if(!this.props.success){
	      	EventBus.dispatch('setKeyboardKey', letter_obj );
				}
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

export default GuessLetter
