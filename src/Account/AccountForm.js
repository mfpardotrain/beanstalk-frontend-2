import React, { useReducer, useState } from 'react'
import { useToggle } from '../Hooks'
import '../styles/SignUp.css'
import { DefaultCallbackRequest } from '../ApiUtils/DefaultRequests'
import Login from './Login'


const AccountForm = (props) => {
    const { topBar, farm, isFarmer, setSelectedComponent } = props
    const defaultAccount = {
        email: '',
        firstName: '',
        lastName: '',
        farm: farm,
        isFarmer: isFarmer,
        isCustomer: !isFarmer,
        address: '',
        primaryPhone: '',
        isNotifiable: true,
        password: '',
    }

    const stateReducer = (state, newState) => {
        return { ...state, ...newState }
    }
    const [accountDetails, setAccountDetails] = useReducer(stateReducer, defaultAccount)
    const { isToggled, toggle } = useToggle(accountDetails.isNotifiable)

    const [response, setResponse] = useState(false)
    const createUserCallback = DefaultCallbackRequest('createUser/', setResponse)

    return (
        <div className='signup-form-container'>
            {topBar}
            <div className='signup-form-header'>Account Details</div>
            <div className='input-label signup-input-label'>Email</div>
            <input className='signup-input'
                placeholder='example@example.com'
                value={accountDetails.email}
                onChange={(event) => {
                    setAccountDetails({ email: event.target.value })
                }}
            ></input>
            <div className='input-label signup-input-label'>Password</div>
            <input className='signup-input'
                placeholder='password'
                value={accountDetails.password}
                onChange={(event) => {
                    setAccountDetails({ password: event.target.value })
                }}
            ></input>
            <div className='input-label signup-input-label'>First Name</div>
            <input className='signup-input'
                placeholder='Suzy'
                value={accountDetails.firstName}
                onChange={(event) => {
                    setAccountDetails({ firstName: event.target.value })
                }}
            ></input>
            <div className='input-label signup-input-label'>Last Name</div>
            <input className='signup-input'
                placeholder='Smith'
                value={accountDetails.lastName}
                onChange={(event) => {
                    setAccountDetails({ lastName: event.target.value })
                }}
            ></input>
            <div className='input-label signup-input-label'>Address</div>
            <input className='signup-input'
                placeholder='1 Main Street'
                value={accountDetails.address}
                onChange={(event) => setAccountDetails({ address: event.target.value })}
            ></input>
            <div className='input-label signup-input-label'>Phone Number</div>
            <input className='signup-input'
                placeholder='555-555-5555'
                value={accountDetails.primaryPhone}
                onChange={(event) => {
                    setAccountDetails({ primaryPhone: event.target.value })
                }}
            ></input>
            <div className='notification-button-container signup-notifiable'>
                <div className='account-input-label'>Can we email you about orders?</div>
                <div className={'toggle-button-container'.concat(isToggled ? '-true' : '-false')}
                    onClick={() => {
                        toggle()
                        setAccountDetails({ isNotifiable: !accountDetails.isNotifiable })
                    }}>
                    <div className='toggle-button-circle'></div>
                </div>
            </div>
            <button className='login-button' onClick={async () => {
                let response = await createUserCallback('POST', accountDetails)
                if (response.status === 200) {
                    setSelectedComponent(<Login />)
                } else {
                    "do not"
                    setSelectedComponent(<Login />)
                }
                }}>Sign Up</button>
        </div>
    )
}

export default AccountForm
