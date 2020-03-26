import React, { useState, useEffect } from 'react'
import {
    View,
    Easing,
    StyleSheet,
    Text,
    Image,
    Animated
} from 'react-native'

import AwesomeButton from 'react-native-really-awesome-button';

import useAnimation from '../../components/UseAnimaton'
import BubbleText from '../../components/BubbleText'
import Colors from '../../constants/Colors';

const StorySubmission = props =>{

    const [doAppearAnimaton, setAppearAnimaton] = useState(props.active)

    const appearAnimaton = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 0})

    const startDesappearAnimation = () => {
        // HERE WITH A CALLBACK I NEED TO FORCE APPEARENCE OF NEXT SCREEN
        //props.next()
    }

    const animateEntryScreen = { 
        opacity: appearAnimaton.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
            }),
    }

    return (
        <Animated.View style={{...styles.screen, ...animateEntryScreen}}>
            <Animated.Text style={styles.textEstamosValidando}>Estamos validando tu historia en Instagram</Animated.Text>
            <Animated.Text style={styles.textUnMomento}>Un momento por favor...</Animated.Text>
            <Animated.View style={styles.proTipContainer}>
                <Animated.Image style={{...styles.image}} source={ require('../../staticData/dog.png') }/>
                <View>
                    <View style={{marginLeft:4}}>
                        <Text style={styles.textPropTip}>Pro tip</Text>
                    </View>
                    <BubbleText
                        style={{fontSize:15, alignSelf:'flex-start'}}
                        textStyle={{fontSize: 14}}
                        text={"Activá las notificaciones para resivir un aviso de validación"}/>
                </View>
            </Animated.View>
            <Animated.Text style={styles.textActivarNot}>Activar Notificaciones</Animated.Text>
        </Animated.View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: Colors.primary
    },
    Container: {
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: '40%'
    },
    ContainerButton: {
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: '40%'
    },
    textEstamosValidando: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
    },
    textUnMomento: {
        fontSize: 20,
        fontFamily: 'open-sans',
        textAlign: 'center',
    },
    textPropTip: {
        fontFamily: 'open-sans-bold',
        marginLeft: 12
    },
    image:{
        width:'30%',
        height:'30%',
        resizeMode: 'contain',
        marginRight: 5,
        alignSelf:'flex-end',
        transform : [
            { rotate: '-12deg' },
            { translateY: 25 },
            { translateX: 8 }
        ],
    },
    proTipContainer:{
        width: '90%',
        alignItems: 'center',
        alignContent: 'center'
    },
    textActivarNot: {
        fontSize: 16,
        color: 'white',
        textDecorationLine: 'underline',
        fontFamily: 'open-sans'
    }
});

export default StorySubmission
