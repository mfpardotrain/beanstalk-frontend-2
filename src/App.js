import './styles/App.css'
import MainPage from './MainPage.js'
import React from 'react'
import { CartContextWrapper } from './Cart/CartContext'

const App = () => {
  return (
    <div className="App">
      <CartContextWrapper>
        <MainPage />
      </CartContextWrapper>
    </div>
  )
}

export default App
