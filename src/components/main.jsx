import React from 'react'
import Number from './number';
const random = require('lodash.random')

class Main extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      numbers: []
    }
  }

  componentDidMount(){
    this.newNumbers();
  }

  newNumbers(){
    let newNums = [];
    for (let i=0; i < 10; i++){
      newNums.push(random(1, 50));
    }
    this.setState({numbers: newNums});
  }

  render() {
    let numElements = this.state.numbers.map((num, idx) => <Number key={`${num}-${idx}`} num={num}/>)

    return (
      <div className="main">
        {numElements}
      </div>
    )
  }
}

export default Main;