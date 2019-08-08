import React from 'react'
import Number from './number';

class AlgoVisualizer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      algorithm: [
        "set the first element as the pivot",
        "for i = pivotIndex + 1, if element[i] < pivot",
        "&nbsp;&nbsp;&nbsp;&nbsp;push into a left array",
        "&nbsp;&nbsp;&nbsp;&nbsp;else push into a right array",
        "recursively sort the left array, then the right array",
        "return the left array concatenated with the the pivot and then the right array"
      ]
    }
  }

  generateNumberColumns(data){
    let subArray = [<div key="spacer" className="spacer-data"></div>]
    let arrHTML = data.map( (dataObj, idx) => {
      if (dataObj.cssClass){
        return <Number key={`${dataObj.num}-${idx}`} num={dataObj.num} classes={dataObj.cssClass}/>
      } else {
        return <Number key={`${dataObj.num}-${idx}`} num={dataObj.num} />
      }
    })

    return subArray.concat(arrHTML);
  }

  generateHighlightedAlgo(){
    return this.state.algorithm.map((stepText, idx) => {
      if (idx === this.props.step.stepInAlgo) {
        return <p dangerouslySetInnerHTML={{__html: stepText}} key={`algo-line-${idx}`} className="active-line"></p>
      } else {
        return <p dangerouslySetInnerHTML={{ __html: stepText }} key={`algo-line-${idx}`}></p>
      }
    })
  }

  generateSubArray(arr, side){
    let subArray = [<div key={`subarray-${side}`} className="spacer"></div>]
    let mappedRes =  arr.map((el, idx) => {
      return <Number key={`subarray-${el}-${idx}`} num={el} />
    })
    return subArray.concat(mappedRes);
  }

  render(){
    return (
      <div className="algorithm-wrapper">
        <div className="algorithm">
          <h1>Quick Sort Algorithm</h1>
          {this.generateHighlightedAlgo()}
        </div>
        <div className="data">
          {this.props.step ? this.generateNumberColumns(this.props.step.arrData) : "" }
        </div>
        <div className="sub-arrays">
          <div className="left">
            <h2>Left Array</h2>
            <p>Holds numbers less than the current pivot</p>
            {this.props.step && this.props.step.data.left ? this.generateSubArray(this.props.step.data.left, "left") : ""}
          </div>
          <div className="right">
            <h2>Right Array</h2>
            <p>Holds numbers greater than or equal to the current pivot</p>
            {this.props.step && this.props.step.data.right ? this.generateSubArray(this.props.step.data.right, "right") : ""}
          </div>
        </div>
      </div>
    )
  }
}

export default AlgoVisualizer;