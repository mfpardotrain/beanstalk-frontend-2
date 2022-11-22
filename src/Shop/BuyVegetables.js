import React from 'react'
import VegetableOption from './VegetableOption'
import '../styles/TopBar.css'
import '../styles/BuyVegetables.css'

const BuyVegetables = (props) => {
  const { farmName, vegetables } = props

  const vegetableOptions = (vegetables) => {
    const output = vegetables.map(el => {
      return (
                <VegetableOption vegetable={el} key={String(el.id) + el.name} />
      )
    })
    return (
            <div className='vegetable-options-container'>
                {output}
            </div>
    )
  }

  return (
        <div className='buy-vegetables-container'>
            <div className='buy-vegetables-farm-name'>{farmName}</div>
            {vegetableOptions(vegetables)}
        </div>
  )
}

export default BuyVegetables
