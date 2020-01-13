import React,{useState} from 'react'
import {View,Text,StyleSheet,FlatList,StatusBar} from 'react-native'

import Colors from '../../constants/Colors'
import STEPS from '../../staticData/comoFuncionaSteps'
import Card from '../../components/Card'


const HowToScreen2 = props => {

    return (

        <View style={styles.screen} >
            <Text>HOW TO SCREEN 2</Text>
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

export default HowToScreen2