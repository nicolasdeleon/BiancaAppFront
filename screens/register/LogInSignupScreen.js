//imports from react and expo
import React,{useState,useReducer,useCallback} from 'react'
import {View,Text,StyleSheet,KeyboardAvoidingView,ScrollView,Button,ActivityIndicator,TouchableOpacity, Switch} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

//constants and components imports
import Input from '../../components/Input'
import Colors from '../../constants/Colors'

//store and redux imports
import {useDispatch,useSelector} from 'react-redux'
import * as AuthActions from '../../store/actions/auth'

//action type for form reducer
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
//form reducer se llama por changeInputHandler para actualizar el estado y validez
//cada vez uqe se lo llama con FORM_INPUT_UPDATE. Retorna el estado actualizado
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
    return state //si no cayo en el if por alguna razon rara 
}
 
const LogInSignupScreen = props => {

    //variables de estado de mi Screen
    const [isLoading,setIsLoading] = useState(false) //para establecer algun load en async
    const [error,setError] = useState(null) //errores de loading o de logeo/registro

    //useReducer toma mi formReducer para saber con que form actualizar mi formState
    //inicializo formState con inputValues que es el valor en cada campo
    //inputValidities que es la validez de cada campo, y la validez total del form
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
         )//useReducer

    const inputChangeHandler = useCallback((InputIdentifier,inputValue,inputValidity) =>{
    dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid : inputValidity,
        input: InputIdentifier //Esta es una key que voy a mapear en mis inputvalues
        })
    },[dispatchFormState])

    //LOGICA DE DISPATCH AUTH A SERVER
    dispatch = useDispatch()
    
    const authHandler = async () =>{
        let action

        //para log in los campos necesarios para el request son email y password
        //fijarse en store/actions/auth --> signup(email,password){...}
        action = AuthActions.login(
            formState.inputValues.email,
            formState.inputValues.password
        )
        console.log("login in")
        console.log(formState.inputValues.email)
        console.log(formState.inputValues.password)
        if(formState.formIsValid){
            setIsLoading(true)
            setError(null)
            try{
                await dispatch(action)
                setIsLoading(false)
                props.navigation.navigate('app')
            }catch (err){
                //tipicamente error de Invalid Credentials proveniente del servidor data
                setError(err.message)
                setIsLoading(false)
            }
        }else{
            //si el form esta mal ni me gasto en mandar las credentials
            setError('Invalid form credentials')
        }

    }

    const getDataTest = ()=>{
        console.log('USUARIOS EN STORE:')
        let dataToken = useSelector(state=>state.auth.token)
        let datauserId = useSelector(state=>state.auth.userId)
        console.log(dataToken)
        console.log(datauserId)
    }

    //getDataTest()
    goToRegister = () =>{
        props.navigation.navigate('register')
    }
    
    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
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
                        />
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
                        />
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
                                title={true ? 'Registarse' : 'Ingresar'} 
                                color={Colors.accent} 
                                onPress={goToRegister}
                            />
                            {error && <Text style={{color:'red'}}>{error}</Text>}
                            </View>
                        <View >
                            <Text> ¿Olvidaste tu contraseña? </Text>
                            <TouchableOpacity onPress={this.signup}><Text style={{ textDecorationLine: 'underline' }}> Haz click aquí para resetear.</Text></TouchableOpacity>
                        </View>
                        <View>
                        <Switch
                        //value={this.state.rememberMe}
                        //onValueChange={(value) => this.toggleRememberMe(value)}
                        /><Text>Remember Me</Text>
                        </View>
                        
                        
                    </ScrollView>
                    
                </View>
                
            </LinearGradient>
            
        </KeyboardAvoidingView>
        
    )
}

LogInSignupScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'LogIn'
    }
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    authContainer:{
        width:'80%',
        maxWidth:400,
        height:'50%',
        maxHeight:400,
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

export default LogInSignupScreen