import React from 'react'
import { HotKeys } from 'react-hotkeys'
import AnswerBoxMenu from './components/AnswerBoxMenu'
import FailBoxMenu from './components/FailBoxMenu'
import GameResult from './components/GameResult'
import Man from './components/Man'
import './bundle.min.css'

const getUnique = arr => {
  let u = {},
    a = []
  for (var i = 0, l = arr.ength; i < l; ++i) {
    if (u.hasOwnProperty(arr[i])) {
      continue
    }
    a.push(arr[i])
    u[arr[i]] = 1
  }
  return a
}

const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('')

const keyMap = {}
letters.map(letter => {
  keyMap[letter] = letter
  return letter
})

const handlers = (eventHandler, component) => {
  const eventObj = {}
  letters.map(letter => {
    eventObj[letter] = () => eventHandler(letter, component)
    return letter
  })
  return eventObj
}

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      wordFromAPI: [],
      resultBox: {
        disabled: '',
        title: 'Hangman',
        buttonLabel: 'Start Game',
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
      rightFootVisibility: 'hidden',
    }
  }

  render() {
    return (
      <HotKeys keyMap={keyMap} handlers={handlers(this._handAction, this)}>
        <div className='gallow'>
          <div className='down-pipe'> </div>
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
          {this.state.failedLetters.map((letter, index) => {
            return (
              <div key={index} className='fail-box-menu-item'>
                {letter}
              </div>
            )
          })}
        </FailBoxMenu>
        <AnswerBoxMenu>
          {this._emptyBoxList().map((item, index) => {
            return <div key={index} className='answer-box-menu-item disabled' />
          })}
          {this.state.wordFromAPI.map((letter, index) => {
            return (
              <div key={index} className='answer-box-menu-item'>
                {this.state.correctLetters.find(x => x === letter)
                  ? letter
                  : ''}
              </div>
            )
          })}
        </AnswerBoxMenu>

        <div className='right-blue-triangle' />
        <GameResult
          title={this.state.resultBox.title}
          rootClass={this.state.resultBox.disabled}
          buttonLabel={this.state.resultBox.buttonLabel}
          buttonAction={this._startGame.bind(this)}
        />
      </HotKeys>
    )
  }
  _handAction(keyChar, _this = this) {
    if (_this.state.wordFromAPI.length > 0) {
      if (
        !_this.state.failedLetters.find(x => x === keyChar) &&
        !_this.state.correctLetters.find(x => x === keyChar)
      ) {
        let count = 0
        for (let i = 0; i < _this.state.wordFromAPI.length; i++) {
          if (keyChar === _this.state.wordFromAPI[i]) {
            count++
            _this.setState({
              correctLetters: _this.state.correctLetters.concat([keyChar]),
            })
            _this._countCorrectLetters()
            return
          }
        }
        if (count === 0) {
          _this.setState({
            failedLetters: _this.state.failedLetters.concat([keyChar]),
          })
          _this._countFailedLetters()
        }
      }
    }
  }

  _emptyBoxList() {
    let arrayOfSpace = []
    if (this.state.wordFromAPI !== undefined) {
      const arraySize = this.state.wordFromAPI.length
      for (let x = 0; x < 12 - arraySize; x++) {
        arrayOfSpace.push(' ')
      }
    }
    return arrayOfSpace
  }

  _startGame() {
    this._getDataFromAPI()
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
      },
      failedLetters: [],
      correctLetters: [],
    })
  }

  _getDataFromAPI() {
    const _this = this
    const params = {
      hasDictionaryDef: true,
      minCorpusCount: 0,
      maxCorpusCount: -1,
      maxDictionaryCount: -1,
      minLength: 3,
      maxLength: 12,
      api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
    }
    let url = new URL('http://api.wordnik.com/v4/words.json/randomWord')
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    )
    fetch(url, {
      method: 'GET',
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        console.log('you got word from API:', response.word)
        let wordArr = response.word.split('')
        wordArr.map(item => {
          if (item === '-') {
            wordArr.splice(wordArr.indexOf('-'), 1)
          }
          if (item === ' ') {
            wordArr.splice(wordArr.indexOf(' '), 1)
          }
          return item
        })
        _this.setState({
          wordFromAPI: wordArr,
        })
        return response.status
      })
  }

  _countCorrectLetters() {
    let uniqueLetters = getUnique(this.state.wordFromAPI)
    if (this.state.correctLetters.length === uniqueLetters.length) {
      this.setState({
        resultBox: {
          disabled: '',
          title: '★ You Won! ★',
          buttonLabel: 'Restart Game',
        },
      })
    }
  }
  _countFailedLetters() {
    switch (this.state.failedLetters.length) {
      case 1:
        return this.setState({
          headVisibility: 'visible',
        })
      case 2:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
        })

      case 3:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
        })
      case 4:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
        })
      case 5:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
        })
      case 6:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
        })
      case 7:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
          rightHandVisibility: 'visible',
        })
      case 8:
        return this.setState({
          headVisibility: 'visible',
          neckVisibility: 'visible',
          corpusVisibility: 'visible',
          leftArmVisibility: 'visible',
          rightArmVisibility: 'visible',
          leftHandVisibility: 'visible',
          rightHandVisibility: 'visible',
          leftLegVisibility: 'visible',
        })
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
          rightLegVisibility: 'visible',
        })
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
          leftFootVisibility: 'visible',
        })
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
            buttonLabel: 'Restart Game',
          },
          failedLetters: [],
        })
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
          rightFootVisibility: 'hidden',
        })
    }
  }
}
