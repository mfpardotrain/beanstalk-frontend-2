import React, { useReducer, useState } from 'react'
import '../styles/Inventory.css'
import VegetableForm from './VegetableForm'
import { useAuth } from '../useAuth';
import { DefaultEffectRequest } from '../ApiUtils/DefaultRequests';

const Inventory = (props) => {
  const { authTokens } = useAuth()
  const stateReducer = (state, newState) => {
    return { ...state, ...newState }
  }

  const [inventory, setInventory] = useReducer(stateReducer, { vegetables: [] })

  const blankVegetable = { id: null, name: '', description: '', price: '', unitWeight: '', maxOrderAmount: 10000, availableAmount: 0 }

  const [refresh, setRefresh] = useState(false)
  const flipRefresh = () => {
    setRefresh(!refresh)
  }

  const effectState = (response) => {
    setInventory({ vegetables: response.data })
  }

  DefaultEffectRequest('farmVegetables/', 'GET', effectState, refresh, {}, "Token " + authTokens)

  const vegetableList = (array) => {
    const output = array.map(el => {
      return (
        <VegetableForm vegetableInfo={el} refresh={flipRefresh} key={el.id} keyClass={el.id} />
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
      <h3>Inventory</h3>
      <VegetableForm vegetableInfo={blankVegetable} refresh={flipRefresh} key={"blank"} />
      {vegetableList(inventory.vegetables)}
    </div>
  )
}

export default Inventory
