import React, { useState } from 'react'
import marketIcon from './images/market.svg'
import orderIcon from './images/order.svg'
import Market from './Market/Market.js'
import Inventory from './Inventory/Inventory.js'
import './styles/FarmerPage.css'
import './styles/TopBar.css'

const FarmerPage = () => {
  const [selectedComponent, setSelectedComponent] = useState(false)

  const topBar = () => {
    return (
      <div className='top-bar'>
        <div className='arrow-container' onClick={() => setSelectedComponent(false)}>
          <div className='arrow-chevron' />
          <div className='arrow-line' />
        </div>
      </div>
    )
  }

  const tiles = (
    <div className="farmer-tile-container">
      <div className='farmer-page-tile'
        onClick={() => setSelectedComponent(<Inventory />)}>
        <img src={orderIcon} className="tile-icon" alt="description" />
        <div className='farmer-page-tile-name'>
          What do you sell?
        </div>
      </div>
      <div className='farmer-page-tile'
        onClick={() => setSelectedComponent(<Market />)}>
        <img src={marketIcon} className="tile-icon" alt="description" />
        <div className='farmer-page-tile-name'>
          Where do you sell?
        </div>
      </div>
    </div>
  )

  return (
    <div className='farmer-page-container'>
      {!selectedComponent && tiles}
      {selectedComponent && topBar()}
      {selectedComponent && selectedComponent}
    </div>
  )
}

export default FarmerPage
