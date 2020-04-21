import React, { useState, useReducer, useCallback } from 'react'
import {
    View,
    Easing,
    StyleSheet,
    Text,
    ScrollView,
    Animated,
    Alert,
    KeyboardAvoidingView
} from 'react-native'

import { useDispatch } from 'react-redux'

import AwesomeButton from 'react-native-really-awesome-button';

import useAnimation from '../../components/UseAnimaton'
import BubbleText from '../../components/BubbleText'
import Colors from '../../constants/Colors';
import Input from '../../components/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) =>{
    if (action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities={
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return{
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}


const StoryChangeProduct = props =>{


    const [formState, dispatchFormState] = useReducer(formReducer,{
        inputValues: {
            userData: ''
        }, 
        inputValidities:{
            userData: false
        },
            formIsValid: false 
        }
    )

    const [doAppearAnimaton, setAppearAnimaton] = useState(props.active)

    const appearAnimaton = useAnimation({doAnimation: doAppearAnimaton, duration: 700, easing: Easing.linear, callback: ()=>{}, delay: 0})

    dispatch = useDispatch()
    const startDesappearAnimation = async () => {

        let link = ""
        if(props.eventType == 'B') {
            if( formState.inputValues.userData == '' ||
                !formState.inputValidities.userData ) {
                    Alert.alert('Ups! fijate de haber completado bien la información')
                    return
                }
            link = formState.inputValues.userData
    }
    props.next(link)
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
        )
    }

    const inputChangeHandler = useCallback((InputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid : inputValidity,
            input: InputIdentifier
            })
        },[dispatchFormState])

    function InsertAccount() {
        return (
            <KeyboardAvoidingView >
            <ScrollView>
                <View style={{ alignItems:'center'}}>
                    <Text style={styles.textFelicidades}>¡FELICIDADES!</Text>
                    <Text style={styles.textValidamos}>Nuestro equipo valido tu foto</Text>
                    <Text style={styles.textMostra}>{props.exchangeDetails}</Text>
                    <Input
                    id='userData'
                    label='Número de Teléfono'
                    keyboardType='default'
                    textAlign='center'
                    style={{fontSize:24, color:"white", marginBottom:30}}
                    required
                    autoCapitalize="none"
                    errorText="Ingresa número válido"
                    onInputChange={inputChangeHandler}
                    initialValue={formState.inputValues.userData}
                    />
                    <AwesomeButton 
                    backgroundColor={Colors.accent}
                    borderRadius={110/2}
                    width={200}
                    height={80}
                    marginBottom={50}
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
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    return (
        <Animated.View style={{...styles.screen}}>            
            {props.eventType === 'B' ? <InsertAccount/> : <InHandBenefit/>}
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
        color: 'white',
        marginBottom: 50,
    },
    textMostra: {
        fontSize: 18,
        fontFamily: 'open-sans',
        textAlign: 'center',
        color: 'white',
        marginBottom: 100,
    }

});

export default StoryChangeProduct
