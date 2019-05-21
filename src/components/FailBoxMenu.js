import React from 'react'
export default class FailBoxMenu extends React.Component {
  render() {
    return (
      <div className='fail-box'>
        <div className='fail-box-title'>You missed: </div>
        <div className='fail-box-menu'>{this.props.children}</div>
      </div>
    )
  }
}
