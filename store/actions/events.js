export const JOIN_EVENT = 'JOIN_EVENT'
export const GET_ALL_CONTRACTS = 'GET_ALL_CONTRACTS'
export const GET_ACTIVE_CONTRACTS = 'GET_ACTIVE_CONTRACTS'
export const GET_ACTIVE_EVENTS = 'GET_ACTIVE_EVENTS'
export const FIN_EVENT = 'FIN_EVENT'
export const GET_EVENT_REL_STATUS = 'GET_EVENT_REL_STATUS'
//Finalizar un evento en particular "ya recibí mi beneficio"

export const finEvent = (userToken, EventPk, nToken) => {
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
            dispatch({ type:FIN_EVENT })
        }
}

export const getEvenReltState = (userToken, EventPk) => {
    console.log('**************************************3')
    console.log(EventPk)
    console.log(userToken)
    return async (dispatch, getState) =>{
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/eventos/eventrel_state/'
            //'http://127.0.0.1:8000/api/eventos/eventrel_state/'
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
            console.log(response.status)

            
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
        /* if(resData['response'] === 'Error'){
            throw new Error(resData['error_message'])
        }  */
            /*
            STATUS_EVENT = [
            ('2BA', 'To_be_accepted'),
            ('W', 'Winner'),
            ('F', 'Finished'),
            ('R', 'Refused')]
            */
        console.log(resData['status'])
        dispatch({
            type: GET_EVENT_REL_STATUS,
            status_postr: resData['status']
        })
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