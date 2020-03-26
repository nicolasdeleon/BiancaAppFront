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
        props.next()
    }

    const animateEntryScreen = { 
        opacity: appearAnimaton.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
            }),
    }

    return (
        <Animated.View style={{...styles.screen}}>
        <View style={{alignContent:'center', alignItems:'center'}}>
            <Text style={styles.textFelicidades}>¡FELICIDADES!</Text>
            <Text style={styles.textValidamos}>Nuestro equipo valido tu foto</Text>
        </View>
        <Text style={styles.textMostra}>Mostrá esta pantalla al encargado del local</Text>
            <AwesomeButton 
            backgroundColor={Colors.accent}
            borderRadius={140/2}
            width={140}
            height={140}
            disabled={!doAppearAnimaton}
            backgroundPlaceholder={'#010203'}
            backgroundDarker={'#010203'}
            onPress={(next) => {
                startDesappearAnimation()
                next()
            }}>
            YA RECIBÍ EL BENEFICIO
            </AwesomeButton>
        </Animated.View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'green'
    },
    textFelicidades: {
        fontSize: 26,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: 'white',
        marginBottom:6
    },
    textValidamos: {
        fontSize: 20,
        fontFamily: 'open-sans',
        textAlign: 'center',
        color: 'white'
    },
    textMostra: {
        fontSize: 18,
        fontFamily: 'open-sans',
        textAlign: 'center',
        color: 'white'
    }

});

export default StorySubmission
