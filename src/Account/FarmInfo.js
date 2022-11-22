import React, { useReducer, useState } from 'react'
import { DefaultEffectRequest, DefaultCallbackRequest } from '../ApiUtils/DefaultRequests'
import '../styles/Account.css'
import { useAuth } from '../useAuth'

const FarmInfo = (props) => {
    const {authTokens} = useAuth()
  const stateReducer = (state, newState) => {
    return { ...state, ...newState }
  }

  const [farmInfo, setFarmInfo] = useReducer(stateReducer, {})

  const effectState = (response) => {
    setFarmInfo(response.data)
  }
  const [refresh, setRefresh] = useState(false)
  DefaultEffectRequest('farms/', 'GET', effectState, refresh, {}, 'Token ' + authTokens)

  const [response, setResponse] = useState(false)
  const farmCallback = DefaultCallbackRequest('farms/', setResponse, "Token " + authTokens)
  const saveOnClick = async () => {
    await farmCallback('POST', farmInfo)
    setRefresh(!refresh)
  }
  return (
        <div className='account-info-container'>
            <div className='account-settings-name'>Farm Settings</div>
            <div className='input-container'>
                <div className='account-input-label'>Farm Name</div>
                <input className='account-input'
                    value={farmInfo.name}
                    onChange={(event) => setFarmInfo({ name: event.target.value })}
                ></input>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Address</div>
                <input className='account-input'
                    value={farmInfo.address}
                    onChange={(event) => setFarmInfo({ address: event.target.value })}
                ></input>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Stripe Connected?</div>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Is Registered</div>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Minimum Order Amount</div>
                <div className='min-farm-order-container'>
                    <div className='min-order-dollar'>$</div>
                    <input className='account-input min-order-input'
                        pattern="\d*"
                        maxLength="5"
                        placeholder='0.00'
                        value={farmInfo.minOrderAmount}
                        onChange={(event) => setFarmInfo({ minOrderAmount: event.target.value })}
                    ></input>
                </div>
            </div>
            <button className='login-button account-info-save-button' onClick={() => { saveOnClick() }}>Save</button>
        </div>
  )
}

export default FarmInfo
