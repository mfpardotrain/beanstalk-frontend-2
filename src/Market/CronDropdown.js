import React from 'react'
import '../styles/Market.css'
import DropDown from './Dropdown'

const CronDropdown = (props) => {
  const { updateStartCron, updateEndCron, cronData } = props
  const { startParse, endParse } = cronData

  let hours = Array.from(Array(13).keys()).map(el => el.toString())
  hours.shift()
  hours = hours.map(el => {
    const index = hours.indexOf(el)
    const intEl = parseInt(el, 10)
    const out = index % 2 === 0 ? intEl - (index / 2) : intEl + (((intEl - 12) * -1) / 2)
    return out
  })
  const minutes = ['0', '15', '30', '45']
  const ampm = ['a.m.', 'p.m.']
  const hourMap = hours.map(el => ({ name: el, type: 'hour', id: el }))
  const minuteMap = minutes.map(el => ({ name: el, type: 'minute', id: el }))
  const endHourMap = hours.map(el => ({ name: el, type: 'endHour', id: el }))
  const endMinuteMap = minutes.map(el => ({ name: el, type: 'endMinute', id: el }))
  const startAmPmMap = ampm.map(el => ({ name: el, type: 'startAmpm', id: el }))
  const endAmPmMap = ampm.map(el => ({ name: el, type: 'endAmpm', id: el }))

  return (
        <div className="cron-dropdown-container">
            <div className="cron-dropdown-row" id="cron-dropdown">
                <div className="cron-label">Start Time</div>
                <div className="cron-time-dropdowns">
                    <DropDown
                        dropDownSelect={el => updateStartCron(el, 'hour')}
                        dropDownTitle="Hour"
                        dropDownValues={hourMap}
                        key="Hour"
                        selected={startParse.hour}
                    />
                    <DropDown
                        dropDownSelect={el => updateStartCron(el, 'minute')}
                        dropDownTitle="Minute"
                        dropDownValues={minuteMap}
                        key="Minute"
                        selected={startParse.minute}
                    />
                    <DropDown
                        dropDownSelect={el => updateStartCron(el, 'ampm')}
                        dropDownTitle="am/pm"
                        dropDownValues={startAmPmMap}
                        key="startAmpm"
                        selected={startParse.ampm}
                    />
                </div>
            </div>
            <div className="cron-dropdown-row" id="cron-dropdown">
                <div className="cron-label">End Time</div>
                <div className="cron-time-dropdowns">
                    <DropDown
                        dropDownSelect={el => updateEndCron(el, 'hour')}
                        dropDownTitle="Hour"
                        dropDownValues={endHourMap}
                        key="endHour"
                        selected={endParse.hour}
                    />
                    <DropDown
                        dropDownSelect={el => updateEndCron(el, 'minute')}
                        dropDownTitle="Minute"
                        dropDownValues={endMinuteMap}
                        key="endMinute"
                        selected={endParse.minute}
                    />
                    <DropDown
                        dropDownSelect={el => updateEndCron(el, 'ampm')}
                        dropDownTitle="am/pm"
                        dropDownValues={endAmPmMap}
                        key="endAmpm"
                        selected={endParse.ampm}
                    />
                </div>
            </div>
        </div>
  )
}

export default CronDropdown
