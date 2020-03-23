import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Animated
} from 'react-native'

const BubbleText = props =>{
    return (
        <Animated.View style={{...styles.container,...props.style}}>
            <Text style={styles.text}>{props.text}</Text>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    container : {
        shadowColor: 'black',
        shadowOffset: {width:0,height:10},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 2, // elevation is only android
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        marginVertical:1,
        marginHorizontal:5,
        width: '80%', 
    },
    text: {
        fontSize: 18,
        fontFamily: 'open-sans',
        marginLeft: 3,
    }
});

export default BubbleText