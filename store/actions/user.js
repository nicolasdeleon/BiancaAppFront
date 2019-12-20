export const GET_USER_INFO = 'GET_USER_INFO'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

export const getUserInfo = (Token) => {
    return async dispatch =>{
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/accounts/properties'
            ,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Token}`
                }
            })
        //Obtengo mi response
        console.log("RESPONSE::::::")
        console.log(response)
        if(response.status>207){
            const resData = await response.json()
            if(resData['response'] === 'Error'){
                throw new Error(resData['error_message'])
            }
            else{
                //ACA PUEDE CAER UNA 401 que no este authenticado super turbina
                throw new Error('Conection error..')
            }
        }
        const resData = await response.json()
        console.log(resData)
        //aca no deberia entrar nunca porque mi response si es mala le asocio un 404
        /*
        if(resData['response'] === 'Error'){
            throw new Error(resData['error_message'])
        }
        */
       dispatch({type:GET_USER_INFO,
        name: resData['full_name'],
        email: resData['email'],
        instaAccount: resData['instaaccount']})

    }
}

export const changeUserValues = (Token,emailChange,nameChange,instaChange) => {
    return async dispatch => {
        console.log(instaChange)
        const response = await fetch(
           'https://biancaapp-ndlc.herokuapp.com/api/accounts/properties/update'
            ,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Token}`
                },
                body: JSON.stringify({
                    email:emailChange,
                    full_name:nameChange,
                    instaaccount:instaChange,
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
            // new Error('Something went wrong!')
            console.log('lo siguiente:')
            console.log(resData['error_message'])
            throw new Error(resData['error_message'])
        }

        dispatch({type:UPDATE_USER_INFO,
            name: nameChange,
            email: emailChange,
            instaAccount: instaChange})
    }
}