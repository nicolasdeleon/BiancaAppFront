import React from 'react'
import {View,StyleSheet} from 'react-native'

const Card = props =>{
    return <View style= {{...styles.card,...props.style}}>{props.children}</View>
};

const styles = StyleSheet.create({
    card : {
        shadowColor: 'black',
        shadowOffset: {width:0,height:10},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 2, // elevation is only android
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 4,
        marginVertical:1,
        marginHorizontal:5,
        height:150, 
    }
});

export default Card