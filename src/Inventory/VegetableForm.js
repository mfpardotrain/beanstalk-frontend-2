import React, { useState, useReducer, useRef } from 'react'
import { useToggle } from '../Hooks'
import '../styles/Market.css'
import '../styles/Inventory.css'
import DropDown from '../Market/Dropdown'
import ButtonModal from '../ButtonModal'
import { DefaultCallbackRequest } from '../ApiUtils/DefaultRequests';
import { useAuth } from '../useAuth'
import ApiResponse from '../ApiUtils/ApiResponse'

const VegetableForm = (props) => {
    const { vegetableInfo, refresh } = props
    const { authTokens } = useAuth()

    const stateReducer = (state, newState) => {
        return { ...state, ...newState }
    }

    const [vegetable, setVegetable] = useReducer(stateReducer, vegetableInfo)
    const { id, name, description, price, unitWeight, maxOrderAmount, availableAmount } = vegetable

    const { isToggled, toggle } = useToggle(name === '')

    const ref = useRef()
    const setResponseAnimation = () => {
        ref.current.classList.add("bring-up")

        var listener = ref.current.addEventListener('animationend', () => {
            ref.current.classList.remove("bring-up")
            ref.current.classList.add("market-form-open")
            ref.current.removeEventListener('animationend', listener);
        })
    }

    const burger = (isToggled) => {
        let openOrClose = isToggled ? '-open' : '-close'
        return (
            <div className='burger-container' onClick={() => {
                id !== null && toggle()
                if (!isToggled) {
                    setResponseAnimation()
                } else {
                    ref.current.classList.remove("market-form-open")
                }
            }}>
                <div className={'burger-top'.concat(openOrClose)}></div>
                <div className={'burger-middle'.concat(openOrClose)}></div>
                <div className={'burger-bottom'.concat(openOrClose)}></div>
            </div>
        )
    }

    const [response, setResponse] = useState(false)
    const vegetableCallback = DefaultCallbackRequest('farmVegetables/', setResponse, "Token " + authTokens)

    const units = ['each', 'bunch', 'lbs']
    const unitMap = units.map(el => ({ name: el, type: 'unit', id: el }))

    const [showModal, setShowModal] = useState(false)

    const DELETE_MESSAGE = 'Are you sure you want to delete this item from your inventory?'
    const BUTTON_LABEL = 'Delete Item'

    const saveOnClick = async () => {
        let response = await vegetableCallback('POST', vegetable)
        setResponse(response)
        ref.current.classList.remove("market-form-open")
        toggle()
        refresh()
    }
    const deleteOnClick = async () => {
        let response = await vegetableCallback('DELETE', vegetable)
        setResponse(response)
        ref.current.classList.remove("market-form-open")
        toggle()
        refresh()
    }

    const addNewButton = () => {
        return <button className='add-market-button' onClick={() => {
            setResponseAnimation()
        }
        }>Add New Produce</button>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {id === null && addNewButton()}
            <div className='market-list-form-container' style={id === null ? { visibility: 'hidden', height: '0px' } : {}}>
                <div className='market-list-item-container' key={id}>
                    <div className='input-container market-list-item-name'>
                        <div className='input-label'>Produce Name</div>
                        <input className='market-address-input'
                            value={name}
                            onChange={(event) => {
                                setVegetable({ name: event.target.value })
                            }}
                        ></input>
                    </div>
                    <div className='input-container'>
                        <div className='input-label'>Available Amount</div>
                        <div className='available-amount-input-button-container'>
                            <input className='available-amount-input'
                                value={availableAmount}
                                type="text"
                                pattern="\d*"
                                onChange={(event) => setVegetable({ availableAmount: event.target.value })}
                            ></input>
                            <button className='available-amount-button save-button' onClick={() => vegetableCallback('POST', vegetable)}>Save</button>
                        </div>
                    </div>
                    {burger(isToggled)}
                </div>
                <div ref={ref} className='market-list-form-bottom'>
                    <div className='market-top-open' key={id}>
                        <div className='input-container market-list-item-name'>
                            <div className='input-label'>Produce Name</div>
                            <input className='market-address-input'
                                value={name}
                                onChange={(event) => {
                                    setVegetable({ name: event.target.value })
                                }}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <div className='input-label'>Available Amount</div>
                            <div className='available-amount-input-button-container'>
                                <input className='available-amount-input'
                                    value={availableAmount}
                                    type="text"
                                    pattern="\d*"
                                    onChange={(event) => setVegetable({ availableAmount: event.target.value })}
                                ></input>
                            </div>
                        </div>
                        {burger(isToggled)}
                    </div>
                    <div className='market-bottom-container'>
                        <div className='input-container'>
                            <div className='input-label'>Description</div>
                            <input className='market-address-input'
                                placeholder={description}
                                value={description}
                                onChange={(event) => setVegetable({ description: event.target.value })}
                            ></input>
                            <div className='price-weight-max-container'>
                                <div className='price-weight-max-input-container'>
                                    <div className='input-label'>Price</div>
                                    <input className='available-amount-input'
                                        value={price}
                                        type="text"
                                        pattern="\d*"
                                        onChange={(event) => setVegetable({ price: event.target.value })}
                                    ></input>
                                </div>
                                <div className='price-weight-max-input-container'>
                                    <div className='input-label'>Unit Weight</div>
                                    <DropDown
                                        dropDownSelect={el => setVegetable({ unitWeight: el.name })}
                                        dropDownTitle="Unit"
                                        dropDownValues={unitMap}
                                        selected={unitWeight}
                                    />
                                </div>
                                <div className='price-weight-max-input-container'>
                                    <div className='input-label'>Max Order Amount</div>
                                    <input className='available-amount-input'
                                        value={maxOrderAmount}
                                        type="text"
                                        pattern="\d*"
                                        onChange={(event) => setVegetable({ maxOrderAmount: event.target.value })}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className='market-button-container'>
                            <button className='delete-button' onClick={() => setShowModal(true)}>Delete</button>
                            <button className='save-button' onClick={() => saveOnClick()}>Save</button>
                        </div>
                    </div>
                </div>
                <ButtonModal
                    message={DELETE_MESSAGE}
                    buttonLabel={BUTTON_LABEL}
                    onClick={deleteOnClick}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </div>
            <ApiResponse response={response} />
        </div>
    )
}

export default VegetableForm
