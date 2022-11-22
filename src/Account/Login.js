import React, { useState, useReducer, useEffect } from 'react';
import { DefaultCallbackRequest } from '../ApiUtils/DefaultRequests.js';
import { useAuth } from '../useAuth.js';
import ApiResponse from '../ApiUtils/ApiResponse.js';

const Login = (props) => {
    const { setAuthTokens } = useAuth()
    const [loggedIn, setLoggedIn] = useState(false)

    const loginData = {
        username: "",
        password: ""
    }

    const loginReducer = (state, newState) => {
        return { ...state, ...newState }
    }

    const [loginInput, setLoginInput] = useReducer(loginReducer, loginData)

    const handleLogin = DefaultCallbackRequest('login/', setLoggedIn)

    let handleEnter = (event) => {
        if (event.key === 'Enter') { document.getElementById('enter-button').click() }
    }

    return (
        <div className='login-container'>
            <div className='input-label login-input-label'>Email</div>
            <input className='signup-input'
                placeholder='example@example.com'
                value={loginInput.username}
                onChange={(event) => {
                    setLoginInput({ username: event.target.value })
                }}
            ></input>
            <div className='input-label login-input-label'>Password</div>
            <input className='signup-input'
                placeholder='********'
                type='password'
                value={loginInput.password}
                onChange={(event) => {
                    setLoginInput({ password: event.target.value })
                }}
                onKeyPress={event => handleEnter(event)}
            ></input>
            <button className='login-button' id='enter-button' onClick={async () => {
                let response = await handleLogin('POST', loginInput)
                setLoggedIn(response)
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('isFarmer', response.data.isFarmer)
                    setAuthTokens(response.data.token)
                } 
            }}>Log In</button>
            <ApiResponse response={loggedIn} />
        </div>
    )
}
export default Login