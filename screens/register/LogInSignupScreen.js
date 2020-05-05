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
} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

//constants and components imports
import Input from '../../components/Input'
import Colors from '../../constants/Colors'

//store and redux imports
import {useDispatch} from 'react-redux'
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

const LogInSignupScreen = props => {

    const [isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formState,dispatchFormState] = useReducer(formReducer,{
             inputValues: {
                email:'',
                password:''
             }, 
             inputValidities:{
                email:false,
                password:false
            },
             formIsValid: false 
             }
         )

    const inputChangeHandler = useCallback((InputIdentifier,inputValue,inputValidity) => {
    dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid : inputValidity,
        input: InputIdentifier
        })
    },[dispatchFormState])

    dispatch = useDispatch()
    const authHandler = async () =>{
        let action
        if (formState.inputValues.email != '' &&
            formState.inputValues.password != ''){
            action = AuthActions.login(
                formState.inputValues.email,
                formState.inputValues.password
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
        }else setError('Complete usuario y contraseña.')
    }

    goToRegister = () =>{
        props.navigation.navigate('register')
    }

    goToForgotPassword = () =>{
        props.navigation.navigate('forgotPassword')
    }

    return (
        <KeyboardAvoidingView
        style={styles.screen}
        behavior="padding"
        keyboardVerticalOffset={-500}
        >
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

                        <View>
                            <Input
                                id='password'
                                label='Contraseña'
                                keyboardType='default'
                                required
                                secureTextEntry
                                minLength={5}
                                autoCapitalize="none"
                                errorText="Ingrese una contraseña válida."
                                onInputChange={inputChangeHandler}
                                initialValue=''
                                desiredLength={60}
                            />
                     </View>

                        <View style={{marginVertical: 8}}>
                            <TouchableOpacity onPress={goToForgotPassword}>  
                                <Text style={styles.forgotPasswordTex}>Olvidé mi contraseña.</Text>
                            </TouchableOpacity>
                        </View> 

                        <View style={styles.buttonContainer}>
                            {isLoading ? (<ActivityIndicator size='small' color={Colors.primary}/>) : 
                            (<Button 
                                title='Ingresar' 
                                color={Colors.primary} 
                                onPress={authHandler}
                            />)}
                            </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='Registrarse' 
                                color={Colors.accent} 
                                onPress={goToRegister}
                            />
                            {error && <Text style={styles.errorText}>{error}</Text>}
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

LogInSignupScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Ingresar'
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authContainer: {
        width: '90%',
        maxHeight: '90%',
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
    forgotPasswordTex: {
        textDecorationLine: 'underline',
        fontFamily: 'open-sans'
    },
    errorText: {
        color: 'red',
        fontFamily: 'open-sans'
    },
    activateAccountCointainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        padding: 5,
        marginBottom: 10
    },
    activateAccountText: {
        color: Colors.primary,
        fontFamily: 'open-sans',
        fontSize: 18,
    }
})


export default LogInSignupScreen