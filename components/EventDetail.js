import React, { useState } from 'react'
import {View,StyleSheet,Text,ActivityIndicator,Animated} from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Colors from '../constants/Colors';



const EventDetail = props =>{


    const [fadeFirstStep, setFadeFirstStep] = useState(new Animated.Value(0))
    

    return (
        <View style={styles.screen}>
            <View style={styles.circle}>
                <Text style={styles.circleText}>Clickea acá para notificar haber subido la historia y obtener el beneficio</Text>
            </View>
            <View style={{...styles.circle, transform:[ { translateX: 200}] }}>
                <Text style={styles.circleText}>Clickea acá para notificar haber subido la historia y obtener el beneficio</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:Colors.dark
    },
    circle:{
        width: 250,
        height: 250,
        borderRadius: 250/2,
        backgroundColor: Colors.primary,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        padding:5,
    },
    circleText:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default EventDetail

