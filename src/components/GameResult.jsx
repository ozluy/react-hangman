import React from 'react';
export default class GameResult extends React.Component {
  render(){
    return (
      <div id="game-result" className={this.props.rootClass}>
        <div className="content">
          <h1 className="result-title"> {this.props.title}</h1>
          <button onClick={()=> {this.props.buttonAction()}} className="restart">{this.props.buttonLabel}</button>
        </div>
      </div>
    )
  }
}
GameResult.propTypes = {
  rootClass: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  buttonLabel: React.PropTypes.string,
  buttonAction: React.PropTypes.func
};
