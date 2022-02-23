import React from 'react'

class GuessLetter extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
		};
	}
  componentDidMount() {
  }
  render() { return (
    <span className="App-Guess-Letter">
      <span>{this.props.guess_letter ? this.props.guess_letter : '' }</span>
    </span>
  )}
}

export interface IAppProps {
  guess_letter: array,
  answer_letter: array,
}

export interface IAppState {
}

export default GuessLetter
