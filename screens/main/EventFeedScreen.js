import React, { useState, useCallback, useEffect} from 'react'
import {
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'

import Colors from '../../constants/Colors'
import EventItem from '../../components/EventItem'


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

    if(error){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>A ocurrido un error: {error}</Text>
                <Button title="Intenar de Nuevo" onPress={loadContracts} color={Colors.primary}/>
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
                        onSelect={()=>{props.navigation.navigate('EventDetail',{
                            eventId: itemData.item.pk,
                            eventCode: itemData.item.code,
                            eventTitle: itemData.item.title,
                            eventDescription: itemData.item.desc,
                            eventStatus: itemData.item.status
                                    })}}
                        >
                        </EventItem> 
                    }
        /> // FlatList
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