import React from 'react';
export default class Man extends React.Component {

  render(){
    const styles = {
      head: { visibility: this.props.headVisible },
      neck: { visibility: this.props.neckVisible },
      corpus: { visibility: this.props.corpusVisible },
      leftArm: { visibility: this.props.leftArmVisible },
      rightArm: { visibility: this.props.rightArmVisible },
      leftHand: { visibility: this.props.leftHandVisible },
      rightHand: { visibility: this.props.rightHandVisible },
      leftLeg: { visibility: this.props.leftLegVisible },
      rightLeg: { visibility: this.props.rightLegVisible },
      leftFoot: { visibility: this.props.leftFootVisible },
      rightFoot: { visibility: this.props.rightFootVisible }
    };
    return (
      <div className="man">
        <div style={styles.head} className="head"></div>
        <div style={styles.neck} className="neck"></div>
        <div style={styles.corpus} className="corpus">
          <div className="corpus-chest-left">
            <div style={styles.leftArm} className="left-arm">
              <div style={styles.leftHand} className="left-hand"></div>
            </div>
            <div style={styles.leftLeg} className="left-leg">
              <div style={styles.leftFoot} className="left-foot"></div>
            </div>
          </div>
          <div className="corpus-chest-right">
            <div style={styles.rightArm} className="right-arm">
              <div style={styles.rightHand} className="right-hand"></div>
            </div>
            <div style={styles.rightLeg} className="right-leg">
              <div style={styles.rightFoot} className="right-foot"></div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

Man.propTypes = {
  headVisible: React.PropTypes.string.isRequired,
  neckVisible: React.PropTypes.string.isRequired,
  corpusVisible: React.PropTypes.string.isRequired,
  leftArmVisible: React.PropTypes.string.isRequired,
  rightArmVisible: React.PropTypes.string.isRequired,
  leftHandVisible: React.PropTypes.string.isRequired,
  rightHandVisible: React.PropTypes.string.isRequired,
  leftLegVisible: React.PropTypes.string.isRequired,
  rightLegVisible: React.PropTypes.string.isRequired,
  leftFootVisible: React.PropTypes.string.isRequired,
  rightFootVisible: React.PropTypes.string.isRequired
};
