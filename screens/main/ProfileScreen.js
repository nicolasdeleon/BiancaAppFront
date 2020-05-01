import React, { useState, useCallback, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,    
    ActivityIndicator,
    FlatList,
    Button,
} from 'react-native'

import MyEvent from '../../components/MyEvent'
import ProgressBar from 'react-native-progress/Bar'
import Colors from '../../constants/Colors'
import EventItem from '../../components/EventItem'
import ErrorComponent from '../../components/ErrorComponent'

import { useSelector, useDispatch } from 'react-redux'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'

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
    else return[true, false, false, false, false]
}

const ProfileScreen = props => {

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
    let mounted = true
    loadContracts()
    return () => false
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
        <ErrorComponent/>
    )
}

    return (
        <View style={styles.screen}>
            <View style={styles.resumenContainer}>
                <Text style={styles.actividadTitle}>Te dejamos un breve resumen de tu actividad</Text>
            </View>
            <View style={styles.eventosContainer}>
                <Text style={styles.actividadTitle}>Eventos Realizados y Activos</Text>
                <View style={{flex:1, width:'100%'}}>


                <FlatList 
                onRefresh={loadContracts}
                refreshing={isLoading}
                data={activeContracts} 
                keyExtractor ={item=>String(item.pk)}
                renderItem={itemData => 
                    
                    <MyEvent
                    text={"Ganate un 30% de descuento en todos los eventos de Bianca!"}>
                        <Text style={styles.stepText}>Ultimo paso! Introduce tu telefono</Text>
                        <ProgressBar style={styles.progress} width={200} color={Colors.dark} progress={0.7}/>
                    </MyEvent>
                    /*<EventItem
                                title={itemData.item.title}
                                status={itemData.item.status}
                                image={itemData.item.image}
                                onSelect={() => {
                                    let s = 'N'
                                    let data4company = ''
                                    if (activeContracts.length != 0) {
                                        for (i = 0; i<activeContracts.length; i++) {
                                            if (activeContracts[i].event.pk == itemData.item.pk){
                                                s = activeContracts[i].status
                                                data4company = activeContracts[i].data4Company
                                            }
                                        }
                                    }
                                    
                                    dispatch(EventActions.setEventRealState(s))
                                    props.navigation.navigate('EventDetail', {
                                        currentStatus: status2Array(s),
                                        benefitDescription: itemData.item.benefitDescription,
                                        eventType: itemData.item.eventType,
                                        eventId: itemData.item.pk,
                                        eventTitle: itemData.item.title,
                                        eventDescription: itemData.item.description,
                                        eventStatus: itemData.item.status,
                                        data4company: data4company
                                            }
                                        )
                                    }
                                }
                            >
                                </EventItem> */
                            }
                />


                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    resumenContainer: {
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30%'
    },
    eventosContainer: {
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70%'
    },
    actividadTitle: {
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    },
    progress: {
    },
    stepText: {
        marginBottom: 6,
        fontFamily: 'open-sans'
    }
})


export default ProfileScreen
