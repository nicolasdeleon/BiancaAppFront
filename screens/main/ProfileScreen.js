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
import ZeroPosts from '../../components/ZeroPosts'

import { useSelector, useDispatch } from 'react-redux'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'


const STEP_STATUS_TABLE = {
    '2BA': 'Estamos validando tu foto en Instagram. Recordá que biancaapp.ar te seguirá de tener cuenta privada.',
    'W': 'Se valido tu foto! Ingresá al evento para realizar el último paso.',
    'F': 'Listo! Se te notificará al recibir el beneficio. Esto puede demorar como máximo 5 días hábiles.',
    'Retrieved': 'Ya se te ha entregado el beneficio!'
}
const PROGRESSBAR_STATUS_TABLE = {
    '2BA': 0.25,
    'W': 0.5,
    'F': 0.75,
    'Retrieved': 1
}
const COLOR_STATUS_TABLE = {
    '2BA': Colors.primaryGradientLight,
    'W': Colors.greenActiveEvent,
    'F': Colors.accent,
    'Retrieved': Colors.accent
}


const ProfileScreen = props => {

const [error, setError] = useState()
const [isLoading, setIsLoading] = useState(false)
const activeContracts = useSelector( state => state.events.activeContracts )
const dispatch = useDispatch()


const loadContracts = useCallback(async () =>{
    setIsLoading(true)
    setError(null)
    try {
        await dispatch(EventActions.getActiveContracts())
    } catch (err){
        setError(err.message)
    }
    setIsLoading(false)
    console.log(activeContracts)
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
if(!isLoading && activeContracts.length === 0){
    return(
        <ZeroPosts/>
    )
}
    return (
        <View style={styles.screen}>
            <View style={styles.eventosContainer}>
                <Text style={styles.actividadTitle}>Tu actividad en Bianca</Text>
                <View style={{flex:1, width:'100%'}}>
                <FlatList 
                onRefresh={loadContracts}
                refreshing={isLoading}
                data={activeContracts} 
                keyExtractor={item=>String(item.event.pk)}
                renderItem={
                    itemData => 
                        <MyEvent
                            image={itemData.item.event.image}
                            title={itemData.item.event.title}
                            text={STEP_STATUS_TABLE[itemData.item.receivedBenefit ? 'Retrieved' : itemData.item.status]}>
                            <ProgressBar 
                              style={styles.progress} 
                              width={200} 
                              color={COLOR_STATUS_TABLE[itemData.item.receivedBenefit ? 'Retrieved' : itemData.item.status]} 
                              progress={PROGRESSBAR_STATUS_TABLE[itemData.item.receivedBenefit ? 'Retrieved' : itemData.item.status]}>
                              </ProgressBar>
                        </MyEvent>
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
        margin: 10,
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
