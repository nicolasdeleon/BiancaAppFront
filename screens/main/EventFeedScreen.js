import React, { useState, useCallback, useEffect} from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'


const EventFeedScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const activeEvents = useSelector( state => state.events.activeEvents )
    const dispatch = useDispatch()

    const loadContracts = useCallback(async () =>{
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(EventActions.getActiveEvents())
        } catch (err){
            setError(err.message)
        }
        setIsLoading(false)
    },[dispatch, setIsLoading, setError])

    useEffect( () => {
        loadContracts()
    },[dispatch, loadContracts])

    useEffect( () => {
        const willFocusSub = props.navigation.addListener('willFocus',()=>{
            loadContracts() 
        })
        return () => {
            willFocusSub.remove()
        }
    },[loadContracts])

    LogOutHandler = () => {
        dispatch(AuthActions.logout())
        props.navigation.navigate('start')
    }

    return (
        <View></View>
    )
}

const styles = StyleSheet.create({

})

EventFeedScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Eventos'
    }
}

export default EventFeedScreen