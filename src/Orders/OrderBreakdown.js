import React, { useState, useRef } from 'react'
import { useToggle } from '../Hooks'
import '../styles/Orders.css'

const OrderBreakdown = (props) => {
  const { order } = props
  const { id, marketInfo, farmer, customer, farmVegetables, status, farm, marketPickupDate, amount, fee, createdAt } = order
  const { isToggled, toggle } = useToggle(false)
  const ref = useRef()

  const date = new Date(Date.parse(marketPickupDate)).toDateString()

  const details = (vegetables) => {
    let keys = Object.keys(vegetables)
    let output = keys.map((key) => {
      const { farmVegetable, orderAmount, price } = vegetables[key]
        return (
            <div className='order-description-vegetable'>
                {farmVegetable}: {orderAmount} for ${price} per unit
            </div>
        )
    })
    return (
        <div className='order-description-container'>
            {output}
        </div>
    )
  }

  return (
        <div className='order-container'>
            <div className='order-info-container'
                onClick={() => { toggle() }}>
                <div className='order-farm'>{farm.name} at {marketInfo.market.name}</div>
                <div className='order-summary-details'>
                    <div className='order-summary-text'>{date} - </div>
                    <div className='order-summary-text'>${amount} - </div>
                    <div className='order-summary-text'>{farmVegetables.length} items</div>
                </div>
            </div>
            <div className={'order-bottom'.concat(isToggled ? ' order-open' : ' order-close')}>
                {details(farmVegetables)}
            </div>
        </div>
  )
}

export default OrderBreakdown
