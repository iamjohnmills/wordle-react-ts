import React from 'react'
import GuessLetter from './GuessLetter'

class Guess extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
		};
	}
  componentDidMount() {
  }
  render() { return (
    <div className="App-Guess">
      <GuessLetter guess_letter={'u'} answer_letter={null} />
      <GuessLetter guess_letter={'l'} answer_letter={null} />
      <GuessLetter guess_letter={'t'} answer_letter={null} />
      <GuessLetter guess_letter={'r'} answer_letter={null} />
      <GuessLetter guess_letter={'a'} answer_letter={null} />
    </div>
  )}
}

export interface IAppProps {
  guess: array,
  answer: array,
}

export interface IAppState {
}

export default Guess
