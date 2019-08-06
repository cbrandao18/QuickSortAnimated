import React from 'react'
import Number from './number';

class AlgoVisualizer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      algorithm: [
        "for each unsorted partition set the first element as the pivot",
        "for i = pivotIndex + 1, if element[i] < element[pivot]",
        "push into a left array",
        "else push into a right array",
        "send the left and right arrays back into the function",
        "return the left array concatennated with the the pivot and then the right array"
      ]
    }
  }
  // componentDidMount(){
  //   this.generateNumberColumns(this.props.step.arrData);
  // }

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
          {this.generateHighlightedAlgo()}
        </div>
        {this.props.step ? this.generateNumberColumns(this.props.step.arrData) : "" }
      </div>
    )
  }
}

export default AlgoVisualizer;