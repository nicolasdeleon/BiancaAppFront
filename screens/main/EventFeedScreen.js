import React, { useState, useCallback, useEffect} from 'react'
import {
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'

import Colors from '../../constants/Colors'
import EventItem from '../../components/EventItem'

const status2Array = (status) => {
    if (status == "2BA") { 
        return [false, false, true, false, false]
    }
    else if (status == "W") {
        return [false, false, false, true, false]
    }
    else if (status == "F") {
        return [false, false, false, false, true]
    }
    else return[false, false, false, false, false]
}

const EventFeedScreen = props => {

    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const activeEvents = useSelector( state => state.events.activeEvents )
    const userToken = useSelector( state => state.auth.token )
    const activeContracts = useSelector( state => state.events.activeContracts )
    const userStateInSelectedEvent = useState()
    const dispatch = useDispatch()

    const loadContracts = useCallback(async () =>{
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(EventActions.getActiveContracts())
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

    if(error){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Ha ocurrido un error: {error}</Text>
                <Button title="Intentar de Nuevo" onPress={loadContracts} color={Colors.primary}/>
            </View>
        )
    }

    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large' color={Colors.accent}/>
            </View>
        )
    }

    // Previsto por fallas en el servidor 
    if(!isLoading && activeEvents.length === 0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>No se encontraron eventos!</Text>
                <Text>Esto puede ser porque Bianca se encuentra bajo un proceso de mejora.</Text>
                <Text>Intente nuevamente mas tarde.</Text>
            </View>
        )
    }

    return (
        <FlatList 
        onRefresh={loadContracts}
        refreshing={isLoading}
        data={activeEvents} 
        keyExtractor ={item=>String(item.pk)}
        renderItem={itemData => <EventItem
                        title={itemData.item.title}
                        status={itemData.item.status}
                        image={itemData.item.image}
                        onSelect={() => {
                            let s = 'N'
                            if (activeContracts.length != 0) {
                                for (i = 0; i<activeContracts.length; i++) {
                                    if (activeContracts[i].event.pk == itemData.item.pk){
                                        s = activeContracts[i].event.status
                                    }
                                }
                            }
                            dispatch(EventActions.setEventRealState(s))
                            props.navigation.navigate('EventDetail',{
                            currentStatus: status2Array(s),
                            eventId: itemData.item.pk,
                            eventTitle: itemData.item.title,
                            eventDescription: itemData.item.desc,
                            eventStatus: itemData.item.status
                                    })}}
                        >
                        </EventItem> 
                    }
        />
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