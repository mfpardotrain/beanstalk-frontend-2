import React from 'react'
import bag from '../images/bag.png'
import { useCartState } from './CartContext'
import '../styles/Cart.css'
import Cart from './Cart'

const CartButton = (props) => {
  const { setSelectedComponent, lastComponent } = props
  const { nVegetables, selectedFarm, setCartSelected } = useCartState()

  return (
        <div className='cart-button-container' onClick={() => {
          setSelectedComponent(<Cart setSelectedComponent={setSelectedComponent} lastComponent={lastComponent}/>)
          setCartSelected(true)
        }}>
            <img src={bag} className={'cart-icon'} alt="description" />
            <div className='cart-name-container'>
                <div>View Cart</div>
                <div>{selectedFarm}</div>
            </div>
            <div className='cart-n-vegetables'>{nVegetables()}</div>
        </div>
  )
}

export default CartButton
