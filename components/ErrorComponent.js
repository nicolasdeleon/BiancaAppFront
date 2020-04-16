import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native'

const ErrorComponent = props =>{
    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image 
        style={ styles.image } 
        source={ require('../staticData/BiancaLogo.png') }/>    
        <View style={{width:'90%', height:'50%'}}>
            <Text style={styles.text}>No se encontraron eventos!</Text>
            <Text style={styles.text}>Bianca se encuentra bajo un proceso de mejora.</Text>
            <Text style={styles.text}>Intente nuevamente mas tarde.</Text>
        </View>
    </View>
    
    )
};

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        width: 300,
        height: 300
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'open-sans',
        marginVertical: 3,
    }
});

export default ErrorComponent