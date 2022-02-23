import React from 'react'
// import { useState, useEffect } from 'react';
// import { useState } from 'react'
import Guess from './Guess'
import Keyboard from './Keyboard'

//import dictionary from './dictionary/cambridge-5-letter-words.json'

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			// name: null
		};
	}
	async componentDidMount() {
		// try {
		// 	let r = await fetch('/api/hello');
		// 	let name = await r.json();
		// 	this.setState({ name });
		// } catch (error) {
		// 	console.log(error);
		// }
	}
	render() { return (
  <div className="App">
    <div>
      <h1>Wordle React-TS</h1>
    </div>
    <div>
      <Guess />
      <Guess />
      <Guess />
      <Guess />
      <Guess />
      <Guess />
    </div>
    <Keyboard />
    <div>
      <p>This is a demonstration of a Wordle clone built with React and Typescript.</p>
      <p>The words are sourced from the Cambridge Dictionary, and are a subset of common 5-letter words based on the completeness of their definitions and examples provided, for a total of 1054 possible words.</p>
    </div>
  </div>
	) }
}

export interface IAppProps {}

export interface IAppState {}

export default App
