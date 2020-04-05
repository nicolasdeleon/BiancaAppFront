import React, { useState, useEffect } from 'react'
import { 
    Animated, 
    View,
    StyleSheet,
    Text,
    Easing,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image
} from 'react-native'

const STATUS_TABLE = {
    '2BO': 'Todavia no ha comenzado',
    'O': 'Evento abierto. Inscribete, publicá y ganá!',
    'F': 'Evento ha finalizado',
    'C': 'Evento cerrado'
}

const EventItem = props =>{

    const [disabled, setDisabled] = useState(false)
    const [textContainerColor, setTextContainerColor] = useState("#90EE90")

    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version>=21) {
        TouchableCmp = TouchableNativeFeedback
    }
    let eventStatus = STATUS_TABLE[props.status]

    useEffect( () => {
        if(!(props.status === 'O')){
            setDisabled(true);
            setTextContainerColor("#6B6B6B")
        }
    },[props.status])

      const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
    
      /* UNCOMMENT THIS FOR DESIRED TWIK EFFECT IN CARD
      useEffect(()=>{
        // A loop is needed for continuous animation
        if(props.status === 'O'){
            Animated.loop(
                // Animation consists of a sequence of steps
                Animated.sequence([
                Animated.delay(2500),
                // start rotation in one direction (only half the time is needed)
                Animated.timing(animatedValue, {toValue: 1.0, duration: 150, easing: Easing.linear, useNativeDriver: true}),
                // rotate in other direction, to minimum value (= twice the duration of above)
                Animated.timing(animatedValue, {toValue: -1.0, duration: 300, easing: Easing.linear, useNativeDriver: true}),
                // return to begin position
                Animated.timing(animatedValue, {toValue: 0.0, duration: 150, easing: Easing.linear, useNativeDriver: true})
                ])
            ).start();
        }
    },[]) */


    return (
        <View>
            <TouchableCmp disabled={disabled} onPress={props.onSelect} useForeground>
                <Animated.View style={{...styles.event,
                    transform: [{
                      rotate: animatedValue.interpolate({
                        inputRange: [-1, 1],
                        outputRange: ['-0.04rad', '0.04rad']
                      })
                    }]
                  }}>
                    <Image style={styles.image} source={{uri:props.image}}/>
                    <View style={{...styles.textContainer, backgroundColor:textContainerColor}}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.status}>{eventStatus}</Text>
                    </View>
                    {disabled && <View style={[styles.overlay]} />}
                </Animated.View>
            </TouchableCmp>
        </View>
    )
};


const styles = StyleSheet.create({
    event:{
        elevation: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#888",
        backgroundColor: "white",
        margin: 20,
        height: 300,
        overflow: 'hidden',
    },
    image:{
        width: '100%',
        height: '75%',
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4,
    },
    status:{
        fontFamily: 'open-sans',
        fontSize: 14,
    },
    textContainer:{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '25%',
        padding: 10,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.1,
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
      } 
});

export default EventItem

