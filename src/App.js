import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import shuffle from 'shuffle-array'
import { useWindowSize } from '@react-hook/window-size'
import Header from './Header'
import Tile from './Tile'
import Confetti from './Confetti'
import { textData } from './data'
import './App.css'

const n = 5 // number of rows and coloumns (only odd digits)
const freeCard = (n * n - 1) / 2
let hBingos = []
let vBingos = []
const dBingos = []
let timer1 = ''

const data = shuffle(textData).reduce(
  (dataObj, value, index) => ({ ...dataObj, [index]: value }),
  {}
)

function App () {
  const [isBingo, setIsBingo] = useState(false)
  const [selectedState, setSelectedState] = useState({
    checked: { [freeCard]: true }
  })

  const { width, height } = useWindowSize()

  useEffect(() => {
    checkIfBingo()

    return () => {
      clearTimeout(timer1)
    }
    // eslint-disable-next-line
  }, [selectedState]);

  const checkIfBingo = () => {
    const filtered = []
    Object.keys(selectedState.checked).forEach((key) => {
      if (selectedState.checked[key]) {
        filtered.push(key)
      }
    })
    isHorizontalBingo(filtered)
    isVerticalBingo(filtered)
    isDiagonalOneBingo(filtered)
  }

  function isHorizontalBingo (checkedCards = []) {
    let startPoint = 0
    let endPoint = n
    for (let iterationNumber = 0; iterationNumber < n; iterationNumber++) {
      const hLine = []

      for (let i = startPoint; i < endPoint; i++) {
        hLine.push(i.toString())
      }
      if (
        hLine.every((elem) => checkedCards.includes(elem)) &&
        !hBingos.includes(iterationNumber)
      ) {
        setIsBingo(true)
        clearBingoState()
        hBingos.push(iterationNumber)
      }

      startPoint = startPoint + n
      endPoint = endPoint + n
    }
  }

  function isVerticalBingo (checkedCards = []) {
    let startPoint = 0

    for (let iterationNumber = 0; iterationNumber < n; iterationNumber++) {
      const vLine = []

      for (let i = startPoint; i < n * n; i += n) {
        vLine.push(i.toString())
      }
      startPoint++

      if (
        vLine.every((elem) => checkedCards.includes(elem)) &&
        !vBingos.includes(iterationNumber)
      ) {
        setIsBingo(true)
        clearBingoState()
        vBingos.push(iterationNumber)
      }
    }
  }

  function isDiagonalOneBingo (checkedCards) {
    let startPoint = 0
    const dLine1 = []
    const dLine2 = []
    const d1 = 1
    const d2 = 2

    for (let i = startPoint; i < n * n; i += n + 1) {
      dLine1.push(i.toString())
      startPoint = i
    }

    for (let j = n * n - n; j > 0; j -= n - 1) {
      dLine2.push(j.toString())
      startPoint = j
    }

    if (
      dLine1.every((elem) => checkedCards.includes(elem)) &&
      !dBingos.includes(d1)
    ) {
      setIsBingo(true)
      clearBingoState()
      dBingos.push(d1)
    }

    if (
      dLine2.every((elem) => checkedCards.includes(elem)) &&
      !dBingos.includes(d2)
    ) {
      setIsBingo(true)
      clearBingoState()
      dBingos.push(d2)
    }
  }

  const reset = () => {
    setSelectedState({
      checked: { [freeCard]: true }
    })
    setIsBingo(false)
    hBingos = []
    vBingos = []
    clearTimeout(timer1)
  }

  const toggle = (id) => {
    if (parseInt(id) !== freeCard) {
      setSelectedState((state) => {
        const checked = {
          ...state.checked,
          [id]: !state.checked[id]
        }
        return {
          ...state,
          checked
        }
      })
    }
  }

  const clearBingoState = (delay = 5) => {
    timer1 = setTimeout(() => setIsBingo(false), delay * 1000)
  }

  return (
    <Layout>
      <Header reset={reset} />
      <div className='App'>
        <div className='wrapper'>
          {isBingo
            ? (
              <Confetti isBingo={isBingo} width={width} height={height} />
              )
            : null}
          <div className='square-container'>
            {Object.keys(data).map((id) => (
              <Tile
                isBingo={isBingo}
                key={id}
                id={id}
                isSet={id === 12 ? true : selectedState.checked[id]}
                onToggle={() => toggle(id)}
              >
                {data[id]}
              </Tile>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
