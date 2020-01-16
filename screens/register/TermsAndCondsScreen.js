import React,{useState} from 'react'
import {View,Text,StyleSheet,KeyboardAvoidingView,ScrollView,Button,ActivityIndicator} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

import Colors from '../../constants/Colors'

const TermsAndCondsScreen = props => {

    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <LinearGradient colors={[Colors.accent,Colors.dark]} style={styles.gradient}>
                <View style={styles.authContainer}>
                    <ScrollView>   
                        <View style={styles.screen} >
                            <Text>TERMS AND CONDITIONS</Text>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
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
    authContainer:{
        width:'80%',
        //maxWidth:400,
        //height:'80%',
        //maxHeight:400,
        padding:15,
        borderColor:'#f5f5f5',
        borderWidth:1,
        elevation:3,
        backgroundColor:'white'
    },
    cartItem: {
        padding:10,
        backgroundColor:"white",
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center',
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContainer:{
        marginTop:10,
    }
})


export default TermsAndCondsScreen