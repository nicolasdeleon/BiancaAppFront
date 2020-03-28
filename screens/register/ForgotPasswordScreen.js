import React, { useState, useReducer, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    ActivityIndicator
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

//constants and components imports
import Input from '../../components/Input'
import Colors from '../../constants/Colors'

//store and redux imports
import {useDispatch} from 'react-redux'
import * as AuthActions from '../../store/actions/auth'

//action type for form reducer
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

const ForgotPasswordScreen = props => { 

    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    const [showTokenForm, setShowTokenForm] = useState(null)
    const [formState,dispatchFormState] = useReducer(formReducer,{
             inputValues: {
                email:'',
             }, 
             inputValidities:{
                email:false,
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

    dispatch = useDispatch()
    const emailAuthHandler = async () =>{
        let action
        action = AuthActions.reset_password(
            formState.inputValues.email,
            )
        if(formState.formIsValid){
            setIsLoading(true)
            setError(null)
            try{
                await dispatch(action)
                setIsLoading(false)
                setShowTokenForm(true)
            }catch (err){
                setError(err.message)
                setIsLoading(false)
            }
        }else{
            setError('Credenciales inválidas')
        }
    }

    const confirmResetAuthHandler = async () =>{
        let action
        action = AuthActions.reset_password_confirm(
            formState.inputValues.email,
            formState.inputValues.token,
            formState.inputValues.password,
            formState.inputValues.password2
            )
        if(formState.formIsValid){
            setIsLoading(true)
            setError(null)
            try{
                await dispatch(action)
                setIsLoading(false)
                props.navigation.navigate('singIn')
            }catch (err){
                setError(err.message)
                setIsLoading(false)
            }
        }else{
            setError('Invalid form credentials')
        }
    }

    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <LinearGradient colors={[Colors.accent,Colors.dark]} style={styles.gradient}>
                <View style={styles.authContainer}>
                    <ScrollView>
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
                           desiredLength={60}
                        />

                        {!showTokenForm &&
                        <View style={styles.buttonContainer}>
                            {isLoading ? (<ActivityIndicator size='small' color={Colors.primary}/>) : 
                            (<Button 
                                title='Enviar' 
                                color={Colors.primary} 
                                onPress={emailAuthHandler}
                            />)}
                        </View>}
                        {showTokenForm &&
                        <View>
                        <Text>
                            Revise su correo (spam) y complete:
                        </Text>
                        <Input
                            id='token'
                            label='Token:'
                            keyboardType='default'
                            required
                            autoCapitalize="none"
                            errorText="Ingrese un token válido."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Contraseña:'
                            keyboardType='default'
                            required
                            secureTextEntry
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Ingrese una contraseña válida."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password2'
                            label='Confirmar contraseña:'
                            keyboardType='default'
                            required
                            secureTextEntry
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Ingrese una contraseña válida."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        </View>
                        }
                        {showTokenForm &&
                            <View style={styles.buttonContainer}>
                                {isLoading ? (<ActivityIndicator size='small' color={Colors.primary}/>) : 
                                (<Button 
                                    title='Confirmar' 
                                    color={Colors.primary} 
                                    onPress={confirmResetAuthHandler}
                                />)}
                            </View>
                        }
                        <View style={styles.buttonContainer}>
                        {error && <Text style={{color:'red'}}>{error}</Text>}
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

ForgotPasswordScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Reset Password'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authContainer: {
        width: '80%',
        padding: 15,
        borderColor: '#f5f5f5',
        borderWidth: 1,
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
    }
})


export default ForgotPasswordScreen