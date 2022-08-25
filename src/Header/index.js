import React from 'react'
import { Layout, Button } from 'antd'
import './header.css'

const { Header } = Layout

function HeaderBar (props) {
  return (
    <Header className='header'>
      <h1 className='title'>Bingo</h1>
      <Button onClick={props.reset} className='reset-button' type='primary'>
        Reset
      </Button>
    </Header>
  )
}

export default HeaderBar
