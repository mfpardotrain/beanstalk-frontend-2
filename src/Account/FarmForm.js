import React, { useReducer, useState } from 'react'
import { DefaultCallbackRequest } from '../ApiUtils/DefaultRequests'
import '../styles/SignUp.css'
import AccountForm from './AccountForm'

const FarmForm = (props) => {
    const { topBar, setSelectedComponent } = props

    const defaultFarm = {
        name: '',
        address: '',
        minOrderAmount: 10000
    }

    const stateReducer = (state, newState) => {
        return { ...state, ...newState }
    }
    const [farmDetails, setFarmDetails] = useReducer(stateReducer, defaultFarm)

    const [response, setResponse] = useState(false)
    const createFarmCallback = DefaultCallbackRequest('farms/', setResponse)

    let handleEnter = (event) => {
        if (event.key === 'Enter') {document.getElementById('enter-button').click()}
    }

    return (
        <div className='signup-form-container'>
            {topBar}
            <div className='signup-form-header'>Farm Details</div>
            <div className='input-label signup-input-label'>Farm Name</div>
            <input className='signup-input'
                placeholder='Enter farm name'
                value={farmDetails.name}
                onChange={(event) => {
                    setFarmDetails({ name: event.target.value })
                }}
            ></input>
            <div className='input-label signup-input-label'>Farm Address</div>
            <input className='signup-input'
                placeholder='Enter farm address'
                value={farmDetails.address}
                onChange={(event) => setFarmDetails({ address: event.target.value })}
                onKeyPress={event => handleEnter(event)}
            ></input>
            <button className='login-button' id="enter-button" onClick={async () => {
                let response = await createFarmCallback('POST', farmDetails)
                if (response.status === 200) {
                    setSelectedComponent(<AccountForm farm={response.data} isFarmer={true} topBar={topBar} setSelectedComponent={setSelectedComponent} />)
                } else {
                    "show errors"
                }
            }}>Continue</button>
        </div>
    )
}
export default FarmForm