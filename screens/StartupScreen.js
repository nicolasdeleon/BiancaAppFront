import React,{useEffect} from 'react'
import {
    View,
    ActivityIndicator ,
    StyleSheet,
    AsyncStorage} from 'react-native'
import Colors from '../constants/Colors'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth'


const StartupScreen = props => {
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
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default StartupScreen