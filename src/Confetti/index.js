import React from 'react'
import Fade from 'react-reveal/Fade'
import Confetti from 'react-confetti'
import './confetti.css'

function ConfettiContainer (props) {
  return (
    <div>
      <Fade when={props.isBingo}>
        <h1 className='bingo-win-text'>BINGO</h1>
      </Fade>
      <Confetti width={props.width} height={props.height} />
    </div>
  )
}

export default ConfettiContainer
