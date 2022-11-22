import React, { useContext, useState, createContext, useReducer } from 'react'

export const CartContext = createContext({
  cart: false,
  updateCart: false,
  deleteCart: false,
  removeFromCart: false,
  selectedFarm: false,
  nVegetables: false,
  setSelectedFarm: false,
  setCartSlected: false,
  cartSlected: false,
  setSelectedMarket: false,
  selectedMarket: false
})

export const CartContextWrapper = ({ children }) => {
  function stateReducer(state, action) {
    switch (action.type) {
      case 'remove':
        return { ...action.newState }
      default:
        return { ...state, ...action.newState }
    }
  }

  const cartState = {}
  const [cart, setCart] = useReducer(stateReducer, cartState)
  const [selectedFarm, setSelectedFarm] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState(false)
  const [cartSelected, setCartSelected] = useState(false)
  const cartKeys = Object.keys(cart)
  const nVegetables = () => cartKeys.length

  const updateCart = (vegetable, amount) => {
    vegetable.orderAmount = amount
    const id = vegetable.id
    const newVeg = {}
    newVeg[id] = vegetable
    setCart({ type: null, newState: newVeg })
  }

  const removeFromCart = async (key) => {
    const state = { ...cart }
    delete state[key]
    setCart({ type: 'remove', newState: state })
  }

  const deleteCart = () => {
    setCart({ type: 'remove', newState: {} })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
        deleteCart,
        removeFromCart,
        selectedFarm,
        nVegetables,
        setSelectedFarm,
        setCartSelected,
        cartSelected,
        setSelectedMarket,
        selectedMarket
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartState = () => useContext(CartContext)
