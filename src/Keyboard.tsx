import React from 'react'
import KeyboardKey from './KeyboardKey'

interface IAppProps {}

interface IAppState {}

class Keyboard extends React.Component<IAppProps, IAppState> {
  private key_rows: Array<Array<string>>;

  constructor(props: IAppProps) {
    super(props);
    this.key_rows = [
      ['q','w','e','r','t','y','u','i','o','p'],
      ['a','s','d','f','g','h','j','k','l'],
      ['enter','z','x','c','v','b','n','m','del'],
    ]
  }
  render() { return (
    <div className="App-Keyboard">
      {this.key_rows.map((row:Array<string>,i:number) => {
        return ( <div className="App-Keyboard-Row" key={i}>{row.map( (key:string) => {
          return ( <KeyboardKey key={key} letter={key} /> )
        })}</div> )
      }) }
    </div>
  )}
}

export default Keyboard
