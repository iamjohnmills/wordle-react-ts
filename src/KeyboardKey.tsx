import React from 'react'
import EventBus from "./EventBus";

interface Letter {
  letter: string,
  position: number,
  exact: boolean,
  somewhere: boolean,
  nowhere: boolean
}

interface IAppProps {
	letter: string,
}

interface IAppState {
  class: string,
  classes: Array<string>,
	exact: boolean,
	somewhere: boolean,
	nowhere: boolean,
}

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
  componentDidMount(): void {
    EventBus.on('setKeyboardKey', this.handleSetKeyboardKey.bind(this));
    EventBus.on('resetGame', this.init.bind(this));
		this.init();
  }
  init(): void {
    this.setState({ exact: false, somewhere: false, nowhere: false, classes: [this.state.class] });
  }
  handleSetKeyboardKey(event: Letter): void {
		if(event.letter !== this.props.letter) return;
		if(event.exact){
			this.setState({ exact: true, classes: [this.state.class,'is-exact'] })
		} else if(event.somewhere && !this.state.exact) {
			this.setState({ somewhere: true, classes: [this.state.class,'is-somewhere'] })
		} else if(event.nowhere && !this.state.exact && !this.state.somewhere) {
			this.setState({ nowhere: true, classes: [this.state.class,'is-nowhere'] })
		}
  }
	handleKeyboardKeyClick(event: React.MouseEvent<HTMLButtonElement>): void {
    EventBus.dispatch('userKeyClick', this.props.letter);
	}
  render() { return (
    <button onClick={this.handleKeyboardKeyClick.bind(this)} className={this.state.classes.filter(el_class => !!el_class).join(' ')}>
      <span>{this.props.letter}</span>
    </button>
  )}
}

export default KeyboardKey
