import React from 'react'

export default class KeyboardKey extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		//this.state = {
		//};
	}
  componentDidMount() {
  }
  render() { return (
    <button className="App-Keyboard-Key">
      <span>{this.props.letter}</span>
    </button>
  )}
}

export interface IAppProps {
  letter: string
}

export interface IAppState {}

//export default KeyboardKey
