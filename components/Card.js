import React from 'react'
import {View,StyleSheet} from 'react-native'

const Card = props =>{
    return <View style= {{...styles.card,...props.style}}>{props.children}</View>
};


const styles = StyleSheet.create({
    card : {
        //shadows solo trabajan en ios
        shadowColor: 'black', //color de la sombra
        shadowOffset: {width:0,height:10}, //que mucho se offsetea del container para el efecto 3d
        shadowOpacity: 0.26, //que tan trasparente
        shadowRadius: 6, //Que tan redondo
        //elevation solo trabaja en andriod
        elevation: 2,
        backgroundColor: 'white',
        padding: 15, //para que no se me posen los botones en los ejes
        borderRadius: 4,
        marginVertical:1,
        marginHorizontal:5,
        height:150, 
    }
});

export default Card