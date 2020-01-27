import React from 'react'
import {View,StyleSheet,Image} from 'react-native'

const HowToScreen3 = props => {
    return (
        <View style={styles.screen} >
            <Image 
            style={styles.image}
            source={require('../../staticData/HowTo3.jpeg')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
    },
    image:{
        resizeMode:'stretch',
        width:'100%',
        height:'100%',
    }
})

export default HowToScreen3