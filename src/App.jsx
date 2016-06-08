import React from 'react';
import axios from 'axios';
import hotkey from 'react-hotkey';
hotkey.activate();

import AnswerBoxMenu from './components/AnswerBoxMenu';
import FailBoxMenu from './components/FailBoxMenu';
import Gallow from './components/Gallow';
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
  }


  render() {

    return (
      <div>
        <Gallow />
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
            this.state.failedLetters.map((letter, index) =>
            {
              return (
                <div key={index} className="fail-box-menu-item">{letter}</div>
              );
            })
          }
        </FailBoxMenu>
        <AnswerBoxMenu>
          {
            this._emptyBoxList().map((item, index) =>
            {
              return (
                <div key={index} className="answer-box-menu-item disabled"></div>
              );
            })
          }
          {
            this.state.wordFromAPI.map((letter, index) =>
            {
              return (
                <div key={index} className="answer-box-menu-item">{ this.state.correctLetters.find(x => x === letter) ? letter : ''}</div>
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
  _handAction(keyChar){

    if(this.state.wordFromAPI.length>0){
      if(!this.state.failedLetters.find(x => x === keyChar) && !this.state.correctLetters.find(x => x === keyChar)){
        let count = 0;
        for(let i=0; i<this.state.wordFromAPI.length; i++){
          if(keyChar==this.state.wordFromAPI[i]){
            count++;
            this.setState({
              correctLetters: this.state.correctLetters.concat([keyChar])
            });
            this._countCorrectLetters();
            return;
          }
        }
        if(count===0){
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
    //console.log("hotkey", e);
    if(e.keyCode==65){
      console.log("pressed A");
      this._handAction('a');
    }
    if(e.keyCode==66){;
      console.log("pressed B");
      this._handAction('b');
    }
    if(e.keyCode==67){;
      console.log("pressed C");
      this._handAction('c');
    }
    if(e.keyCode==68){;
      console.log("pressed D");
      this._handAction('d');
    }
    if(e.keyCode==69){;
      console.log("pressed E");
      this._handAction('e');
    }
    if(e.keyCode==70){;
      console.log("pressed F");
      this._handAction('f');
    }
    if(e.keyCode==71){;
      console.log("pressed G");
      this._handAction('g');
    }
    if(e.keyCode==72){;
      console.log("pressed H");
      this._handAction('h');
    }
    if(e.keyCode==73){;
      console.log("pressed I");
      this._handAction('i');
    }
    if(e.keyCode==74){;
      console.log("pressed J");
      this._handAction('j');
    }
    if(e.keyCode==75){;
      console.log("pressed K");
      this._handAction('k');
    }
    if(e.keyCode==76){;
      console.log("pressed L");
      this._handAction('l');
    }
    if(e.keyCode==77){;
      console.log("pressed M");
      this._handAction('m');
    }
    if(e.keyCode==78){;
      console.log("pressed N");
      this._handAction('n');
    }
    if(e.keyCode==79){;
      console.log("pressed O");
      this._handAction('o');
    }
    if(e.keyCode==80){;
      console.log("pressed P");
      this._handAction('p');
    }
    if(e.keyCode==81){;
      console.log("pressed Q");
      this._handAction('q');
    }
    if(e.keyCode==82){;
      console.log("pressed R");
      this._handAction('r');
    }
    if(e.keyCode==83){;
      console.log("pressed S");
      this._handAction('s');
    }
    if(e.keyCode==84){;
      console.log("pressed T");
      this._handAction('t');
    }
    if(e.keyCode==85){;
      console.log("pressed U");
      this._handAction('u');
    }
    if(e.keyCode==86){;
      console.log("pressed V");
      this._handAction('v');
    }
    if(e.keyCode==87){;
      console.log("pressed W");
      this._handAction('w');
    }
    if(e.keyCode==88){;
      console.log("pressed X");
      this._handAction('x');
    }
    if(e.keyCode==89){;
      console.log("pressed Y");
      this._handAction('y');
    }
    if(e.keyCode==90){;
      console.log("pressed Z");
      this._handAction('z');
    }
  }

  _emptyBoxList(){
    let arrayOfSpace=[]
    if(this.state.wordFromAPI !== undefined){
      const arraySize = this.state.wordFromAPI.length;
      for(let x=0; x < 12-arraySize; x++){
        arrayOfSpace.push(' ');
      }
    }
    return arrayOfSpace;
  }

  _startGame(){
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
        disabled: 'disabled',
        title: 'Hangman',
        buttonLabel: 'Start Game'
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
    .then(function(response) {
      console.log("you got word from API!");
      console.log(response.data);
      _this.setState({
        wordFromAPI: response.data.word.toLowerCase().split('')
      });
      return response.status;
    })
    .catch(function(response) {
      console.log(response);
      return response.status;
    });
  }

  _countCorrectLetters(){
    let uniqueLetters = this.state.wordFromAPI.getUnique();
    if(this.state.correctLetters.length === uniqueLetters.length){
      this.setState({
        resultBox: {
          disabled: '',
          title: '★ You Won! ★',
          buttonLabel: 'Restart Game'
        }
      });
    }
  }
  _countFailedLetters(){
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
