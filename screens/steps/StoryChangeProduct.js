import React, { useState, useEffect } from 'react'
import {
    View,
    Easing,
    StyleSheet,
    Text,
    ScrollView,
    Animated
} from 'react-native'

import AwesomeButton from 'react-native-really-awesome-button';

import useAnimation from '../../components/UseAnimaton'
import BubbleText from '../../components/BubbleText'
import Colors from '../../constants/Colors';
import Input from '../../components/Input'


const StorySubmission = props =>{

    const [doAppearAnimaton, setAppearAnimaton] = useState(props.active)

    const appearAnimaton = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 0})

    const startDesappearAnimation = () => {
        // HERE WITH A CALLBACK I NEED TO FORCE APPEARENCE OF NEXT SCREEN
        props.next()
    }

    const animateEntryScreen = { 
        opacity: appearAnimaton.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
            }),
    }

    function Header () {
        return (
            <View style={{alignContent:'center', alignItems:'center'}}>
                <Text style={styles.textFelicidades}>¡FELICIDADES!</Text>
                <Text style={styles.textValidamos}>Nuestro equipo valido tu foto</Text>
            </View>
        )
    }

    function InHandBenefit() {
        return (
            <ScrollView>
            <View style={{flex:1, justifyContent: 'space-around', alignItems: 'center',}}>
                <Text style={styles.textMostra}>Mostrá esta pantalla al encargado del local</Text>
                <AwesomeButton 
                backgroundColor={Colors.accent}
                borderRadius={110/2}
                width={110}
                height={110}
                disabled={!doAppearAnimaton}
                backgroundPlaceholder={'#010203'}
                backgroundDarker={'#010203'}
                onPress={(next) => {
                    startDesappearAnimation()
                    next()
                }}>
                YA RECIBÍ EL BENEFICIO
                </AwesomeButton>
            </View>
            </ScrollView>
        )
    }

    const inputChangeHandler = () => {

    }

    function InsertAccount() {
        return (
            <View style={{flex:1, justifyContent: 'space-around', alignItems: 'center',}}>
                <Text style={styles.textMostra}>Completa el dato para referite a tu cuenta de Wabi</Text>
                <Input
                  id='account'
                  label='Número de Teléfono'
                  keyboardType='default'
                  textAlign='center'
                  width={200}
                  style={{fontSize:24, textColor:"white"}}
                  required
                  autoCapitalize="none"
                  errorText="Ingresa número válido"
                  onInputChange={inputChangeHandler}
                  initialValue=''
                />
                <AwesomeButton 
                backgroundColor={Colors.accent}
                borderRadius={110/2}
                width={200}
                height={80}
                disabled={!doAppearAnimaton}
                backgroundPlaceholder={'#010203'}
                backgroundDarker={'#010203'}
                onPress={(next) => {
                    startDesappearAnimation()
                    next()
                }}>
                RECIBIR BENEFICIO EN ESTA CUENTA
                </AwesomeButton>
            </View>
        )
    }

    return (
        <Animated.View style={{...styles.screen}}>
        <Header/>
            {props.eventType === 1 ? <InHandBenefit/> : <InsertAccount/>}
        </Animated.View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
    },
    textFelicidades: {
        fontSize: 26,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: 'white',
        marginBottom:6
    },
    textValidamos: {
        fontSize: 20,
        fontFamily: 'open-sans',
        textAlign: 'center',
        color: 'white'
    },
    textMostra: {
        fontSize: 18,
        fontFamily: 'open-sans',
        textAlign: 'center',
        color: 'white'
    }

});

export default StorySubmission
