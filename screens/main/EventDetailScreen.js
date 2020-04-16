import React, { useState, useCallback, useEffect} from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

import { useSelector, useDispatch} from 'react-redux'
import StoryWelcome from '../steps/StoryWelcome'
import StorySubmission from '../steps/StorySubmission'
import StoryValidation from '../steps/StoryValidation'
import StoryChangeProduct from '../steps/StoryChangeProduct'
import StoryFinit from '../steps/StoryFinit'

import Colors from '../../constants/Colors'

import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'

const MainScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const userToken = useSelector( state => state.auth.token )
    const productId = props.navigation.getParam('eventId')
    const selectedEvent = useSelector(state=>state.events.activeEvents.find(prod => prod.pk===productId))
    const contractStatus = useSelector( state => state.events.contractStatus )
    const dispatch = useDispatch()

    const [state0, setState0] = useState(props.navigation.getParam('currentStatus')[0])
    const [state1, setState1] = useState(props.navigation.getParam('currentStatus')[1])
    const [state2, setState2] = useState(props.navigation.getParam('currentStatus')[2])
    const [state3, setState3] = useState(props.navigation.getParam('currentStatus')[3])
    const [state4, setState4] = useState(props.navigation.getParam('currentStatus')[4])

    const initStorySubmission = () => {
        setState0(false)
        setState1(true)
        setState2(false)
        setState3(false)
        setState4(false)
    }

    const initValidationScreen = () => {
        setState0(false)
        setState1(false)
        setState2(true)
        setState3(false)
        setState4(false)
    }

    const initWinnerScreen = () => {
        setState0(false)
        setState1(false)
        setState2(false)
        setState3(true)
        setState4(false)
    }

    const initFinitScreen = () => {
        setState0(false)
        setState1(false)
        setState2(false)
        setState3(false)
        setState4(true)
    }


    const updateUserEventState = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        let action = EventActions.getEvenReltState(userToken, productId)
       
        try {

            await dispatch(action)
        } catch (err){
            setError(err.message)
        }

        if(contractStatus === "2BA") {
            initValidationScreen()
        }
        else if(contractStatus === "W") {
            initWinnerScreen()
        }
        else if(contractStatus === "F") {
            initFinitScreen()
        } else if(contractStatus == "N" ) {
            // Lo mando al estado inicial
            setState0(true)
            setState2(false)
            setState3(false)
            setState4(false)
        }

        setIsLoading(false)

    },[dispatch, setIsLoading, setError, contractStatus,])

    // FUNTION THAT fRUNS LOAD CONTRACTS AND EVENTS
   useEffect( () => {
             updateUserEventState()
    },[dispatch, updateUserEventState])

    useEffect( () => {
        const willFocusSub = props.navigation.addListener('willFocus',()=>{
            updateUserEventState() 
        })
        return () => {
            willFocusSub.remove()
        }
    },[updateUserEventState])
    
    LogOutHandler = () => {
        dispatch(AuthActions.logout())
        props.navigation.navigate('start')
    }

    _handleNotification = () => {
        updateUserEventState()
    }

    joinEvent = async () => {
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
        action = EventActions.joinEvent(userToken, selectedEvent.pk, notificationToken)

        setError(null)

        try{
            await dispatch(action)
            //updateUserEventState()
        }catch (err){
            setError(err.message)
        }
    }

    finEvent = async () => {

        let action
        action = EventActions.finEvent(userToken, selectedEvent.pk)

        setError(null)

        try{
            await dispatch(action)
            //updateUserEventState()
        }catch (err){
            setError(err.message)
        }
    }


    if(state4){
        return (
        <LinearGradient
          colors={[Colors.accentGradientDark, Colors.accentGradientLight]}
          start={[0,0]} end={[1,1]}
          style={styles.gradient}>
        <View style={styles.screen}>
            <StoryFinit
            active={state4}
            next={()=>{props.navigation.navigate('EventFeed')}}/>
        </View>
        </LinearGradient>
        )
    }
    if(state3){
        return (
        <LinearGradient
          colors={[Colors.greenGradientDark,Colors.greenGradientLight]}
          start={[0,0]} end={[1,1]}
          style={styles.gradient}>
        <View style={styles.screen}>
            <StoryChangeProduct
            active={state3}
            eventType={props.navigation.getParam('eventType')}
            next={ () => {
                finEvent()
                initFinitScreen()}}/>
        </View>
        </LinearGradient>
        )
    }
    if(state2){
        return (
        <LinearGradient
          colors={[Colors.primaryGradientDark, Colors.primaryGradientLight]}
          start={[0,0]} end={[1,1]}
          style={styles.gradient}>
        <View style={styles.screen}>
            <StoryValidation
            active={state2}/>
        </View>
        </LinearGradient>
        )
    }
    if (state1){
        return(
        <LinearGradient
          colors={[Colors.accentGradientDark, Colors.accentGradientLight]}
          start={[0,0]} end={[1,1]}
          style={styles.gradient}>
        <View style={styles.screen}>
            <StorySubmission
            active={state1}
            next={ () => {
                joinEvent()
                initValidationScreen()
            }}
            />
        </View>
        </LinearGradient>
        )
    }
    if(state0) {
        return (
            <LinearGradient
              colors={[Colors.accentGradientDark, Colors.accentGradientLight]}
              start={[0,0]} end={[1,1]}
              style={styles.gradient}>
            <View style={styles.screen}>
                <StoryWelcome 
                    eventTitle={props.navigation.getParam('eventTitle')}
                    next={ () => {
                        updateUserEventState()
                        initStorySubmission()
                        setState1(true)
                    }}
                    active={state0}/>
            </View>
            </LinearGradient>
            )
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color={Colors.accent}/>
        </View>
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
