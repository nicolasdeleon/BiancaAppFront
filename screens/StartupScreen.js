import React,{useEffect} from 'react'
import {
    View,
    ActivityIndicator ,
    StyleSheet,
    AsyncStorage} from 'react-native'
import Colors from '../constants/Colors'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth'
import * as Permissions from 'expo-permissions'

const StartupScreen = props => {

    registerForPushNotificaions = async() =>{
        //Check for existing permissions...
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = status

        //if no existing permissions, ask user for permissions...
        if (status !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }

        //if no permission, exit function...
        if (finalStatus !== 'granted'){ return }
    }

    registerForPushNotificaions()

    const dispatch = useDispatch()
    useEffect(()=>{
        const tryLogin = async () => {
            const userData = await  AsyncStorage.getItem('userData')
            //chequeo si existe tal data
            if(!userData){
                props.navigation.navigate('auth')
                return
            }
            const transformedData = JSON.parse(userData)
            //chequeo validez de mi data
            const {token,userId} = transformedData
            props.navigation.navigate('app')
            //guardo mi data en mi auth redux store
            dispatch(authActions.authenticate(token,userId))
        }
        tryLogin()
    },[dispatch])
    
    return(
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen