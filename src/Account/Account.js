import React, { useState, useEffect } from 'react'
import '../styles/Account.css'
import AccountInfo from './AccountInfo'
import FarmInfo from './FarmInfo'
import Notifications from './Notifications'
import SignUp from './SignUp'
import Login from './Login'
import { useAuth } from '../useAuth'

const Account = (props) => {
  const { isFarmer } = props
  const { authTokens, setAuthTokens } = useAuth()
  const [loggedIn, setLoggedIn] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      setLoggedIn(true)
      setSelectedComponent(false)
    }
  }, [authTokens])
  const [selectedComponent, setSelectedComponent] = useState(false)

  const topBar = () => {
    return (
      <div className='top-bar'>
        <div className='arrow-container' onClick={() => setSelectedComponent(false)}>
          <div className='arrow-chevron' />
          <div className='arrow-line' />
        </div>
      </div>
    )
  }

  const signLogIn = () => {
    return (
      <div className='loginout'>
        <button className='login-button' onClick={() => setSelectedComponent(<Login />)}>Log In</button>
        <button className='login-button' onClick={() => setSelectedComponent(<SignUp />)}>Sign Up</button>
      </div>
    )
  }

  const accountPicker = () => (
    <div className='account-picker-container'>
      <div className='account-picker' onClick={() => { setSelectedComponent(<AccountInfo />) }}>
        <div className='account-picker-label'>Manage Account</div>
        <div className='account-picker-description'>Update basic account information.</div>
      </div>
      {isFarmer &&
        <div className='account-picker' onClick={() => { setSelectedComponent(<FarmInfo />) }}>
          <div className='account-picker-label'>Manage Farm</div>
          <div className='account-picker-description'>Update farm settings.</div>
        </div>
      }
      {/* <div className='account-picker' onClick={() => { setSelectedComponent(<Notifications />) }}>
        <div className='account-picker-label'>Notifications</div>
        <div className='account-picker-description'>Manage communication preferences.</div>
      </div> */}
      <div className='loginout'>
        <button className='login-button' onClick={() => {
          localStorage.clear()
          setAuthTokens()
          setRefresh(!refresh)
          setLoggedIn(false)
        }}>Logout</button>
      </div>
    </div>
  )

  return (
    <div className='account-container'>
      {selectedComponent && topBar()}
      {selectedComponent && selectedComponent}
      {!selectedComponent && loggedIn && accountPicker()}
      {!selectedComponent && !loggedIn && signLogIn()}
    </div>
  )
}

export default Account
