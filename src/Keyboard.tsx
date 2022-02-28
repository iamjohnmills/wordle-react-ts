import React, {KeyboardEvent} from 'react'
import Game from './Game'
import KeyboardKey from './KeyboardKey'
import EventBus from "./EventBus.js";

class Keyboard extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
    this.key_rows = [
      ['q','w','e','r','t','y','u','i','o','p'],
      ['a','s','d','f','g','h','j','k','l'],
      ['z','x','c','v','b','n','m','⌘'],
    ]
	}
  componentDidMount() {
  }
  render() { return (
    <div className="App-Keyboard">
      {this.key_rows.map((row,i) => {
        return ( <div className="App-Keyboard-Row" key={i}>{row.map(key => {
					return (
						<KeyboardKey key={key} letter={key} />
					)
        })}</div> )
      }) }
    </div>
  )}
}

export interface IAppProps {
}

export interface IAppState {
}

export default Keyboard
