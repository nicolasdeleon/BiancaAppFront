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
            
        console.log(Token)
        console.log(response)
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
       dispatch({type:GET_USER_INFO,
        name: resData['full_name'],
        email: resData['email'],
        instaAccount: resData['instaAccount']})

    }
}

export const changeUserValues = (Token, emailChange, nameChange, instaChange) => {
    return async dispatch => {
        const response = await fetch(
           'https://biancaapp-ndlc.herokuapp.com/api/accounts/properties/update'
            ,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Token}`
                },
                body: JSON.stringify({
                    email: emailChange,
                    full_name: nameChange,
                    instaAccount: instaChange,
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

        dispatch({type:UPDATE_USER_INFO,
            name: nameChange,
            email: emailChange,
            instaAccount: instaChange})
    }
}