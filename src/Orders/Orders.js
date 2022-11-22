import React, { useState, useRef } from 'react'
import OrderBreakdown from './OrderBreakdown.js'
import '../styles/BuyVegetables.css'

const Orders = (props) => {
  const test = [
    { id: 1, market: 'coolito market', farmer: 'joe', customer: 'john hankey', vegetables: [1, 2, 3], status: 'complete', farm: 'rillito', marketPickupDate: '12/22/1999', amount: 39.48, fee: 1.33, createdAt: '12/18/1999' },
    { id: 2, market: 'babayaga', farmer: 'abigail', customer: 'john hankey', vegetables: [3, 4], status: 'paid', farm: 'rillito', marketPickupDate: '12/22/1999', amount: 56.88, fee: 1.33, createdAt: '12/18/1999' },
    { id: 4, market: 'babayaga', farmer: 'joe', customer: 'john hankey', vegetables: [0, 4], status: 'paid', farm: 'rillito', marketPickupDate: '12/22/1999', amount: 39.48, fee: 1.33, createdAt: '12/18/1999' },
    { id: 6, market: 'coolito market', farmer: 'joe', customer: 'john hankey', vegetables: [1, 5, 8, 9], status: 'complete', farm: 'rillito', marketPickupDate: '12/22/1999', amount: 39.48, fee: 1.33, createdAt: '12/18/1999' }
  ]

  const [orders, setOrders] = useState(test)

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
                {orderList(orders)}
            </div>
        </div>
  )
}
export default Orders
