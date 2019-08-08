import React from 'react'

class StackVisualizer extends React.Component {

  visualizeArray(arr){
    let arrStr = "[";
    arr.forEach((el, idx) => {
      if (idx < arr.length-1){
        arrStr += el + ", "
      } else {
        arrStr += el
      }
    })
    arrStr += "]"

    return <p>{arrStr}</p>
  }

  render(){
    let arrHTML = this.props.step.stack.length ? this.props.step.stack.map( arr => this.visualizeArray(arr)) : "Empty"
    return (
      <div className="stack-wrapper">
        <h2>Stack</h2>
        <div className="stack">
          <div className="stack-inner">
            {arrHTML}
          </div>
        </div>
      </div>
    )
  }
}

export default StackVisualizer;