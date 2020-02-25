import React from 'react'
import {View,StyleSheet,Text,Platform,TouchableOpacity,TouchableNativeFeedback,ActivityIndicator,Image} from 'react-native'
import Colors from '../constants/Colors';
import EventStatusIndicator from '../components/EventStatusIndicator'

const STATUS_TABLE = {
    '2BO': 'Todavia no ha comenzado',
    'O': 'Evento abierto. Inscribete, publicá y ganá!',
    'F': 'Evento ha finalizado',
    'C': 'Evento cerrado'
}

const EventItem = props =>{
    let TouchableCmp = TouchableOpacity
    if(Platform.OS === 'android' && Platform.Version>=21){
        TouchableCmp = TouchableNativeFeedback
    }
    let eventStatus = STATUS_TABLE[props.status]
    return (
        <View>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View style={styles.event}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.status}>{eventStatus}</Text>
                    </View>
                </View>
            </TouchableCmp>
        </View>
    )
};


const styles = StyleSheet.create({
    event:{
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        height: 200,
        overflow: 'hidden',
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        marginVertical:4,
    },
    status:{
        fontFamily:'open-sans',
        fontSize:14,
        color:"#888",
    },
    textContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        height:'15%',
        padding:10,
    }
});

export default EventItem

