import React from 'react'
import AlgoVisualizer from './algoVisualizer'
import { clearInterval } from 'timers';
const random = require('lodash.random')

class Main extends React.Component {

  constructor(props){
    super(props)
    const numbers = this.newNumbers();
    const steps = this.generateSteps(numbers);

    this.state = {
      numbers,
      currStep: 0,
      steps,
      paused: true
    }
  }

  componentDidMount(){
    let newNums = this.newNumbers();
    this.generateSteps(newNums);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  newNumbers(){
    let newNums = [];
    for (let i=0; i < 10; i++){
      newNums.push(random(1, 50));
    }
    return newNums;
  }

  generateOneStep(steps, array, stepInAlgo, left, right, currElIdx){
    let arrData = array.map((el, idx) => {
      if (idx === 0 && stepInAlgo !== 5) {
        return { num: el, cssClass: "pivot" }
      } else if (stepInAlgo === 1 && idx === currElIdx){
        return { num: el, cssClass: "visited" }
      } 
      else {
        return { num: el }
      }
    })
    steps.push({
      arrData,
      stepInAlgo: stepInAlgo,
      data: {
        left: [...left],
        right: [...right]
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
        this.generateOneStep(steps, array, 1, left, right, i);
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

  nextStep(){
    if (this.state.currStep !== this.state.steps.length -1){
      this.setState({currStep: this.state.currStep+1}) 
    }
  }

  shuffle(){
    let newNums = this.newNumbers();
    let newSteps = this.generateSteps(newNums);
    this.setState({numbers: newNums, currStep: 0, steps: newSteps})
  }

  play(){
    this.setState({paused: !this.state.paused})
    this.interval = setInterval(()=> {
      if (!this.state.paused){
        this.nextStep();
      }
    }, 1000)
  }

  render() {
    let playPause = this.state.paused ? "play" : "pause"
    return (
      <div className="main">
        <AlgoVisualizer step={this.state.steps[this.state.currStep]} />
        <div className="buttons">
          <h2>Controls</h2>
          <button onClick={this.play.bind(this)}>{playPause}</button>
          <button onClick={this.nextStep.bind(this)}>next step</button>
          <button onClick={this.shuffle.bind(this)}>new nums</button>
        </div>
      </div>
    )
  }
}

export default Main;