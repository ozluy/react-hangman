import React from 'react';
export default class AnswerBoxMenu extends React.Component {
  render(){
    return (
      <div className="answer-box-menu">
        {
          this.props.children
        }
      </div>
    );
  }
}
AnswerBoxMenu.propTypes = {
  children: React.PropTypes.node
}
