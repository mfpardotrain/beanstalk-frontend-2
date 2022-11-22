import React, { useState, useReducer, useRef } from 'react'
import { useToggle } from '../Hooks'
import '../styles/Market.css'
import CronDropdown from './CronDropdown'
import ButtonModal from '../ButtonModal'
import { useAuth } from '../useAuth'
import { DefaultCallbackRequest } from '../ApiUtils/DefaultRequests'
import ApiResponse from '../ApiUtils/ApiResponse'

const MarketForm = (props) => {
  const { marketDetails, allVegetables, refresh } = props
  const { authTokens } = useAuth()

  const stateReducer = (state, newState) => {
    return { ...state, ...newState }
  }

  const [marketInfo, setMarketInfo] = useReducer(stateReducer, marketDetails)
  const { id, name, farmVegetables, cronString, endCronString, market } = marketInfo

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

  const burger = (
    <div className='burger-container' onClick={() => {
      toggle()
      if (!isToggled) {
        setResponseAnimation()
      } else {
        ref.current.classList.remove("market-form-open")
      }
    }}>
      <div className={'burger-top'.concat(isToggled ? '-open' : '-close')}></div>
      <div className={'burger-middle'.concat(isToggled ? '-open' : '-close')}></div>
      <div className={'burger-bottom'.concat(isToggled ? '-open' : '-close')}></div>
    </div>
  )

  const selectRadio = (stateObject, thingToSelect) => {
    const objCopy = [...stateObject]
    if (objCopy.includes(thingToSelect)) {
      const index = objCopy.indexOf(thingToSelect)
      objCopy.splice(index, 1)
    } else {
      objCopy.push(thingToSelect)
    }
    return objCopy
  }

  const vegetableButtons = (allVegetables, marketVegetables) => {
    const output = allVegetables.map(el => {
      const isSelected = marketVegetables.includes(el.id)
      return (
        <div className={'vegetable-radio-button'.concat(isSelected ? ' vegetable-button-selected' : '')}
          onClick={() => setMarketInfo({ farmVegetables: selectRadio(farmVegetables, el.id) })}
          key={el.id + el.name}>
          {el.name}
        </div>
      )
    })
    return output
  }

  const updateCron = (el, part, cronString) => {
    const split = cronString.split(' ')
    let minute = split[0]
    let hour = split[1]
    let days = split[4]
    const ampm = hour > 11 ? 'p.m.' : 'a.m.'
    switch (part) {
      case 'hour':
        hour = el.name
        const diff = ampm === 'p.m.' && hour < 12 ? 12 : 0
        hour = parseInt(hour, 10) + diff
        break
      case 'minute':
        minute = el.name
        break
      case 'ampm':
        if (el.name === 'p.m.' && hour < 12) {
          hour = parseInt(hour, 10) + 12
        }
        if (el.name === 'a.m.' && hour > 11) {
          hour = parseInt(hour, 10) - 12
        }
        break
      case 'days':
        days = el.join(',')
        break
      default:
        console.log('unexpected cron key')
        break
    }
    const out = `${minute.toString()} ${hour.toString()} * * ${days}`
    return out
  }

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const dayButtons = (days, marketDays) => {
    const output = days.map(el => {
      const isSelected = marketDays.includes(el)
      return (
        <div className={'day-radio-button'.concat(isSelected ? ' day-button-selected' : '')}
          onClick={() => {
            setMarketInfo({ cronString: updateCron(selectRadio(marketDays, el), 'days', cronString) })
            setMarketInfo({ endCronString: updateCron(selectRadio(marketDays, el), 'days', endCronString) })
          }}
          key={el}>
          {el}
        </div>
      )
    })
    return output
  }

  const convertCronString = (cronString) => {
    if (!cronString) {
      return { minute: null, hour: null, days: [], ampm: null }
    }
    const split = cronString.split(' ')
    const minute = split[0]
    const hour = split[1]
    const days = split[4].split(',')
    let outHour = (hour > 11 && hour !== '12') ? hour - 12 : hour
    const ampm = hour > 11 ? 'p.m.' : 'a.m.'
    outHour = (outHour === '0' && ampm === 'a.m.') ? '12' : outHour
    return ({ minute, hour: outHour, days, ampm })
  }

  const startParse = convertCronString(cronString)
  const endParse = convertCronString(endCronString)
  const marketDays = startParse.days

  const [showModal, setShowModal] = useState(false)

  const DELETE_MESSAGE = 'Are you sure you want to delete this Market?'
  const BUTTON_LABEL = 'Delete Market'


  const [response, setResponse] = useState(false)
  const marketCallback = DefaultCallbackRequest('marketInfo/', setResponse, "Token " + authTokens)
  const saveOnClick = async () => {
    let response = await marketCallback('POST', marketInfo)
    setResponse(response)
    if (response.status === 200) {
      refresh()
      toggle()
      ref.current.classList.remove('market-form-open')
    }
  }
  const deleteOnClick = async () => {
    let response = await marketCallback('DELETE', marketInfo)
    setResponse(response)
    if (response.status === 200) {
      toggle()
      refresh()
      ref.current.classList.remove('market-form-open')
    }
  }

  return (
    <div className='market-list-form-container'>
      <div className='market-list-item-container' key={id}>
        <div className='market-list-item-name'>{market.name}</div>
        <div className='market-is-active'>Active</div>
        {burger}
      </div>
      <div ref={ref} className='market-list-form-bottom'>
        <div className='market-top-open' key={id}>
          <div className='market-list-item-name'>{market.name}</div>
          <div className='market-is-active'>Active</div>
          {burger}
        </div>
        <div className='market-bottom-container'>
          <div className='market-list-item-name'>{market.address}</div>
          <div className='which-vegetables'>When do you sell?</div>
          <div className='day-button-container'>{dayButtons(days, marketDays)}</div>
          <CronDropdown
            updateStartCron={(el, part) => { setMarketInfo({ cronString: updateCron(el, part, cronString) }) }}
            updateEndCron={(el, part) => { setMarketInfo({ endCronString: updateCron(el, part, endCronString) }) }}
            cronData={{ startParse, endParse }} />
          <div className='which-vegetables'>What do you sell here?</div>
          <div className='vegetable-button-container'>{vegetableButtons(allVegetables, farmVegetables)}</div>
          <div className='market-button-container'>
            <button className='delete-button' onClick={() => setShowModal(true)}>Delete</button>
            <button className='save-button' onClick={() => saveOnClick()}>Save</button>
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

export default MarketForm
