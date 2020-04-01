export const JOIN_EVENT = 'JOIN_EVENT'
export const GET_ALL_CONTRACTS = 'GET_ALL_CONTRACTS'
export const GET_ACTIVE_CONTRACTS = 'GET_ACTIVE_CONTRACTS'
export const GET_ACTIVE_EVENTS = 'GET_ACTIVE_EVENTS'
export const FIN_EVENT = 'FIN_EVENT'
export const GET_EVENT_REL_STATUS = 'GET_EVENT_REL_STATUS'


export const finEvent  = (userToken, EventPk) => {
    return async dispatch =>{
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/eventos/finEvent/'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify({
                    pk: EventPk,
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
            dispatch({ type:FIN_EVENT })
        }
}

export const getEvenReltState = (userToken, EventPk) => {
    return async (dispatch) =>{
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/eventos/eventrel_state/'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify({
                    pk: EventPk
                 
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
        dispatch({
            type: GET_EVENT_REL_STATUS,
            contractStatus: resData['status']
        })
    }
}

export const setEventRealState = (status) => {
    return {
        type: GET_EVENT_REL_STATUS,
        contractStatus: status
    }
}


export const joinEvent = (userToken, EventPk, nToken) => {
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
                    pk: EventPk,
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
            dispatch({ type:JOIN_EVENT })
        }
}

export const getActiveEvents = () => {
    return async (dispatch, getState) => {
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/eventos/all_events/'
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