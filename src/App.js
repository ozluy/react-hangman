import React, { useState, useRef } from 'react'
import AnswerBox from './components/AnswerBox'
import FailBox from './components/FailBox'
import Result from './components/Result'
import Human from './components/Human'
import {
  Gallow,
  DownPipe,
  RightBlueTriangle,
  Input,
  AppWrapper,
} from './styled'

export default () => {
  const [wordFromAPI, setWordFromAPI] = useState([])
  const [resultBox, setResultBox] = useState({
    disabled: false,
    title: 'Hangman',
    buttonLabel: 'Start Game',
  })
  const [failedLetters, setFailedLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [word, setWord] = useState('')
  const inputRef = useRef(null)

  const handOnKeyPress = event => {
    let keyChar = event.key
    event.preventDefault()
    if (
      wordFromAPI.length > 0 &&
      'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.indexOf(keyChar) >
        -1
    ) {
      keyChar = keyChar.toUpperCase()
      if (
        !failedLetters.find(x => x === keyChar) &&
        !correctLetters.find(x => x === keyChar)
      ) {
        let count = 0
        for (let i = 0; i < wordFromAPI.length; i++) {
          if (keyChar === wordFromAPI[i]) {
            count++
            const newCorrectLetters = correctLetters.concat([keyChar])
            setCorrectLetters(newCorrectLetters)
            countCorrectLetters(newCorrectLetters)
            return
          }
        }
        if (count === 0) {
          if (failedLetters.length === 10) {
            setResultBox({
              disabled: false,
              title: `Game Over { word: ${word} }`,
              buttonLabel: 'Restart Game',
            })
          }
          setFailedLetters(failedLetters.concat([keyChar]))
        }
      }
    }
  }

  const emptyBoxList = () => {
    let arrayOfSpace = []
    if (wordFromAPI.length > 0) {
      const arraySize = wordFromAPI.length
      for (let x = 0; x < 12 - arraySize; x++) {
        arrayOfSpace.push(' ')
      }
    }
    return arrayOfSpace
  }

  const startGame = () => {
    setResultBox({
      disabled: true,
    })
    setFailedLetters([])
    setCorrectLetters([])
    setWordFromAPI([])
    setWord('')
    getDataFromAPI()
    inputRef.current.focus()
  }

  const getDataFromAPI = () => {
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
      .then(response => response.json())
      .then(response => {
        const responseWord = response.word
        let wordArr = responseWord.toUpperCase().split('')
        wordArr.map(item => {
          item === '-' && wordArr.splice(wordArr.indexOf('-'), 1)
          item === ' ' && wordArr.splice(wordArr.indexOf(' '), 1)
          return item
        })

        setWordFromAPI(wordArr)
        setWord(responseWord)
        return response.status
      })
  }

  const countCorrectLetters = correctLetters => {
    let uniqueLetters = filterUniqueItems(wordFromAPI)
    if (correctLetters.length === uniqueLetters.length) {
      setResultBox({
        disabled: false,
        title: '★ You Won! ★',
        buttonLabel: 'Restart Game',
      })
    }
  }

  const filterUniqueItems = items => {
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

  return (
    <AppWrapper>
      <Gallow>
        <DownPipe />
        <Input
          ref={inputRef}
          onKeyDown={handOnKeyPress}
          onFocus={() => inputRef.current.focus()}
          onBlur={() => inputRef.current.focus()}
        />
      </Gallow>
      <Human failedLetterCount={failedLetters.length} />

      <FailBox failedLetters={failedLetters} />
      <AnswerBox
        wordFromAPI={wordFromAPI}
        correctLetters={correctLetters}
        spaces={emptyBoxList()}
      />

      <RightBlueTriangle />
      <Result
        title={resultBox.title}
        disabled={resultBox.disabled}
        buttonLabel={resultBox.buttonLabel}
        buttonAction={startGame}
      />
    </AppWrapper>
  )
}
