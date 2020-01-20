//imports from react and expo
import React,{useState,useReducer,useCallback} from 'react'

import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    ActivityIndicator,
    DatePickerAndroid,
    TouchableOpacity,
    Platform,
    DatePickerIOS,
    CheckBox,
} from 'react-native'

import {LinearGradient} from 'expo-linear-gradient'

//constants and components imports
import Input from '../../components/Input'
import Colors from '../../constants/Colors'

//store and redux imports
import {useDispatch,useSelector} from 'react-redux'
import * as AuthActions from '../../store/actions/auth'

function formatDate(date) {
    var monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

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
 
const RegisterScreen = props => {

    //variables de estado de mi Screen
    const [isLoading,setIsLoading] = useState(false) //para establecer algun load en async
    const [error,setError] = useState(null) //errores de loading o de logeo/registro
    const [showDatePickerIos,setShowDatePickerIos] = useState(false)
    const [acceptTerms,setAcceptTerms] = useState(false) //checkbox terminos y condiciones

    //useReducer toma mi formReducer para saber con que form actualizar mi formState
    //inicializo formState con inputValues que es el valor en cada campo
    //inputValidities que es la validez de cada campo, y la validez total del form
    const [formState,dispatchFormState] = useReducer(formReducer,{
             inputValues: {
                firstname:'',
                lastname:'',
                instaaccount:'',
                email:'',
                date: new Date(),
                password:'',                
                password2:''
             }, 
             inputValidities:{
                firstname:false,
                lastname:false,
                instaaccount:false,
                email:false,
                date:false,
                password:false,                
                password2:false
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
    
    const changeAcceptTerms= async () =>{
        if (acceptTerms == true){
            setAcceptTerms(false)
        }
        else {
            setAcceptTerms(true)
        }
    }


    //LOGICA DE DISPATCH AUTH A SERVER
    dispatch = useDispatch()
    
    const authHandler = async () =>{
        let action

        //para log in los campos necesarios para el request son email y password
        //fijarse en store/actions/auth --> signup(email,password){...}

        if (formState.inputValues.password != 
        formState.inputValues.password2 )
        {
            setError('Las contraseñas deben coincidir')
        }
        else if (new Date().getFullYear() - formState.inputValues.date.getFullYear() <10)
        {
            //Parseo medio choto de fechas si o si tiene que ser mayor a 10años
            setError('Ingrese una fecha de nacimiento válida')
        }else if(acceptTerms == false)
            setError("Debe aceptar los términos y condiciones.")
        else
            // evito que vaya al back end si el usuario no presionó sobre los input
            if (formState.inputValues.email != "" && 
            formState.inputValues.firstname != "" &&
            formState.inputValues.lastname != "" &&
            formState.inputValues.instaaccount!= "" &&
            formState.inputValues.date!= "" &&
            formState.inputValues.password != "" &&
            formState.inputValues.password2 != ""
            ) {

                //FALTA AGREGAR DATE!!!!
                action = AuthActions.register(
                    formState.inputValues.email,
                    formState.inputValues.firstname,
                    formState.inputValues.lastname,
                    formState.inputValues.instaaccount,
                    formState.inputValues.date.toJSON(),
                    formState.inputValues.password,
                    formState.inputValues.password2
                    )
                console.log("REGISTERING form:.............")
                console.log(formState.inputValues.email)
                console.log(formState.inputValues.firstname)
                console.log(formState.inputValues.lastname)
                console.log(formState.inputValues.instaaccount)
                console.log(formState.inputValues.date)
                console.log(formState.inputValues.password)
                console.log(formState.inputValues.password2)
                if(formState.formIsValid){
                    setIsLoading(true)
                    setError(null)
                    try{
                        await dispatch(action)
                        setIsLoading(false)
                        props.navigation.navigate('singIn',{
                            message: `Verifica tu cuenta en ${formState.inputValues.email} tu mail para ingresar!`
                        })
                    }catch (err){
                        //tipicamente error de Invalid Credentials proveniente del servidor data
                        setError(err.message)
                        setIsLoading(false)
                    }
                }else{
                    //si el form esta mal ni me gasto en mandar las credentials
                    setError('Credenciales inválidas.')
                }
            }else{
                setError('Complete todos los datos requeridos.')
            } 
        
    }

    const getDataTest = ()=>{
        console.log('USUARIOS EN STORE:')
        let dataToken = useSelector(state=>state.auth.token)
        let datauserId = useSelector(state=>state.auth.userId)
        console.log(dataToken)
        console.log(datauserId)
    }

    getDataTest()

    ret2SignIn = () =>{
        props.navigation.pop()
    }

    openAndroidDatePicker = async () => {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
            //seteo date inicial: Por ahora para 
            date: formState.inputValues.date
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            // ESTO SE DISPARA CUANDO DA CLICK EN ACEPTAR
            console.log(year,month,day)
            inputChangeHandler('date',new Date(year,month,day),true)
          } 
          //else if (action !== DatePickerAndroid.dateSetAction) {
            // ESTO SE DISPARA CUANDO ELIGE UNA FECHA DENTRO DEL CALENDARIO
          //}
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }
      }

    openIosDatePicker = async () => {
        
    }

    //Navegar a TermsAndCond 
    goToTermsAndConds = () =>{
        props.navigation.navigate('termsAndConds')
    }
    return (
        <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={70}
        style={styles.screen}>
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
                        <View style={{width:'100%',marginVertical:4,}}>
                            <Text style={{fontFamily:'open-sans-bold',marginVertical:2,}}>Fecha de nacimiento</Text>
                            <Text style={{fontFamily:'open-sans',marginTop:6,marginBottom:4,textAlign:"left"}}>{formatDate(formState.inputValues.date)}</Text>
                            <View style={{alignItems:"center",width:'100%',}}>
                            {showDatePickerIos &&
                                    <View style={{width:"100%",height:200}}>
                                    <DatePickerIOS 
                                        initialDate = {formState.inputValues.date}
                                        date = {formState.inputValues.date}
                                        onDateChange = {(newDate) =>{
                                            inputChangeHandler('date',new Date(newDate),true)
                                    }}
                                        mode = {'date'}
                                    />
                                    </View>  
                            }
                            <TouchableOpacity onPress={()=>{
                                if(Platform.OS === 'android' && Platform.Version>=21){
                                    openAndroidDatePicker()
                                } else if(Platform.OS === 'ios'){
                                    setShowDatePickerIos(!showDatePickerIos)
                                }    
                            }}>
                                <Text>Elegir fecha</Text>
                            </TouchableOpacity> 
                            </View>
                        </View>
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
                            <CheckBox 
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
    return{
        headerTitle: 'Registrarse',
    }
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    authContainer:{
        height:'90%',
        width:'90%',
        padding:15,
        borderColor:'#f5f5f5',
        borderWidth:1,
        borderRadius:4,
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
    },
    checkbox:{
        flexDirection: "row",
        alignItems:'center',
        fontFamily:'open-sans'
    },
    termsandcond:{
        textDecorationLine: 'underline',
        fontFamily:'open-sans'
    },
})

export default RegisterScreen