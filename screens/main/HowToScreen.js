import React,{useState} from 'react'
import {View,Text,StyleSheet,FlatList,StatusBar} from 'react-native'


const HowToScreen = props => {

    return (
        <View style={styles.screen} >
            <Text>HOW TO SCREEN 1</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
    },
})

export default HowToScreen