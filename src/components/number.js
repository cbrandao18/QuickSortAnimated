import React from 'react'

class Number extends React.Component {
  render() {
    let size;
    if (this.props.num <= 16){
      size = "small"
    } else if (this.props.num > 16 && this.props.num < 32) {
      size = "medium"
    } else {
      size = "large"
    }
    return (
      <div className={`number number-${size}`}>
        {this.props.num}
      </div>
    )
  }
}

export default Number;