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


    useEffect( () => {
        setAppearAnimaton(props.active)
    },[props])

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
            <Text>STORY VALIDATION</Text>
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
    textPaso1: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: 'white',
        marginVertical: 6,
    },
    textSubiTuHistoria: {
        fontSize: 26,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: 'white'
    },
    image:{
        width:'30%',
        height:'30%',
        resizeMode:"contain",
    },
});

export default StorySubmission
