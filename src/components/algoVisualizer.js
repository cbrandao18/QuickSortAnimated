import React from 'react'
import Number from './number';

class AlgoVisualizer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      algorithm: [
        "for each unsorted partition, set the first element as the pivot",
        "for i = pivotIndex + 1, if element[i] < pivot",
        "push into a left array",
        "else push into a right array",
        "send the left and right arrays back into the function",
        "return the left array concatenated with the the pivot and then the right array"
      ]
    }
  }

  generateNumberColumns(data){
    let arrHTML = data.map( (dataObj, idx) => {
      if (dataObj.cssClass){
        return <Number key={`${dataObj.num}-${idx}`} num={dataObj.num} classes={dataObj.cssClass}/>
      } else {
        return <Number key={`${dataObj.num}-${idx}`} num={dataObj.num} />
      }
    })

    return arrHTML;
  }

  generateHighlightedAlgo(){
    return this.state.algorithm.map((stepText, idx) => {
      if (idx === this.props.step.stepInAlgo) {
        return <p key={`algo-line-${idx}`} className="active-line">{stepText}</p>
      } else {
        return <p key={`algo-line-${idx}`}>{stepText}</p>
      }
    })
  }

  render(){
    return (
      <div>
        <div className="algorithm">
          <h1>Quick Sort Algorithm</h1>
          {this.generateHighlightedAlgo()}
        </div>
        <div className="data">
          {this.props.step ? this.generateNumberColumns(this.props.step.arrData) : "" }
        </div>
      </div>
    )
  }
}

export default AlgoVisualizer;