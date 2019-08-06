import React from 'react'
import Number from './number';
import AlgoVisualizer from './algoVisualizer'
const random = require('lodash.random')

class Main extends React.Component {

  constructor(props){
    super(props)
    const numbers = this.newNumbers();
    const steps = this.generateSteps(numbers);

    this.state = {
      numbers,
      steps
    }
  }

  componentDidMount(){
    let newNums = this.newNumbers();
    this.generateSteps(newNums);
  }

  newNumbers(){
    let newNums = [];
    for (let i=0; i < 10; i++){
      newNums.push(random(1, 50));
    }
    return newNums;
  }

  generateOneStep(steps, array, stepInAlgo, left, right){
    let arrData = array.map((el, idx) => {
      if (stepInAlgo === 0 && idx === 0) {
        return { num: el, cssClass: "pivot" }
      } else {
        return { num: el }
      }
    })
    steps.push({
      arrData,
      step: stepInAlgo,
      data: {
        left: left,
        right: right
      }
    })
  }

  generateSteps(array){
    let steps = [];

    let quicksort = (array) => {
      if (array.length < 2) return array;
      const pivot = array[0];
      this.generateOneStep(steps, array, 0, [], []);

      let left = [];
      let right = [];
      for (let i = 1; i < array.length; i++) {
        this.generateOneStep(steps, array, 1, left, right);
        if (array[i] < pivot) {
          left.push(array[i])
          this.generateOneStep(steps, array, 2, left, right);
        } else {
          right.push(array[i])
          this.generateOneStep(steps, array, 3, left, right);
        }
      }

      this.generateOneStep(steps, array, 4, left, right);
      left = quicksort(left);
      right = quicksort(right);

      let sorted = left.concat([pivot]).concat(right)
      this.generateOneStep(steps, sorted, 5, left, right);
      return sorted;
    }

    quicksort(array);
    return steps;
  }

  // rearrange(){
  //   const newNums = [...this.state.numbers];
  //   const lastEl = newNums.pop();
  //   newNums.unshift(lastEl)
  //   this.setState({ numbers: newNums})
  // }

  render() {
    // let cssClass = "";
    // let numElements = this.state.numbers.map((num, idx) => {
    //   if (idx === this.state.pivotidx){
    //     cssClass += "pivot "
    //   } else if (idx === this.state.storeIdx){
    //     cssClass += "store "
    //   }
    //   return <Number key={`${num}-${idx}`} num={num} classes={`${cssClass}`}/>
    // })

    return (
      <div className="main">
        <AlgoVisualizer step={this.state.steps[this.state.steps.length-1]}/>
        {/* {numElements} */}
        {/* <button onClick={this.rearrange.bind(this)}>rearrange</button> */}
      </div>
    )
  }
}

export default Main;