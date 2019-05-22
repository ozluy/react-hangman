import React from 'react'
import AnswerBox from './components/AnswerBox'
import FailBox from './components/FailBox'
import Result from './components/Result'
import Human from './components/Human'
import { Gallow, DownPipe, RightBlueTriangle, Input } from './styled'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wordFromAPI: [],
      playing: true,
      resultBox: {
        disabled: false,
        title: 'Hangman',
        buttonLabel: 'Start Game',
      },

      failedLetters: [],
      correctLetters: [],
    }
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const {
      failedLetters,
      correctLetters,
      wordFromAPI,
      resultBox,
      playing,
    } = this.state
    return (
      <>
        <Gallow>
          <DownPipe />
          <Input
            ref={this.inputRef}
            onKeyDown={this.handOnKeyPress}
            onFocus={() => this.setState({ playing: true })}
            // onBlur={() => this.setState({ playing: false })}
          />
        </Gallow>
        <Human failedLetterCount={failedLetters.length} />

        <FailBox failedLetters={failedLetters} />
        <AnswerBox
          wordFromAPI={wordFromAPI}
          correctLetters={correctLetters}
          spaces={this.emptyBoxList()}
        />

        <RightBlueTriangle />
        <Result
          title={playing ? resultBox.title : 'Game paused'}
          disabled={resultBox.disabled}
          buttonLabel={playing ? resultBox.buttonLabel : 'Continue Playing'}
          buttonAction={playing ? this.startGame : () => this.continueGame}
        />
      </>
    )
  }
  handOnKeyPress = event => {
    const keyChar = event.key
    event.preventDefault()
    const { wordFromAPI, failedLetters, correctLetters, word } = this.state

    if (
      wordFromAPI.length > 0 &&
      'qwertyuiopasdfghjklzxcvbnm'.indexOf(keyChar) > -1
    ) {
      if (
        !failedLetters.find(x => x === keyChar) &&
        !correctLetters.find(x => x === keyChar)
      ) {
        let count = 0
        for (let i = 0; i < wordFromAPI.length; i++) {
          if (keyChar === wordFromAPI[i]) {
            count++
            const newCorrectLetters = correctLetters.concat([keyChar])
            this.setState({
              correctLetters: newCorrectLetters,
            })
            this.countCorrectLetters(newCorrectLetters)
            return
          }
        }
        if (count === 0) {
          if (failedLetters.length === 10) {
            this.setState({
              resultBox: {
                disabled: false,
                title: `Game Over (word: ${word})`,
                buttonLabel: 'Restart Game',
              },
            })
          } else {
            this.setState({
              failedLetters: failedLetters.concat([keyChar]),
            })
          }
        }
      }
    }
  }

  emptyBoxList = () => {
    let arrayOfSpace = []
    const { wordFromAPI } = this.state
    if (wordFromAPI.length > 0) {
      const arraySize = wordFromAPI.length
      for (let x = 0; x < 12 - arraySize; x++) {
        arrayOfSpace.push(' ')
      }
    }
    return arrayOfSpace
  }

  startGame = () => {
    this.setState({
      resultBox: {
        disabled: true,
      },
      failedLetters: [],
      correctLetters: [],
      wordFromAPI: [],
      word: '',
    })
    this.getDataFromAPI()
    this.inputRef.current.focus()
  }
  continueGame = () => {
    this.inputRef.current.focus()
  }

  getDataFromAPI() {
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
        let wordArr = response.word.split('')
        wordArr.map(item => {
          item === '-' && wordArr.splice(wordArr.indexOf('-'), 1)
          item === ' ' && wordArr.splice(wordArr.indexOf(' '), 1)
          return item
        })
        _this.setState({
          wordFromAPI: wordArr,
          word: response.word,
        })
        return response.status
      })
  }

  countCorrectLetters = correctLetters => {
    const { wordFromAPI } = this.state
    let uniqueLetters = this.filterUniqueItems(wordFromAPI)
    if (correctLetters.length === uniqueLetters.length) {
      this.setState({
        resultBox: {
          disabled: false,
          title: '★ You Won! ★',
          buttonLabel: 'Restart Game',
        },
      })
    }
  }

  filterUniqueItems = items => {
    const obj = {},
      uniqueItems = []
    for (var i = 0, l = items.length; i < l; ++i) {
      if (obj.hasOwnProperty(items[i])) {
        continue
      }
      uniqueItems.push(items[i])
      obj[items[i]] = 1
    }
    return uniqueItems
  }
}
