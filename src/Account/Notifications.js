
import React, { useReducer } from 'react'
import { useToggle } from '../Hooks'
import '../styles/Account.css'

const Notifications = (props) => {
  const testData = {
    isNotifiable: true
  }

  const stateReducer = (state, newState) => {
    return { ...state, ...newState }
  }

  const [notifications, setNotifications] = useReducer(stateReducer, testData)
  const { isToggled, toggle } = useToggle(notifications.isNotifiable)

  return (
        <div className='account-info-container'>
            <div className='account-settings-name'>Notifications</div>
            <div className='notification-button-container'>
                <div className='account-input-label'>Can we notify you about your order?</div>
                <div className={'toggle-button-container'.concat(isToggled ? '-true' : '-false')}
                    onClick={() => {
                      toggle()
                      setNotifications({ isNotifiable: !notifications.isNotifiable })
                    }}>
                    <div className='toggle-button-circle'></div>
                </div>
            </div>
        </div>
  )
}

export default Notifications
