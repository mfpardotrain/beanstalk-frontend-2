import React, { useState, } from 'react'
import OrderBreakdown from './OrderBreakdown.js'
import { DefaultEffectRequest } from '../ApiUtils/DefaultRequests.js'
import { useAuth } from '../useAuth.js'
import '../styles/BuyVegetables.css'

const Orders = (props) => {
  const { authTokens } = useAuth()

  const [upcomingOrders, setUpcomingOrders] = useState([])
  const [previousOrders, setPreviousOrders] = useState([])

  const effectHandler = (response) => {
    setUpcomingOrders(response.data.upcomingOrders)
    setPreviousOrders(response.data.previousOrders)
  }

  const [refresh, setRefresh] = useState(false)
  DefaultEffectRequest('orderHistory/', 'GET', effectHandler, refresh, {}, "Token " + authTokens)

  const orderList = (array) => {
    const output = array.map(el => {
      return (
                <OrderBreakdown order={el} key={el.id} />
      )
    })
    return (
            <div className='order-list-container'>
                {output}
            </div>
    )
  }

  return (
        <div>
            <div className="orders-container">
                <h3>Orders</h3>
                {orderList(previousOrders)}
            </div>
        </div>
  )
}
export default Orders
