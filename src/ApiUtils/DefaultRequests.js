import { useEffect, useCallback } from 'react';
import humps from 'humps'


export function DefaultCallbackRequest(endPoint, stateHandler, authTokens = null) {
    let url = process.env.REACT_APP_API_URL + endPoint;

    let header = {
        'Content-Type': 'application/json',
        'Authorization': authTokens
    };

    const handleCallback = useCallback(async (method, body = {}) => {
        let output = await fetch(url, {
            method: method,
            headers: header,
            body: JSON.stringify(humps.decamelizeKeys(body))
        })
            .then(res => {
                let json = res.json()
                stateHandler(json)
                return json
            })
        return humps.camelizeKeys(output)
    }, []);

    return (handleCallback);
}

export const DefaultEffectRequest = (endpoint, method, stateHandler, refresh, body = {}, authTokens = null) => {
    let url = process.env.REACT_APP_API_URL + endpoint
    let header = {
        'Content-Type': 'application/json',
        'Authorization': authTokens
    }
    let fetchInfo = {
        method: method,
        headers: header,
    }
    if (method !== "GET") {
        fetchInfo.body = JSON.stringify(humps.decamelizeKeys(body))
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await
                fetch(url, fetchInfo)
            response
                .json()
                .then(requestData => {
                    stateHandler(humps.camelizeKeys(requestData))
                })
        }
        fetchData()
    }, [refresh])
}