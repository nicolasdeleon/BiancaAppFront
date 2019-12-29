export const JOIN_EVENT = 'JOIN_EVENT'

export const joinEvent = (userToken, eventCode) => {
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
                    code:eventCode
                })
            })
            console.log('DONE SENDING JOIN EVENT REQUEST')
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
            if(resData['response'] === 'Error'){
                // new Error('Something went wrong!')
                console.log('lo siguiente:')
                console.log(resData['error_message'])
                throw new Error(resData['error_message'])
            }
            dispatch({type:JOIN_EVENT,activeEvent: eventCode})
        }
}