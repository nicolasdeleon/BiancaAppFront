import React, { useState, useEffect } from 'react'
import {
    View,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native'
import Colors from '../constants/Colors';

const useAnimation = ({ doAnimation, duration, easing, callback,delay }) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    
    useEffect(() => {
      Animated.timing(animation, {
        toValue: doAnimation ? 1 : 0,
        duration,
        easing,
        delay
      }).start(() => {if(doAnimation)callback()}) ;
    }, [doAnimation]);
  
    return animation;
  }

const EventDetail = props =>{


    const [doAnimation, setDoAnimation] = useState(false)
    const fadeFirstStep = useAnimation({doAnimation, duration: 500, easing: Easing.linear, callback: ()=>{}, delay: 0})

    const [readyToExchangeColor, setReadyToExchangeColor] = useState("#D3D3D3")

    const fadeInSecondStep = useAnimation({doAnimation, duration: 700, easing: Easing.bounce, callback: ()=>{}, delay: 300})


    const startPublishedAnimation = () => {
        setDoAnimation(true)
    }

    const animateFadeFirstStep = {
        opacity : fadeFirstStep.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    }),
        transform:[ 
            { 
            translateX:  fadeFirstStep.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -300]
                })
            }
    ],
}

    const animateFadeInSecondStep = {
            transform:[ 
                { 
                translateX:  fadeInSecondStep.interpolate({
                    inputRange: [0, 1],
                    outputRange: [500, 0]
                    })
                }
        ],
    }

    return (
        <View style={styles.screen}>
                <Animated.View style={{...styles.circle,...animateFadeFirstStep, backgroundColor: Colors.primary}}>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',}} onPress={startPublishedAnimation}>
                        <Text style={styles.circleText}>Clickea acá para notificar haber subido la historia y obtener el beneficio</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{...styles.circle, ...animateFadeInSecondStep, backgroundColor:readyToExchangeColor}}>
                    <Text style={styles.circleText}>Haz click para canjear tu beneficio!</Text>
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
        flexDirection: 'row',
        backgroundColor:Colors.dark
    },
    circle:{
        width: 250,
        height: 250,
        borderRadius: 250/2,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        padding:5,
    },
    circleText:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'center'
    },
    overlay: {
        width: 250,
        height: 250,
        borderRadius: 250/2,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.7,
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      } 
});

export default EventDetail

