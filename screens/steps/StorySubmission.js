import React, { useState, useCallback } from 'react'
import {
    View,
    Easing,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Animated
} from 'react-native'

import AwesomeButton from 'react-native-really-awesome-button';

import useAnimation from '../../components/UseAnimaton'
import BubbleText from '../../components/BubbleText'
import Colors from '../../constants/Colors';

const StorySubmission = props =>{

    const [doAppearAnimaton, setAppearAnimaton] = useState(props.active)

    const appearAnimaton = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.bounce, callback: ()=>{}, delay: 300})
    const moveDogAnimation = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 100})
    const appearFirstBubble = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 700})
    const appearSecondBubble = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 900})

    const startDesappearAnimation = () => {
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
        opacity : moveDogAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.85, 1]
        })
    }

    const animateEntryText = {
        transform : [
            {
            translateX: appearAnimaton.interpolate({
                inputRange: [0, 0.85, 1],
                outputRange: [450, 25, 0]
                })
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

    const animateSecondBubble = {
        opacity: appearSecondBubble.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.85, 1]
        }),
    }

    const OpenInstagram = useCallback(async () => {
        var url = 'https://www.instagram.com/'
        const supported = await Linking.canOpenURL(url);
        if (supported)
            await Linking.openURL(url);
    }, [])

    return (
        <View style={styles.screen}>
            <View style={styles.Container}>
                <Animated.Text style={{...styles.textPaso1,...animateEntryPaso1}}>Paso 1</Animated.Text>
                <Animated.Text style={{...styles.textSubiTuHistoria,...animateEntryText}}>Subí tu historia a Instagram</Animated.Text>
                <Animated.Image style={{...styles.image, ...animateEntryImage}} source={ require('../../staticData/dog.png') }/>
                <View style={styles.bubbleContainer}>
                    <BubbleText
                    style={{fontSize:15, ...animateFirstBubble}}
                    textStyle={{fontSize: 14}}
                    text={props.description}/>
                    <BubbleText
                    style={{fontSize:15, ...animateSecondBubble}}
                    textStyle={{fontSize: 14}}
                    text={"¡Notificanos haciendo click en 'Ya subí mi foto' para poder validar la foto!"}/>
                </View>
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
                    YA SUBÍ MI FOTO
                </AwesomeButton>
                <TouchableOpacity
                  onPress={OpenInstagram}>
                    <Text style={{...styles.Instagram, marginTop: 20}}>Abrir Instagram</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    Container: {
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: '64%'
    },
    ContainerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '36%',
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
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginRight: 15,
        alignSelf:'flex-end',
        transform : [
            { rotate: '-12deg' },
            { translateY: 25 },
        ],
    },
    Instagram: {
        fontSize: 20,
        fontFamily: 'open-sans',
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'white'
    },
    bubbleContainer: {
        marginHorizontal: 5,
        padding: 4,
        alignSelf: 'flex-start'
    }
});

export default StorySubmission
