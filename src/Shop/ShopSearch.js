import React, { useState, useRef, useEffect } from 'react'
import '../styles/ShopSearch.css'
import '../styles/TopBar.css'
import marketIcon from '../images/market.svg'
import orderIcon from '../images/order.svg'
import BuyVegetables from './BuyVegetables'
import { useCartState } from '../Cart/CartContext'
import { DefaultEffectRequest } from '../ApiUtils/DefaultRequests'

const ShopSearch = () => {
  const { setSelectedFarm, setSelectedMarket } = useCartState()
  const ref = useRef()

  const [searchSelected, setSearchSelected] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchData, setSearchData] = useState([])

  const effectHandler = (response) => {
    setSearchResults(response.data)
    setSearchData(response.data)
  }

  const [refresh, setRefresh] = useState(false)
  DefaultEffectRequest('marketFarmSearch/', 'GET', effectHandler, refresh, {}, null)

  useEffect(() => {
    setSearchSelected(document.activeElement === ref.current)
  }, [searchInput])

  const topBar = () => {
    return (
      <div className='top-bar'>
        <div className='arrow-container'
          onClick={() => {
            setSelectedComponent(false)
            setSearchResults(searchData)
          }}>
          <div className='arrow-chevron' />
          <div className='arrow-line' />
        </div>
      </div>
    )
  }

  const deleteSearchButton = (
    <div className='search-delete'
      onClick={() => {
        setSearchResults(searchData)
        setSearchInput('')
        setSearchSelected(false)
      }}>
      <div className='search-delete-left'></div>
      <div className='search-delete-right'></div>
    </div>
  )

  const search = (event, searchList) => {
    const searchWord = event.target.value
    setSearchInput(searchWord)
    const found = searchList.filter(item => {
      return item.name.toLowerCase().match(new RegExp(searchWord.toLowerCase() + '.*', 'g'))
    })
    setSearchResults(found)
  }

  const searchBar = () => {
    return (
      <div className='search-bar-container'>
        <input
          className='search-input'
          placeholder='Search for markets, farms'
          value={searchInput}
          onChange={(event) => search(event, searchData)}
          ref={ref}
        />
        {searchSelected && deleteSearchButton}
      </div>
    )
  }

  const clickResult = (el, searchList) => {
    if (el.type === 'market') {
      setSelectedComponent('market')
      setSelectedMarket(el)
      const results = searchList.filter(result => {
        if (result.farm) {
          return (
            el.farms.includes(result.farm.id) && result.type === 'farm' && el.id === result.market.id 
            )
        }
      })
      setSearchResults(results)
    } else {
      setSelectedComponent(<BuyVegetables farmId={el.id} farmName={el.name} vegetables={el.farmVegetables} />)
      setSelectedFarm(el.name)
      setSelectedMarket(el)
    }
  }

  const resultsRender = (results) => {
    const output = results.map(el => {
      return (
        <div key={String(el.id) + el.type}
          className='shop-search-result'
          onClick={() => clickResult(el, searchData)
          }>
          <img src={el.type === 'market' ? marketIcon : orderIcon} alt="none" className='search-result-image' />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='shop-search-result-name'>{el.name}</div>
            <div className='shop-search-result-description'>{el.description}</div>
          </div>
        </div>
      )
    })
    return (
      <div className='shop-search-results-container'>
        {output}
      </div>
    )
  }

  return (
    <div className='shop-search-container'>
      {!selectedComponent && searchBar()}
      {(!selectedComponent || selectedComponent === 'market') && resultsRender(searchResults)}
      {selectedComponent && topBar()}
      {selectedComponent !== 'market' && selectedComponent}
    </div>
  )
}

export default ShopSearch
