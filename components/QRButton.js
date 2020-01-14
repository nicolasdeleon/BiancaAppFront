import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import  Colors  from '../constants/Colors';

const QRButton = props =>{
    return(
        <View style={styles.button}>
        <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.ingresarCodigoText}>Ingresar Código</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        //shadows solo trabajan en ios
        shadowColor: 'black', //color de la sombra
        shadowOffset: {width:0,height:10}, //que mucho se offsetea del container para el efecto 3d
        shadowOpacity: 0.26, //que tan trasparente
        shadowRadius: 6, //Que tan redondo

        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        //elevation solo trabaja en andriod
        elevation:5,
        alignContent:'center',
        alignItems:'center',
        height:50,
    },
    ButtonText:{
        color:'white',
        fontSize:18,
    },
    ingresarCodigoText:{
        fontFamily:'open-sans',
        fontSize:18,     
    }
})

export default QRButton