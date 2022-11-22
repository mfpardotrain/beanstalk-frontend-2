import React, { useReducer, useState } from 'react'
import '../styles/Account.css'
import '../styles/Modal.css'
import ButtonModal from '../ButtonModal'
import { DefaultEffectRequest, DefaultCallbackRequest } from '../ApiUtils/DefaultRequests'
import { useAuth } from '../useAuth'
import { useToggle } from '../Hooks'

const AccountInfo = (props) => {
    const {authTokens} = useAuth()

  const stateReducer = (state, newState) => {
    return { ...state, ...newState }
  }

  const [accountInfo, setAccountInfo] = useReducer(stateReducer, {})
  const [showModal, setShowModal] = useState(false)

  const { isToggled, toggle, setToggle } = useToggle(accountInfo.isNotifiable)

  const DELETE_MESSAGE = 'Are you sure you want to delete your account?'
  const BUTTON_LABEL = 'Delete Account'

  const [refresh, setRefresh] = useState(false)
  const effectState = (response) =>{
    setAccountInfo(response.data)
    setToggle(response.data.isNotifiable)
  }
  DefaultEffectRequest('users/', 'GET', effectState, refresh, {}, 'Token ' + authTokens)

  const [response, setResponse] = useState(false)
  const userCallback = DefaultCallbackRequest('users/', setResponse, "Token " + authTokens)
  const saveOnClick = async () => {
    await userCallback('POST', accountInfo)
    setRefresh(!refresh)
  }
  const deleteOnClick = async () => {
    await userCallback('DELETE', accountInfo)
    setRefresh(!refresh)
  }

  return (
        <div className='account-info-container'>
            <div className='account-settings-name'>Manage Account</div>
            <div className='input-container'>
                <div className='account-input-label'>First Name</div>
                <input className='account-input'
                    value={accountInfo.firstName}
                    onChange={(event) => setAccountInfo({ firstName: event.target.value })}
                ></input>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Last Name</div>
                <input className='account-input'
                    value={accountInfo.lastName}
                    onChange={(event) => setAccountInfo({ lastName: event.target.value })}
                ></input>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Email Address</div>
                <input className='account-input'
                    value={accountInfo.email}
                    onChange={(event) => setAccountInfo({ email: event.target.value })}
                ></input>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Phone Number</div>
                <input className='account-input'
                    value={accountInfo.primaryPhone}
                    onChange={(event) => setAccountInfo({ primaryPhone: event.target.value })}
                ></input>
            </div>
            <div className='input-container'>
                <div className='account-input-label'>Address</div>
                <input className='account-input'
                    value={accountInfo.address}
                    onChange={(event) => setAccountInfo({ address: event.target.value })}
                ></input>
            </div>
            <div className='notification-button-container'>
                <div className='account-input-label'>Can we notify you about your order?</div>
                <div className={'toggle-button-container'.concat(isToggled ? '-true' : '-false')}
                    onClick={() => {
                      toggle()
                      setAccountInfo({ isNotifiable: !accountInfo.isNotifiable })
                    }}>
                    <div className='toggle-button-circle'></div>
                </div>
            </div>
            <button className='login-button account-info-save-button' onClick={() => { saveOnClick() }}>Save</button>
            <button className='login-button delete-button' onClick={() => { setShowModal(true) }}>Delete Account</button>
            <ButtonModal
                message={DELETE_MESSAGE}
                buttonLabel={BUTTON_LABEL}
                onClick={deleteOnClick}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
  )
}

export default AccountInfo
