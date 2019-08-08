import React from 'react'
import AlgoVisualizer from './algoVisualizer'
import StackVisualizer from './stackVisualizer'
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
    
    this.interval = setInterval(() => {
      if (!this.state.paused) {
        this.nextStep();
      }
    }, 500)
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

  generateOneStep(steps, array, stack, stepInAlgo, left, right, currElIdx){
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
      stack,
      array,
      arrData,
      stepInAlgo,
      data: {
        left: [...left],
        right: [...right]
      }
    })
  }

  generateSteps(array){
    let steps = [];

    let quicksort = (array, stack) => {
      stack = [array, ...stack]
      if (array.length < 2) return array;
      const pivot = array[0];
      this.generateOneStep(steps, array, stack, 0, [], []);

      let left = [];
      let right = [];
      for (let i = 1; i < array.length; i++) {
        this.generateOneStep(steps, array, stack, 1, left, right, i);
        if (array[i] < pivot) {
          left.push(array[i])
          this.generateOneStep(steps, array, stack, 2, left, right);
        } else {
          right.push(array[i])
          this.generateOneStep(steps, array, stack, 3, left, right);
        }
      }

      this.generateOneStep(steps, array, stack, 4, left, right);
      left = quicksort(left, stack);
      right = quicksort(right, stack);

      let sorted = left.concat([pivot]).concat(right)
      stack = stack.slice(1);
      this.generateOneStep(steps, sorted, stack, 5, left, right);

      return sorted;
    }

    quicksort(array, []);
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

  }

  render() {
    let playPause = this.state.paused ? "play" : "pause"
    return (
      <div className="main">
        <div className="main-visualizers">
          <AlgoVisualizer step={this.state.steps[this.state.currStep]} />
          <div>
            <StackVisualizer step={this.state.steps[this.state.currStep]} />
            <div className="instructions">
              <h2>Instructions</h2>
              <ul>
                <li>Press <strong>play/pause</strong> to run through the visualization</li>
                <li>Press <strong>next step</strong> to manually step through</li>
                <li>Press <strong>new nums</strong> to generate a new set of numbers</li>
                <li><strong id="yellow">yellow</strong> indicates the current pivot</li>
                <li><strong id="green">green</strong> indicates number current being visited</li>
              </ul>
            </div>
            <div className="buttons">
              <h2>Controls</h2>
              <button onClick={this.play.bind(this)}>{playPause}</button>
              <button onClick={this.nextStep.bind(this)}>next step</button>
              <button onClick={this.shuffle.bind(this)}>new nums</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;