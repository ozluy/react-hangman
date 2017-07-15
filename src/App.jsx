import React from 'react';
import axios from 'axios';
import hotkey from 'react-hotkey';
hotkey.activate();
import AnswerBoxMenu from './components/AnswerBoxMenu';
import FailBoxMenu from './components/FailBoxMenu';
import GameResult from './components/GameResult';
import Man from './components/Man';


export default class App extends React.Component {
  constructor() {
    super();
    this.hotkeyHandler = this.handleHotkey.bind(this);
    this.state = {
      wordFromAPI: [],
      resultBox: {
        disabled: '',
        title: 'Hangman',
        buttonLabel: 'Start Game'
      },
      failedLetters: [],
      correctLetters: [],
      headVisibility: 'hidden',
      neckVisibility: 'hidden',
      corpusVisibility: 'hidden',
      leftArmVisibility: 'hidden',
      rightArmVisibility: 'hidden',
      leftHandVisibility: 'hidden',
      rightHandVisibility: 'hidden',
      leftLegVisibility: 'hidden',
      rightLegVisibility: 'hidden',
      leftFootVisibility: 'hidden',
      rightFootVisibility: 'hidden'
    }
  }

  componentDidMount() {
    hotkey.addHandler(this.hotkeyHandler);
  }

  componentWillUnmount() {
    hotkey.removeHandler(this.hotkeyHandler);
  } render() {

    return (
      <div>
        <div className="gallow">
          <div className="down-pipe"> </div>
        </div>
        <Man
          headVisible={this.state.headVisibility}
          neckVisible={this.state.neckVisibility}
          corpusVisible={this.state.corpusVisibility}
          leftArmVisible={this.state.leftArmVisibility}
          rightArmVisible={this.state.rightArmVisibility}
          leftHandVisible={this.state.leftHandVisibility}
          rightHandVisible={this.state.rightHandVisibility}
          leftLegVisible={this.state.leftLegVisibility}
          rightLegVisible={this.state.rightLegVisibility}
          leftFootVisible={this.state.leftFootVisibility}
          rightFootVisible={this.state.rightFootVisibility}
        />

        <FailBoxMenu>
          {
            this.state.failedLetters.map((letter, index) => {
              return (
                <div key={index} className="fail-box-menu-item">{letter}</div>
              );
            })
          }
        </FailBoxMenu>
        <AnswerBoxMenu>
          {
            this._emptyBoxList().map((item, index) => {
              return (
                <div key={index} className="answer-box-menu-item disabled"></div>
              );
            })
          }
          {
            this.state.wordFromAPI.map((letter, index) => {
              return (
                <div key={index} className="answer-box-menu-item">{this.state.correctLetters.find(x => x === letter) ? letter : ''}</div>
              );
            })
          }


        </AnswerBoxMenu>

        <div className="right-blue-triangle"></div>
        <GameResult
          title={this.state.resultBox.title}
          rootClass={this.state.resultBox.disabled}
          buttonLabel={this.state.resultBox.buttonLabel}
          buttonAction={this._startGame.bind(this)}
        />
      </div>
    );
  }
  _handAction(keyChar) {

    if (this.state.wordFromAPI.length > 0) {
      if (!this.state.failedLetters.find(x => x === keyChar) && !this.state.correctLetters.find(x => x === keyChar)) {
        let count = 0;
        for (let i = 0; i < this.state.wordFromAPI.length; i++) {
          if (keyChar == this.state.wordFromAPI[i]) {
            count++;
            this.setState({
              correctLetters: this.state.correctLetters.concat([keyChar])
            });
            this._countCorrectLetters();
            return;
          }
        }
        if (count === 0) {
          this.setState({
            failedLetters: this.state.failedLetters.concat([keyChar])
          });
          this._countFailedLetters();
        }
      }
    }

  }
  handleHotkey(event) {
    event.preventDefault();
    const e = event.nativeEvent;
    console.log();
    if (e.keyCode > 64 && e.keyCode < 91) {
      this._handAction(e.key);
    }
  }

  _emptyBoxList() {
    let arrayOfSpace = []
    if (this.state.wordFromAPI !== undefined) {
      const arraySize = this.state.wordFromAPI.length;
      for (let x = 0; x < 12 - arraySize; x++) {
        arrayOfSpace.push(' ');
      }
    }
    return arrayOfSpace;
  }

  _startGame() {
    this._getDataFromAPI();
    this.setState({
      headVisibility: 'hidden',
      neckVisibility: 'hidden',
      corpusVisibility: 'hidden',
      leftArmVisibility: 'hidden',
      rightArmVisibility: 'hidden',
      leftHandVisibility: 'hidden',
      rightHandVisibility: 'hidden',
      leftLegVisibility: 'hidden',
      rightLegVisibility: 'hidden',
      leftFootVisibility: 'hidden',
      rightFootVisibility: 'hidden', //Human
      resultBox: {
        disabled: 'disabled'
      },
      failedLetters: [],
      correctLetters: []
    })
  }

  _getDataFromAPI() {
    const _this = this;
    axios.get('http://api.wordnik.com/v4/words.json/randomWord', {
      params: {
        hasDictionaryDef: true,
        minCorpusCount: 0,
        maxCorpusCount: -1,
        maxDictionaryCount: -1,
        minLength: 3,
        maxLength: 12,
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
      }
    })
      .then(function (response) {
        console.log("you got word from API:", response.data.word);
        let wordArr = response.data.word.split('');
        wordArr.map(item => {if(item === '-'){
          wordArr.splice(wordArr.indexOf('-'), 1)
        }});
        _this.setState({
          wordFromAPI: wordArr
        });
        return response.status;
      })
      .catch(function (response) {
        console.log(response);
        return response.status;
      });
  }

  _countCorrectLetters() {
    let uniqueLetters = this.state.wordFromAPI.getUnique();
    if (this.state.correctLetters.length === uniqueLetters.length) {
      this.setState({
        resultBox: {
          disabled: '',
          title: '★ You Won! ★',
          buttonLabel: 'Restart Game'
        }
      });
    }
  }
  _countFailedLetters() {
    switch (this.state.failedLetters.length) {
      case 1:
        return this.setState({
          headVisibility: 'visible'
        });
      case 2:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible'
        });

      case 3:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible'
        });
      case 4:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible'
        });
      case 5:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible'
        });
      case 6:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible'
        });
      case 7:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
          rightHandVisibility: 'visible'
        });
      case 8:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
          rightHandVisibility: 'visible',
          leftLegVisibility: 'visible'
        });
      case 9:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
          rightHandVisibility: 'visible',
          leftLegVisibility: 'visible',
          rightLegVisibility: 'visible'
        });
      case 10:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
          rightHandVisibility: 'visible',
          leftLegVisibility: 'visible',
          rightLegVisibility: 'visible',
          leftFootVisibility: 'visible'
        });
      case 11:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
          rightHandVisibility: 'visible',
          leftLegVisibility: 'visible',
          rightLegVisibility: 'visible',
          leftFootVisibility: 'visible',
          rightFootVisibility: 'visible',
          wordFromAPI: [],
          resultBox: {
            disabled: '',
            title: 'Game Over',
            buttonLabel: 'Restart Game'
          },
          failedLetters: [],
        });
      default:
        return this.setState({
          headVisibility: 'hidden',
          neckVisibility: 'hidden',
          corpusVisibility: 'hidden',
          leftArmVisibility: 'hidden',
          rightArmVisibility: 'hidden',
          leftHandVisibility: 'hidden',
          rightHandVisibility: 'hidden',
          leftLegVisibility: 'hidden',
          rightLegVisibility: 'hidden',
          leftFootVisibility: 'hidden',
          rightFootVisibility: 'hidden'
        });

    }

  }
}
