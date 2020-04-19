//imports from react and expo
import React, { useState, useReducer, useCallback } from 'react'

import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Switch,
} from 'react-native'


import {LinearGradient} from 'expo-linear-gradient'

//constants and components imports
import Input from '../../components/Input'
import Colors from '../../constants/Colors'

//store and redux imports
import { useDispatch } from 'react-redux'
import * as AuthActions from '../../store/actions/auth'


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

const RegisterScreen = props => {

    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    const [acceptTerms,setAcceptTerms] = useState(false)
    const [formState,dispatchFormState] = useReducer(formReducer,{
             inputValues: {
                firstname:'',
                lastname:'',
                instaaccount:'',
                email:'',
                password:'',
                password2:''
             },
             inputValidities:{
                firstname:false,
                lastname:false,
                instaaccount:false,
                email:false,
                password:false,
                password2:false
            },
             formIsValid: false 
             }
         )

    const inputChangeHandler = useCallback((InputIdentifier,inputValue,inputValidity) =>{
    dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid : inputValidity,
        input: InputIdentifier
        })
    },[dispatchFormState])

    const changeAcceptTerms = async () =>{
        if (acceptTerms == true){
            setAcceptTerms(false)
        }
        else {
            setAcceptTerms(true)
        }
    }

    dispatch = useDispatch()
    const authHandler = async () => {
        let action
        if (formState.inputValues.password !=
        formState.inputValues.password2 )
        {
            setError('Las contraseñas deben coincidir')
        }
        else if(acceptTerms == false)
        {
            setError("Debe aceptar los términos y condiciones.")
        }
        else if (formState.inputValues.email != "" && 
            formState.inputValues.firstname != "" &&
            formState.inputValues.lastname != "" &&
            formState.inputValues.instaaccount!= "" &&
            formState.inputValues.password != "" &&
            formState.inputValues.password2 != ""
            ) {
                action = AuthActions.register(
                    formState.inputValues.email,
                    formState.inputValues.firstname,
                    formState.inputValues.lastname,
                    formState.inputValues.instaaccount,
                    formState.inputValues.password,
                    formState.inputValues.password2
                    )
                if(formState.formIsValid){
                    setIsLoading(true)
                    setError(null)
                    try{
                        await dispatch(action)
                        setIsLoading(false)
                        props.navigation.navigate('app')
                    }catch (err){
                        setError(err.message)
                        setIsLoading(false)
                    }
                }else{
                    setError('Credenciales inválidas.')
                }
            }else{
                setError('Complete todos los datos requeridos.')
            }
    }

    ret2SignIn = () =>{
        props.navigation.pop()
    }

    goToTermsAndConds = () =>{
        props.navigation.navigate('termsAndConds')
    }

    return (
        <KeyboardAvoidingView
        style={styles.screen}
        >
        <LinearGradient colors={[Colors.accent,Colors.dark]} style={styles.gradient}>
            <View style={styles.authContainer}>
                <ScrollView>
                    <Input
                        id='firstname'
                        label='Nombre'
                        keyboardType='default'
                        required
                        autoCapitalize="none"
                        errorText="Ingrese nombre válido."
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <Input
                        id='lastname'
                        label='Apellido'
                        keyboardType='default'
                        required
                        autoCapitalize="none"
                        errorText="Ingrese apellido válido."
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <Input
                        id='instaaccount'
                        label='Usuario Instagram (no es necesario que contenga @)'
                        keyboardType='default'
                        required
                        autoCapitalize="none"
                        errorText="Ingrese un instagram válido."
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <Input
                        id='email'
                        label='E-Mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize="none"
                        errorText="Ingrese un e-mail válido."
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <Input
                        id='password'
                        label='Contraseña'
                        keyboardType='default'
                        required
                        secureTextEntry
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Ingrese una contraseña válida mínimo 5 caracteres."
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <Input
                        id='password2'
                        label='Confirmar Contraseña'
                        keyboardType='default'
                        required
                        secureTextEntry
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Ingrese una contraseña válida mínimo 5 caracteres."
                        onInputChange={inputChangeHandler}
                        initialValue=''
                    />
                    <View style={styles.checkbox}>
                        {/*<CheckBox 
                        value={acceptTerms}
                        onValueChange={changeAcceptTerms}
                        /> 16/02*/}
                        <Switch 
                        value={acceptTerms}
                        onValueChange={changeAcceptTerms}
                        /> 
                        <TouchableOpacity onPress={goToTermsAndConds}>  
                            <Text style={styles.termsandcond}> Acepto los Términos y Condiciones.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        {isLoading ? (<ActivityIndicator size='small' color={Colors.primary}/>) : 
                        (<Button 
                            title='Registrarse'
                            color={Colors.primary}
                            onPress={authHandler}
                        />)}

                        {error && <Text style={{color:'red'}}>{error}</Text>}
                        </View>
                </ScrollView>
            </View>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}

RegisterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Registrarse',
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authContainer: {
        height: '90%',
        width: '90%',
        padding: 15,
        borderColor: '#f5f5f5',
        borderWidth: 1,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white'
    },
    cartItem: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10,
    },
    checkbox: {
        flexDirection: "row",
        alignItems: 'center',
        fontFamily: 'open-sans'
    },
    termsandcond: {
        textDecorationLine: 'underline',
        fontFamily: 'open-sans'
    },
})


export default RegisterScreen