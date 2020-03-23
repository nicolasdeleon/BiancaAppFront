import React, { useState, useEffect } from 'react'
import {
    View,
    Easing,
    StyleSheet,
    Animated
} from 'react-native'

import AwesomeButton from 'react-native-really-awesome-button';

import useAnimation from '../../components/UseAnimaton'
import Colors from '../../constants/Colors';

const WelcomeEvent = props =>{

    const [doAppearAnimaton, setAppearAnimaton] = useState(true)
    const [doDesappearAnimation, setDesappearAnimation] = useState(false)

    const appearAnimaton = useAnimation({doAnimation: doAppearAnimaton, duration: 500, easing: Easing.linear, callback: ()=>{}, delay: 0})
    const desappearAnimation = useAnimation({doAnimation: doDesappearAnimation, duration: 500, easing: Easing.linear, callback: ()=>{}, delay: 0})

    const animateEntryText = {
        opacity : appearAnimaton.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        }),
        transform : [
            {
                translateY: 40,
            }
        ],
    }

    const animateEntryButton = {
        opacity : appearAnimaton.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.85, 1]
        }),
        transform : [
            {
                translateY: appearAnimaton.interpolate({
                    inputRange: [0, 1],
                    outputRange: [60, 20]
                    })
            }
        ],
    }

    const animateDesappear = {
        opacity : desappearAnimation.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [1, 0.15,0]
        }),
        transform : [
            {
                translateX: desappearAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -300]
                    })
            }
        ],
    }

    const startDesappearAnimation = () => {
        // HERE WITH A CALLBACK I NEED TO FORCE APPEARENCE OF NEXT SCREEN
        props.next()
        setDesappearAnimation(true)
    }

    return (
        <Animated.View style={{...styles.screen, ...animateDesappear}}>
            <View style={styles.Container}>
                <Animated.Text style={{...styles.textBienvenido,...animateEntryText}}>Bienvenido al evento</Animated.Text>
                <Animated.Text style={{...styles.textEventTitle,...animateEntryText}}>{props.eventTitle}</Animated.Text>
            </View>
            <Animated.View style={{...styles.Container,...animateEntryButton}}>
                <AwesomeButton 
                    backgroundColor={Colors.primary}
                    borderRadius={20}
                    width={200}
                    backgroundPlaceholder={'#010203'}
                    backgroundDarker={'#010203'}
                    onPress={(next) => {
                        startDesappearAnimation()
                        next()
                    }}>
                    COMENZAR
                    </AwesomeButton>
            </Animated.View>
        </Animated.View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute'
    },
    Container: {
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: '40%'
    },
    textBienvenido: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: 'white',
        marginVertical: 6,
    },
    textEventTitle: {
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

export default WelcomeEvent

