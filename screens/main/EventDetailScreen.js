import React, { useState, useCallback, useEffect} from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native'

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

import { useSelector, useDispatch} from 'react-redux'
import EventDetail from '../../components/EventDetail'

import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'

import Colors from '../../constants/Colors'

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
    
    const setCodeValueHandler = useCallback((InputIdentifier,inputValue,inputValidity) =>{
        setCodeValue(inputValue)
        setModalValidity(inputValidity)
        },[setCodeValueHandler, setCodeValue, setModalValidity, codeValue])

    insertCodeButton = () => { 
        setModalVisible(true)
    }
    LogOutHandler = () => {
        dispatch(AuthActions.logout())
        props.navigation.navigate('start')
    }
    
    closeInsertCode = () => {
        setModalVisible(false)
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

    return (
        <View style={styles.screen} >
            <StatusBar backgroundColor={Colors.dark} barStyle={"light-content"} translucent={false}/>
            <EventDetail 
                loading = {isLoading}
                sentCode = {sentCode}
                insertCodeButton = {insertCodeButton}
                event = {selectedEvent}
                activeContracts = {activeContracts}
                loadContractsAndEvents = {loadContractsAndEvents}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
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
        headerTitle: 'Eventos'
    }
}

export default MainScreen