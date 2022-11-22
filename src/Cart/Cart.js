import React, { useState } from 'react'
import { useCartState } from './CartContext'
import '../styles/Cart.css'
import bin from '../images/bin.png'
import ButtonModal from '../ButtonModal'
import { DefaultCallbackRequest } from '../ApiUtils/DefaultRequests'
import { useAuth } from '../useAuth'

const Cart = (props) => {
  const { setSelectedComponent, lastComponent } = props
  const { setCartSelected, cart, selectedFarm, removeFromCart, nVegetables, selectedMarket } = useCartState()

  const topBar = () => {
    return (
      <div className='top-bar'>
        <div className='arrow-container'
          onClick={() => {
            setSelectedComponent(lastComponent)
            setCartSelected(false)
          }}>
          <div className='arrow-chevron' />
          <div className='arrow-line' />
        </div>
      </div>
    )
  }
  const [showModal, setShowModal] = useState(false)
  const [deleteEl, setDeleteEl] = useState(false)
  const DELETE_MESSAGE = 'Are you sure you want remove this item from your cart?'
  const BUTTON_LABEL = 'Remove Item'
  const deleteOnClick = (el) => {
    removeFromCart(el)
    setShowModal(false)
    if (nVegetables() === 1) {
      setCartSelected(false)
      setSelectedComponent(lastComponent)
    }
  }
  
  const {authTokens} = useAuth()
  const [response, setResponse] = useState(false)
  const orderCallback = DefaultCallbackRequest('order/', setResponse, "Token " + authTokens)

  const items = (cart) => {
    const cartKeys = Object.keys(cart)
    const output = cartKeys.map(el => {
      const { name, orderAmount, unitWeight, price, id } = cart[el]
      return (
        <div className='cart-item-container' key={id}>
          <div className='cart-item-name'>{name}</div>
          <div className='cart-item-description'>{orderAmount} {unitWeight}</div>
          <div className='cart-item-price'>${orderAmount * price}</div>
          <img src={bin} className={'cart-delete-icon'} alt="description" onClick={() => {
            setShowModal(true)
            setDeleteEl(el)
          }} />
        </div>
      )
    })
    return output
  }

  const totalPrice = (cart) => {
    const cartKeys = Object.keys(cart)
    const priceList = cartKeys.map(el => {
      const { orderAmount, price } = cart[el]
      return orderAmount * price
    })
    return priceList.reduce((acc, value) => {
      return acc + value
    }, 0)
  }

  const fee = 2.99

  const orderOnClick = () => {
    orderCallback('POST', {
      vegetables: cart,
      marketInfo: selectedMarket,
    })
  }

  return (
    <div className='cart-container'>
      {topBar()}
      <div className='cart-farm-name'>{selectedFarm}</div>
      <div className='cart-contents-container'>
        <div className='cart-title'>Items</div>
        {items(cart)}
      </div>
      <div className='cart-bottom-container'>
        <div className='cart-bottom-name'>Total</div>
        <div className='cart-bottom-item'>
          <div className='cart-bottom-item-name'>Item Total</div>
          <div className='cart-bottom-item-price'>${totalPrice(cart)}</div>
        </div>
        <div className='cart-bottom-item'>
          <div className='cart-bottom-item-name'>Fees & Tax</div>
          <div className='cart-bottom-item-price'>${fee}</div>
        </div>
        <div className='cart-bottom-button' onClick={() => orderOnClick()}>
          <div>Continue</div>
          <div>${totalPrice(cart) + fee}</div>
        </div>
      </div>
      <ButtonModal
        message={DELETE_MESSAGE}
        buttonLabel={BUTTON_LABEL}
        onClick={() => deleteOnClick(deleteEl)}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  )
}

export default Cart
