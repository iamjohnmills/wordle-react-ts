import React, {KeyboardEvent} from 'react'
import Game from './Game'
import EventBus from "./EventBus.js";

class KeyboardKey extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			class: 'App-Keyboard-Key',
			classes: [],
			exact: false,
			somewhere: false,
			nowhere: false,
		};
	}
  componentDidMount() {
    EventBus.on('setKeyboardKey', this.handleSetKeyboardKey.bind(this));
    EventBus.on('resetGame', this.init.bind(this));
		this.init();
  }
  init(){
    this.setState({ exact: false, somewhere: false, nowhere: false, classes: [this.state.class] });
  }
  handleSetKeyboardKey(event){
		if(event.letter_obj.letter !== this.props.letter) return;
		if(event.letter_obj.exact){
			this.setState({ exact: true, classes: [this.state.class,'is-exact'] })
		} else if(event.letter_obj.somewhere && !this.state.exact) {
			this.setState({ somewhere: true, classes: [this.state.class,'is-somewhere'] })
		} else if(event.letter_obj.nowhere && !this.state.exact && !this.state.somewhere) {
			this.setState({ nowhere: true, classes: [this.state.class,'is-nowhere'] })
		}
  }
	handleKeyboardKeyClick(event){
    EventBus.dispatch('userKeyClick', this.props.letter);
	}
  render() { return (
    <button onClick={this.handleKeyboardKeyClick.bind(this)} className={this.state.classes.filter(el_class => !!el_class).join(' ')}>
      <span>{this.props.letter}</span>
    </button>
  )}
}

export interface IAppProps {
	letter: string,
}

export interface IAppState {
  class: string,
  classes: array,
	exact: boolean,
	somewhere: boolean,
	nowhere: boolean,
}

export default KeyboardKey
