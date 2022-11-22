import React, { useEffect, useState } from 'react'
import marketIcon from './images/inventory.svg'
import searchIcon from './images/search.svg'
import orderIcon from './images/receipt.svg'
import accountIcon from './images/account.svg'
import './styles/BottomBar.css'
import FarmerPage from './FarmerPage.js'
import ShopSearch from './Shop/ShopSearch.js'
import Orders from './Orders/Orders.js'
import Account from './Account/Account'
import { useCartState } from './Cart/CartContext'
import CartButton from './Cart/CartButton'
import { AuthContext } from './useAuth'


const MainPage = (props) => {
  const [authTokens, setAuthTokens] = useState()
  const [isFarmer, setIsFarmer] = useState(true)
  const { nVegetables, cartSelected } = useCartState()

  useEffect(() => {
    // setIsFarmer(localStorage.getItem("isFarmer") === "true")
  })

  useEffect(() => {
    let loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      setAuthTokens(loggedIn)
    }
  }, [authTokens])

  const tiles = {
    0: {
      class: 'tile',
      name: 'Account',
      css_id: 'account-button',
      component: <Account isFarmer={isFarmer}/>,
      content: <img className="account-icon" src={accountIcon} alt="description" />,
      description: ''
    },
    1: {
      class: 'tile',
      name: 'Search',
      css_id: 'customer-order',
      component: <ShopSearch />,
      content: <img src={searchIcon} className={'tile-icon'} alt="description" />,
      description: 'Find from a farmer near you!'
    },
    2: {
      class: 'tile',
      name: 'Orders',
      css_id: 'order-history',
      component: <Orders />,
      content: <img src={orderIcon} className={'tile-icon'} alt="description" />,
      description: 'View past orders.'
    }
  }

  if (isFarmer) {
    tiles[3] = {
      class: 'tile',
      name: 'Inventory',
      css_id: 'inventory',
      component: <FarmerPage />,
      content: <img src={marketIcon} className={'tile-icon'} alt="description" />,
      description: 'What do you sell?'

    }
  }

  const [selectedTile, setSelectedTile] = useState(tiles[1].name)
  const [selectedComponent, setSelectedComponent] = useState(tiles[1].component)

  const bottomBar = (obj) => {
    const keys = Object.keys(obj)
    const barContents = keys.map(key => {
      return (
        <div className={selectedTile === obj[key].name ? 'selected-bottom bottom-bar-content' : 'bottom-bar-content'}
          onClick={() => {
            setSelectedTile(obj[key].name)
            setSelectedComponent(obj[key].component)
          }}
          key={obj[key].name}
        >
          {obj[key].content}
          {obj[key].name}
        </div>
      )
    })
    return (
      <div className='home-page-container'>
        {selectedComponent}
        {!cartSelected &&
          <div className="bottom-bar-container">
            {barContents}
          </div>
        }
      </div>
    )
  }

  return (
    <div className="main-page-container">
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setAuthTokens }}>
        {nVegetables() > 0 && !cartSelected && selectedTile === 'Search' && <CartButton setSelectedComponent={setSelectedComponent} lastComponent={selectedComponent} />}
        {bottomBar(tiles)}
      </AuthContext.Provider>
    </div>
  )
}

export default MainPage
