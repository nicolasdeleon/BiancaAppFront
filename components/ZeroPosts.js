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
        
        <Text style={styles.actividadTitle}>Tu actividad en Bianca</Text>
        <Image 
        style={ styles.image } 
        source={ require('../staticData/BiancaLogo.png') }/>    
        <View style={{width:'90%', height:'50%'}}>
            <Text style={styles.text}>Aún no estás participando.</Text>
            <Text style={styles.text}>Comenzá y disfrutá los beneficios!</Text>
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
    },
    actividadTitle: {
        fontSize: 20,
        marginTop:70,
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    },
});

export default ErrorComponent