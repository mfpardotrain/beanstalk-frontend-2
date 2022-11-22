import React from "react"
import '../styles/ApiResponse.css'


const ApiResponse = ({response}) => {
    if(!response || !response.message) {
        return 
    }
    let responses = (response) => {
        let keys = Object.keys(response.message)
        let output = keys.map((el, index) => {
            return (
                <div className='response-message' key={index}>
                    {el}: {response['message'][el][0]}
                </div>
            )
        })
        if (response.status < 400) {
            return (
                <div className='success-message-container'>
                    {output}
                </div>
            )
        } else {
            return (
                <div className='error-message-container'>
                    {output}
                </div>
            )
        }
    }

    return (
        <div className="api-response-container">
            {responses(response)}
        </div>
    )
}
export default ApiResponse