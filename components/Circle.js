import React from 'react'
import {View,StyleSheet,} from 'react-native'
import Colors from '../constants/Colors';

const Circle = props =>{

    return (
        <View style={styles.circle}>
            {!props.hollow && <View style={styles.shallow}></View>}
        </View>
    )
};


const styles = StyleSheet.create({
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: Colors.primary,
        margin:3,
        justifyContent:'center',
        alignItems:'center'
    },
    shallow:{
        width: 6,
        height: 6,
        borderRadius: 6/2,
        backgroundColor: 'white',
    }
});

export default Circle

