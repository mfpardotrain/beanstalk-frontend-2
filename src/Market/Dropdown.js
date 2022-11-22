import React, { useRef } from 'react'
import { useOnClickOutside, useToggle } from '../Hooks'

const DropDown = (props) => {
  const { isToggled, toggle } = useToggle(false)

  const ref = useRef()

  useOnClickOutside(ref, toggle, isToggled)

  const { dropDownValues, dropDownTitle, selected, dropDownSelect } = props

  const dropdownContent = (
    dropDownValues.map(el => (
            <li className='dropdown-item' onClick={() => {
              dropDownSelect(el)
              toggle()
            }}
                key={el.name}>
                {el.name === '0' ? '00' : el.name}
            </li>
    ))
  )

  const label = () => {
    if (selected === '0') {
      return '00'
    } else {
      return selected
    }
  }

  return (
        <div className='dropdown-container' ref={ref}>
            <div className='dropdown-header' onClick={() => toggle()}>{label() || dropDownTitle}</div>
            <div className={'dropdown-bottom'.concat(isToggled ? ' dropdown-open' : ' dropdown-close')} >
                <ul className={'dropdown-list'.concat(dropDownTitle === 'Hour' ? ' cron-dropdown-list' : '')}>
                    {dropdownContent}
                </ul>
            </div>
        </div>
  )
}

export default DropDown
