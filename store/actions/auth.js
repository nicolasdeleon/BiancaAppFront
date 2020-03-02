import { AsyncStorage } from 'react-native'

export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (token, userId) => {
    return {
        type: AUTHENTICATE,
        userId: userId,
        token: token
    }
}

export const logout = () => {
    return dispatch =>{
        AsyncStorage.removeItem('userData')
        dispatch({type:LOGOUT})
    }
}

export const login = (email, password) => {
    return async dispatch =>{
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/accounts/login'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
        if(response.status > 207){
            throw new Error('Conection error..')
        }
        const resData = await response.json()
        if(resData['response'] === 'Error' || resData['error_message']){
            throw new Error(resData['error_message'])
        }
        dispatch({
            type:LOGIN,
            token: resData['token'], 
            userId: resData['email']
        })
        saveDataToStorage(resData['token'], resData['email'])
    }
}

export const register = (email, firstname, lastname, instaaccount, date, password, password2) => {
    return async dispatch => {
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/accounts/register'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    first_name: firstname,
                    last_name: lastname,
                    instaaccount: instaaccount,
                    birth_date: date,
                    password: password,
                    password2: password2
                })
            }
        )
        if(response.status>207){
            throw new Error(response.status)
        }
        const resData = await response.json()
        if(resData['response'] === 'Error'){
            throw new Error(resData['error_message'])
        }
        dispatch({
            type: REGISTER,
            token: resData['token'], 
            userId: resData['email']
        })
        saveDataToStorage(resData['token'], resData['email'])
    }
}

export const reset_password = (email) => {
    return async dispatch => {
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/accounts/reset_password/'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                })
            }
        )
        if(response.status>207){
            throw new Error(response.status)
        }
        const resData = await response.json()
        if(resData['response'] === 'Error'){
            throw new Error(resData['error_message'])
        }
    }
}

export const reset_password_confirm = (email, token, password, password2) => {
    return async dispatch => {
        if(password!=password2){
            throw new Error("Las passwords deben ser iguales")
        }

        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/accounts/reset_password/confirm/'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    token: token,
                    password: password,
                })
            }
        )

        if(response.status>207){
            throw new Error(response.status)
        }
        const resData = await response.json()
        if(resData['response'] === 'Error'){
            throw new Error(resData['error_message'])
        }
    }
}

const saveDataToStorage = (token, userId) => {
    AsyncStorage.setItem('userData',
        JSON.stringify({
            token: token,
            userId: userId,
            })
        )
}