import React,{useState} from 'react'
import {View,Text,StyleSheet,FlatList,StatusBar,KeyboardAvoidingView} from 'react-native'



const TermsAndCondsScreen = props => {

    return (
        
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <View style={styles.screen} >
                <Text>TERMS AND CONDITIONS</Text>
            </View>
            
        </KeyboardAvoidingView>
    )
}


TermsAndCondsScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Términos y Condiciones'
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
    },
})


export default TermsAndCondsScreen