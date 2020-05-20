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

    const [error, setError] = useState(null)
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

        let data4company = ""
        if(props.eventType != 'A') {
            if( formState.inputValues.userData == '' ||
                !formState.inputValidities.userData ) {
                    Alert.alert('Ups! fijate de haber completado bien la información')
                    return
                }
        data4company = formState.inputValues.userData
    }
    props.next(data4company)
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
                <Text style={styles.textValidamos}>Nuestro equipo validó tu foto</Text>
            </View>
        )
    }

    function InHandBenefit() {
        return (
            <View>
                <View style={{flex:1, justifyContent: 'space-around', alignItems: 'center',}}>
                    <Header/>
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
            <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={40}>
            <View style={styles.overallScreen}>
            <ScrollView>
                <View style={{ alignItems:'center'}}>
                    <Header/>
                    <Text style={styles.textMostra}>{props.exchangeDetails}</Text>
                    <Input
                    id='userData'
                    label='Número de Teléfono'
                    keyboardType='default'
                    textAlign='center'
                    tel
                    style={{fontSize:24, color:"white", marginBottom:50}}
                    required
                    autoCapitalize="none"
                    desiredLength={20}
                    errorText="Ingresa número válido"
                    onInputChange={inputChangeHandler}
                    initialValue={formState.inputValues.userData}
                    />
                    {error && <Text style={styles.errorText}>{error}</Text>}
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
            </View>
            </KeyboardAvoidingView>
        )
    }

    return (
        <Animated.View style={{...styles.screen}}>
            {props.eventType === 'A' ? <InHandBenefit/> : <InsertAccount/> }
        </Animated.View>
    )
};


const styles = StyleSheet.create({
    overallScreen: {
        width: '100%',
        maxHeight: '100%',
    },
    screen: {
        width: '100%',
        height: '100%',
        padding: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
    },
    textFelicidades: {
        marginTop:10,
        fontSize: 26,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 6
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
        marginBottom: 50,
    },
    errorText: {
        color: 'red',
        fontFamily: 'open-sans'
    },
});

export default StoryChangeProduct
