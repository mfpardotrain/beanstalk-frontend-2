import React, { useState, useRef } from 'react'
import { useCartState } from '../Cart/CartContext'
import { useToggle } from '../Hooks'
import '../styles/BuyVegetables.css'

const VegetableOption = (props) => {
  const { updateCart } = useCartState()
  const { vegetable } = props
  const { name, description, unitWeight, price } = vegetable
  const { isToggled, toggle } = useToggle(false)
  const [orderAmount, setOrderAmount] = useState('')
  const ref = useRef()

  return (
        <div className='vegetable-option'>
            <div className='vegetable-option-info-container'
                onClick={async () => {
                  await toggle()
                  ref.current.focus()
                }}>
                <div className='vegetable-option-name'>{name}</div>
                <div className='vegetable-option-description'>{description}</div>
                <div className='vegetable-option-price'>${price} per {unitWeight}</div>
            </div>
            <div className={'buy-vegetable-bottom'.concat(isToggled ? ' vegetable-option-open' : ' vegetable-option-close')}>
                <div className='order-input-container'>
                    <input className='order-input'
                        ref={ref}
                        value={orderAmount}
                        type="text"
                        pattern="\d*"
                        maxLength="5"
                        placeholder='0.00'
                        onChange={(event) => setOrderAmount(event.target.value)}
                    ></input>
                    <div className='order-input-label'> {unitWeight}</div>
                </div>
                <button className='order-button' onClick={() => {
                    if (orderAmount > 0) {
                        updateCart(vegetable, orderAmount)
                }}}>Add to Order</button>
            </div>
        </div>
  )
}

export default VegetableOption
