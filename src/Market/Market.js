import React, { useReducer, useState, useRef } from 'react'
import MarketForm from './MarketForm'
import '../styles/Market.css'
import { DefaultEffectRequest } from '../ApiUtils/DefaultRequests'
import { useAuth } from '../useAuth'
import SuggestMarketForm from './SuggestMarketForm'

const Market = (props) => {
  const { authTokens } = useAuth()
  const stateReducer = (state, newState) => {
    return { ...state, ...newState }
  }

  const [marketInfo, setMarketInfo] = useReducer(stateReducer, { marketInfo: [] })
  const [allVegetables, setAllVegetables] = useState([])
  const [markets, setMarkets] = useState([])

  const blankMarketInfo = { id: null, farmVegetables: [], cronString: '0 9 * * *', endCronString: '0 17 * * *' }

  const updateVegetables = (response) => {
    setAllVegetables(response.data)
  }
  const updateMarketInfo = (response) => {
    setMarketInfo({ marketInfo: response.data })
  }
  const updateMarkets = (response) => {
    setMarkets(response.data)
  }
  const [refresh, setRefresh] = useState(false)
  const flipRefresh = () => {
    setRefresh(!refresh)
  }
  
  DefaultEffectRequest('farmVegetables/', 'GET', updateVegetables, refresh, {}, "Token " + authTokens)
  DefaultEffectRequest('marketInfo/', 'GET', updateMarketInfo, refresh, {}, "Token " + authTokens)
  DefaultEffectRequest('markets/', 'GET', updateMarkets, refresh, {}, "Token " + authTokens)

  const marketList = (array) => {
    const output = array.map(el => {
      return (
        <MarketForm marketDetails={el} allVegetables={allVegetables} refresh={flipRefresh} key={el.id} />
      )
    })
    return (
      <div className='market-list-container'>
        {output}
      </div>
    )
  }

  const verifiedMarkets = (array) => {
    const output = array.map((el, i) => {
      let blankCopy = JSON.parse(JSON.stringify(blankMarketInfo))
      blankCopy.market = el
      return (
        <MarketForm marketDetails={blankCopy} allVegetables={allVegetables} refresh={flipRefresh} key={"blank" + i} />
      )
    })
    return (
      <div className='market-list-container'>
        {output}
      </div>
    )
  }

  return (
    <div className="market-container">
      <h3>Your Markets</h3>
      {marketList(marketInfo.marketInfo)}
      <h3>Our Verified Markets</h3>
      {verifiedMarkets(markets)}
      <SuggestMarketForm refresh={flipRefresh}/>
    </div>
  )
}

export default Market
