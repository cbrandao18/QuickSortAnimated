import React from 'react'

class Number extends React.Component {
  render() {
    let classes = this.props.classes ? `number ${this.props.classes}` : 'number'
    return (
      <div 
        className={classes} 
        style={{height: this.props.num * 5}}
      >
          {this.props.num}
      </div>
    )
  }
}

export default Number;