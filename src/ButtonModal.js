import React, { useRef } from 'react'
import { useOnClickOutside } from './Hooks'
import './styles/Modal.css'

const ButtonModal = (props) => {
  const { message, buttonLabel, onClick, setShowModal, showModal } = props
  const ref = useRef()
  useOnClickOutside(ref, setShowModal, showModal)

  return (
        <div className={'button-modal-container'.concat(showModal ? ' show-modal' : '')}>
            <div className={'button-modal-contents'.concat(showModal ? ' show-modal-contents' : '')} ref={ref}>
                <div className='modal-message'>{message}</div>
                <button className='modal-button' onClick={() => {
                  if (!showModal) {
                    return false
                  } else {
                    onClick()
                  }
                }}>{buttonLabel}</button>
                <button className='modal-cancel' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </div>
  )
}
export default ButtonModal
