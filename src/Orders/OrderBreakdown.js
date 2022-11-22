import React, { useState, useRef } from 'react'
import { useToggle } from '../Hooks'
import '../styles/Orders.css'

const OrderBreakdown = (props) => {
  const { order } = props
  const { id, market, farmer, customer, vegetables, status, farm, marketPickupDate, amount, fee, createdAt } = order
  const { isToggled, toggle } = useToggle(false)
  const ref = useRef()

  return (
        <div className='order-container'>
            <div className='order-info-container'
                onClick={() => { toggle() }}>
                <div className='order-farm'>{farm} at {market}</div>
                <div className='order-summary-details'>
                    <div className='order-summary-text'>{marketPickupDate} - </div>
                    <div className='order-summary-text'>${amount} - </div>
                    <div className='order-summary-text'>{vegetables.length} items</div>
                </div>
            </div>
            <div className={'order-bottom'.concat(isToggled ? ' order-open' : ' order-close')}>
                <div className='order-description-container'>
                    Open
                </div>
            </div>
        </div>
  )
}

export default OrderBreakdown
