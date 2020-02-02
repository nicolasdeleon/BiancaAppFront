export const JOIN_EVENT = 'JOIN_EVENT'
export const GET_ALL_CONTRACTS = 'GET_ALL_CONTRACTS'
export const GET_ACTIVE_CONTRACTS = 'GET_ACTIVE_CONTRACTS'
export const GET_ACTIVE_EVENTS = 'GET_ACTIVE_EVENTS'


export const joinEvent = (userToken, eventCode, nToken) => {
    return async dispatch =>{
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/eventos/adduser'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify({
                    code: eventCode,
                    notificationToken: nToken
                })
            })
            if(response.status>207){
                const resData = await response.json()
                if(resData['response'] === 'Error'){
                    throw new Error(resData['error_message'])
                }
                else{
                    throw new Error('Conection error..')
                }
            }
            const resData = await response.json()
            if(resData['response'] === 'Error'){
                throw new Error(resData['error_message'])
            }
            dispatch({ type:JOIN_EVENT, activeEvent: eventCode })
        }
}

export const getActiveEvents = () => {
    return async (dispatch, getState) => {
        const response = await fetch(
            'http://biancaapp-ndlc.herokuapp.com/api/eventos/all_events/'
            ,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getState().auth.token}`
                },
            })

        if(response.status>207){
            const resData = await response.json()
            if(resData['response'] === 'Error'){
                throw new Error(resData['error_message'])
            }
            else{
                throw new Error('Conection error..')
            }
        }

        const resData = await response.json()
        if(resData['response'] === 'Error'){
            throw new Error(resData['error_message'])
        }
        dispatch({
            type: GET_ACTIVE_EVENTS,
            activeEventObjectList: resData['results']
        })
    }
}

export const getActiveContracts = () => {
    return async (dispatch, getState) =>{
        const response = await fetch(
            'http://biancaapp-ndlc.herokuapp.com/api/eventos/post_relations/'
            ,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getState().auth.token}`
                },
            })

        if(response.status>207){
            const resData = await response.json()
            if(resData['response'] === 'Error'){
                throw new Error(resData['error_message'])
            }
            else{
                throw new Error('Conection error..')
            }
        }

        const resData = await response.json()
        if(resData['response'] === 'Error'){
            throw new Error(resData['error_message'])
        }
        dispatch({
            type: GET_ACTIVE_CONTRACTS,
            activePostRelationList: resData['results']
        })
    }
}