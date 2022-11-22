import React, { useState, useReducer, useRef } from 'react'
import '../styles/Market.css'
import { useAuth } from '../useAuth'
import { DefaultCallbackRequest } from '../ApiUtils/DefaultRequests'

const SuggestMarketForm = (props) => {
    const { refresh } = props
    const { authTokens } = useAuth()
    const stateReducer = (state, newState) => {
        return { ...state, ...newState }
    }

    const defaultMarket = {
        cronString: '* * * * *',
        endCronString: '* * * * *',
    }

    const [market, setMarket] = useReducer(stateReducer, defaultMarket)

    const [response, setResponse] = useState(false)
    const marketCallback = DefaultCallbackRequest('markets/', setResponse, "Token " + authTokens)

    let suggestRef = useRef()
    const setResponseAnimation = (ref) => {
        ref.current.classList.add("bring-up")

        var listener = ref.current.addEventListener('animationend', () => {
            ref.current.classList.remove("bring-up")
            ref.current.classList.add("market-form-open")
            ref.current.removeEventListener('animationend', listener);
        })
    }

    const saveOnClick = async () => {
        const response = await marketCallback('POST', market)
        if (response.status === 200) {
            refresh()
            suggestRef.current.classList.remove('market-form-open')
        }
    }

    return (
        <div>
            <div className='market-suggest-container'>
                <h5>Can't find what you're looking for?</h5>
                <button className='add-market-button' onClick={() => {
                    setResponseAnimation(suggestRef)
                }}>Suggest a New Market</button>
            </div>
            <div className='market-list-form-bottom' ref={suggestRef}>
                <div className='market-suggest'>
                    <div className='input-container input-suggest-container'>
                        <div className='input-label'>Market Name</div>
                        <input className='suggest-input'
                            value={market.name}
                            onChange={(event) => {
                                setMarket({ name: event.target.value })
                            }}
                        ></input>
                    </div>
                    <div className='input-container input-suggest-container'>
                        <div className='input-label'>Market Address</div>
                        <input className='suggest-input'
                            value={market.address}
                            type="text"
                            pattern="\d*"
                            onChange={(event) => setMarket({ address: event.target.value })}
                        ></input>
                    </div>
                    <div className='input-container input-suggest-container'>
                        <div className='input-label'>Description</div>
                        <input className='suggest-input'
                            value={market.description}
                            type="text"
                            placeholder='website, info, etc.'
                            onChange={(event) => setMarket({ description: event.target.value })}
                        ></input>
                    </div>
                    <button className='save-button suggest-button' onClick={() => saveOnClick()}>Send Suggestion</button>
                    <button className='modal-cancel' onClick={() => suggestRef.current.classList.remove('market-form-open')}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default SuggestMarketForm