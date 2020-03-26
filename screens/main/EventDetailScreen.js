import React, { useState, useCallback, useEffect} from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

import { useSelector, useDispatch} from 'react-redux'
import StoryWelcome from '../steps/StoryWelcome'
import StorySubmission from '../steps/StorySubmission'
import StoryValidation from '../steps/StoryValidation'
import StoryChangeProduct from '../steps/StoryChangeProduct'


import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'

const MainScreen = props => {

    const [codeValue, setCodeValue] = useState('')
    const [error, setError] = useState()
    const [sentCode, setSentCode] = useState(false)
    const [modalValidity, setModalValidity] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const userToken = useSelector( state => state.auth.token )
    const productId = props.navigation.getParam('eventId')
    const selectedEvent = useSelector(state=>state.events.activeEvents.find(prod => prod.pk===productId))
    const activeContracts = useSelector( state => state.events.activeContracts )
    const dispatch = useDispatch()

    // FUNCTION THAT LOADS CONTRACTS AND EVENTS
    const loadContractsAndEvents = useCallback(async () =>{
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(EventActions.getActiveEvents())
            await dispatch(EventActions.getActiveContracts(userToken))
        } catch (err){
            setError(err.message)
        }
        setIsLoading(false)
    },[dispatch, setIsLoading, setError])

    // FUNTION THAT RUNS LOAD CONTRACTS AND EVENTS
    useEffect( () => {
            loadContractsAndEvents()
    },[dispatch, loadContractsAndEvents])

    useEffect( () => {
        const willFocusSub = props.navigation.addListener('willFocus',()=>{
            loadContractsAndEvents() 
        })
        return () => {
            willFocusSub.remove()
        }
    },[loadContractsAndEvents])
    
    LogOutHandler = () => {
        dispatch(AuthActions.logout())
        props.navigation.navigate('start')
    }

    _handleNotification = () => {
        loadContractsAndEvents()
    }

    sendInsertCode = async () => {
        let notificationToken = null
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        if (status === 'granted'){
            notificationToken = await Notifications.getExpoPushTokenAsync()
            Notifications.addListener(_handleNotification);
        }
        if(!userToken){
            return
        }
        let action
        action = EventActions.joinEvent(userToken, codeValue, notificationToken)

        if(modalValidity){
            setIsLoading(true)
            setError(null)
            try{
                await dispatch(action)
                setIsLoading(false)
                setSentCode(true)
                closeInsertCode()
                loadContractsAndEvents()
            }catch (err){
                setError(err.message)
                setIsLoading(false)
            }
        }else{
            setError('Código inválido')
        }
    }

    const [state0, setState0] = useState(false)
    const [state1, setState1] = useState(false)
    const [state2, setState2] = useState(true)
    const [state3, setState3] = useState(false)


    const initStorySubmission = () => {
        setState0(false)
        setState1(true)
        setState2(false)
        setState3(false)
    }

    const initValidationScreen = () => {
        setState0(false)
        setState1(false)
        setState2(true)
        setState3(false)
    }

    if(state3){
        return (
        <LinearGradient colors={['#141E30','#243B55']} start={[0,0]} end={[1,1]} style={styles.gradient}>
        <View style={styles.screen}>
            <StoryChangeProduct
            active={state3}/>
        </View>
        </LinearGradient>
        )
    }
    if(state2){
        return (
        <LinearGradient colors={['#141E30','#243B55']} start={[0,0]} end={[1,1]} style={styles.gradient}>
        <View style={styles.screen}>
            <StoryValidation
            active={state2}/>
        </View>
        </LinearGradient>
        )
    }
    if (state1){
        return(
        <LinearGradient colors={['#141E30','#243B55']} start={[0,0]} end={[1,1]} style={styles.gradient}>
        <View style={styles.screen}>
            <StorySubmission
            active={state1}
            next={initValidationScreen}/>
        </View>
        </LinearGradient>
    )
    }
    return (
        <LinearGradient colors={['#141E30','#243B55']} start={[0,0]} end={[1,1]} style={styles.gradient}>
        <View style={styles.screen}>
            <StoryWelcome 
                eventTitle={props.navigation.getParam('eventTitle')}
                next={initStorySubmission}
                active={state0}/>
        </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    screen: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        marginVertical: 12,
    },
    stepTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    },
    stepDesc: {
        fontSize: 14,
        fontFamily: 'open-sans'
    },
})

MainScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('eventTitle')
    }
}

export default MainScreen

/*
<EventDetail 
    loading = {isLoading}
    sentCode = {sentCode}
    insertCodeButton = {()=>{}}
    event = {selectedEvent}
    activeContracts = {activeContracts}
    loadContractsAndEvents = {loadContractsAndEvents}
    />
*/