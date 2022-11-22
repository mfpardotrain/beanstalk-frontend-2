import React, { useState } from 'react'
import '../styles/SignUp.css'
import FarmForm from './FarmForm'
import AccountForm from './AccountForm'

const SignUp = (props) => {     
    const [selectedComponent, setSelectedComponent] = useState(false)
    const accountChoice = () => {
        return (
            <div className='account-choice-container'>
                <div className='account-choice-question'>Are you a</div>
                <div className='account-choice-item' onClick={() => setSelectedComponent(<FarmForm setSelectedComponent={setSelectedComponent} topBar={topBar(false)}/>)}>Farmer</div>
                <div className='account-choice-item' onClick={() => setSelectedComponent(<AccountForm farm={null} isFarmer={false} topBar={topBar(false)} setSelectedComponent={setSelectedComponent}/>)}>Customer</div>
            </div>
        )
    } 

    const topBar = (component) => {
      return (
              <div className='top-bar'>
                  <div className='arrow-container' onClick={() => setSelectedComponent(component)}>
                      <div className='arrow-chevron' />
                      <div className='arrow-line' />
                  </div>
              </div>
      )
    }

    return (
        <div className='signup-container'>
            {selectedComponent && selectedComponent}
            {!selectedComponent && accountChoice()}
        </div>
    )
}
export default SignUp