import React, {KeyboardEvent} from 'react'
import KeyboardKey from './KeyboardKey'

class Keyboard extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
    this.keyboard = React.createRef();
		this.state = {
      key_rows: [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m'],
      ],
		};
	}
  componentDidMount() {
  }
  componentDidMount() {
    this.focusDiv();
  }
  componentDidUpdate() {
    this.focusDiv();
  }
  focusDiv() {
    this.keyboard.current.focus();
  }
  handleKeyDown(event: KeyboardEvent<HTMLInputElement>){
    if (event.code === "Enter") {
      alert(`You have typed enter`);
    }
  }
  handleKeyPress(event: KeyboardEvent<HTMLInputElement>){
    alert(`keypress`);
  }
  render() { return (
    <div className="App-Keyboard" ref={this.keyboard} tabIndex="0" onKeyDown={this.handleKeyDown} onKeyPress={this.handleKeyPress}>
      {this.state.key_rows.map(row => {
        return ( <div className="App-Keyboard-Row">{row.map(key => {
          return <KeyboardKey letter={key} />
        })}</div> )
      }) }
    </div>
  )}
}

export interface IAppProps {
  guess: array,
  answer: array
}

export interface IAppState {
	key_rows: array
}

export default Keyboard
