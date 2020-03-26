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

    const appearAnimaton = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.bounce, callback: ()=>{}, delay: 700})
    const moveDogAnimation = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 100})
    const appearFirstBubble = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 1000})

    useEffect( () => {
        setAppearAnimaton(props.active)
    },[props])

    const startDesappearAnimation = () => {
        // HERE WITH A CALLBACK I NEED TO FORCE APPEARENCE OF NEXT SCREEN
        props.next()
    }

    const animateEntryButton = {
        opacity : appearAnimaton.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.85, 1]
        }),
        transform : [
            {
                translateX: appearAnimaton.interpolate({
                    inputRange: [0, 0.85, 1],
                    outputRange: [450, 50, 0]
                    }),
            }
        ],
    }

    const animateEntryImage = {
        transform : [
            {
                translateY: moveDogAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 20]
                    })
            }
        ],
    }

    const animateEntryText = {
        transform : [
            {
            translateX: appearAnimaton.interpolate({
                inputRange: [0, 0.85, 1],
                outputRange: [450, 25, 0]
                })
               // translateY: 40,
            
            }
        ],
    }

    const animateEntryPaso1 = {
        transform : [
            {
            translateX: appearAnimaton.interpolate({
                inputRange: [0, 0.85, 1],
                outputRange: [450, 5, 0]
                })
            }
        ],
    }

    const animateFirstBubble = {
        opacity: appearFirstBubble.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.85, 1]
        }),
    }


    return (
        <View style={styles.screen}>
            <View style={styles.Container}>
                <Animated.Text style={{...styles.textPaso1,...animateEntryPaso1}}>Paso 1</Animated.Text>
                <Animated.Text style={{...styles.textSubiTuHistoria,...animateEntryText}}>Subi tu historia a Instagram</Animated.Text>
                <Animated.Image style={{...styles.image, ...animateEntryImage}} source={ require('../../staticData/dog.png') }/>
                <BubbleText
                    style={{marginVertical:25, ...animateFirstBubble}}
                    text={"Notificanos al subir tu historia"}/>
            </View>
            <Animated.View style={{...styles.ContainerButton,...animateEntryButton}}>
                <AwesomeButton 
                    backgroundColor={Colors.primary}
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
                    YA SUBI MI FOTO
                </AwesomeButton>
            </Animated.View>
        </View>
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
