import React,{useState,useCallback,useEffect,useReducer} from 'react'
import {View,Text,StyleSheet,Button,ActivityIndicator,TouchableOpacity, ScrollView} from 'react-native'
import Colors from '../../constants/Colors'
import {FontAwesome} from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'
import EditModal from '../../components/CustomModal'
import * as userActions from '../../store/actions/user'
import Input from '../../components/Input'
import * as AuthActions from '../../store/actions/auth'

const ProfileScreen = props => {

    //define my state variables

    //USE STATE
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState()    
    const [messageOK,setmessageOK] = useState()
    const [instaInfoToggle,setInstaInfoToggle] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const [modalValidity,setModalValidity] = useState(false)
    const [modalValue,setModalValue] = useState('')
    const [changingField,setChangingField] = useState('')
    const [changePassToggle,setChangePassTogle] = useState(false)

    //REDUX
    const dispatch = useDispatch()
    const userData = useSelector(state=>state.user)
    const userToken = useSelector(state=>state.auth.token)

    
    const loadUserData = useCallback(async () =>{
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(userActions.getUserInfo(userToken))
        } catch (err){
            //mi fetchProducts tiene seteado un try catch para ahcer throw del error
            //lo puedo atajar aca
            setError(err.message)
            console.log("ERROR!!!!!!")
            console.log(error)
        }
        setIsLoading(false)
    },[dispatch,setIsLoading,setError])

    useEffect(()=>{
        loadUserData()
        console.log('Loading user data..')
    },[dispatch,loadUserData]) //por dependencia a dispatch solo se me llama una vez


//FUNCIONES PARA EL MODAL O QUE SE ACTIVAN DESDE EL MODAL
    const closeEditModal = () =>{
        setModalVisible(false)
    }

    const setEditValueHandler = useCallback((InputIdentifier,inputValue,inputValidity) =>{
        setModalValue(inputValue)
        setModalValidity(inputValidity)
        },[setEditValueHandler,setModalValue])
    
    const openModalHandler = (valueTitle,actualValue) => {
        setModalValue(actualValue)
        setChangingField(valueTitle)
        setModalVisible(true)
    }

    const modalSendFormHandler = async () =>{
        //DISPATCH ACTION OF CHANGING USER INFO:
            //tengo que 1 pedir cambiar la info en el servirdor
            //si todo sale bien, actualizar la info en el local tambien
            //si todo sale bien, cerrar el modal
            //si todo sale mal, mostar el error y no hacer ninguna de las acciones anteriores
            if(!userToken){
                console.log("AUTHENTICATE!")
                return
            }
            let action
            switch (changingField){
                case 'Instagram Account':
                    console.log("DEBUG")
                        action = userActions.changeUserValues(userToken,userData.email,userData.name,modalValue)
                    break;
                default:
                    //SI NO CAE EN ALGUNO DE ESTOS CASOS, DEBUGUEAR y RETORNAR
                    return
            }

            if(modalValidity){
                setIsLoading(true)
                setError(null)
                try{
                    await dispatch(action)
                    setIsLoading(false)
                    closeEditModal()
                }catch (err){
                    //tipicamente error de Invalid Credentials proveniente del servidor data
                    setError(err.message)
                    setIsLoading(false)
                    console.log(err)
                }
            }else{
                //SER MAS ROBUSTO CON ESTOOOOOOOOOOOOOOOOO!!!!
                setError('Invalid form credentials')
            }
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
    return state 
}

const [formState,dispatchFormState] = useReducer(formReducer,{
    inputValues:{
        token:userToken,
        old_password:false,
        password:false,
        password2:false
    },
     formIsValid: false 
     }
 )//useReducer

    const goToChangePassword = async () =>{
        let action
        
        if (formState.inputValues.old_password == "" ||
        formState.inputValues.password == "" ||
        formState.inputValues.password2 == "") {
            if(changePassToggle==false)
                setChangePassTogle(true)
            else
                setError('Debe completar todos los campos.')
        }else

        if (formState.inputValues.password != 
        formState.inputValues.password2 )
            setError('Las nuevas contraseñas deben coincidir.')
        else if(formState.inputValues.old_password!=""
            && formState.inputValues.old_password == 
            formState.inputValues.password )
            setError('Las contraseña actual debe ser diferente de la anterior.')
        

        if (formState.inputValues.old_password != "" &&
        formState.inputValues.password != "" &&
        formState.inputValues.password2 != "") 
        {                      
            action = AuthActions.change_password(
            formState.inputValues.token,
            formState.inputValues.old_password,                
            formState.inputValues.password,                
            formState.inputValues.password2
            )
            if(formState.formIsValid){
                //setIsLoading(true)
                setError(null)
                try{
                    await dispatch(action)
                    setmessageOK("Contraseña cambiada con éxito.")
                    //setIsLoading(false)
                    //props.navigation.navigate('singIn')
                }catch (err){
                    //tipicamente error de Invalid Credentials proveniente del servidor data
                    setError(err.message)
                    //setIsLoading(false)
                }
            }else{
                //si el form esta mal ni me gasto en mandar las credentials
                setError('Error en credenciales.')
            }
    
        }
        

    }

    const inputChangeHandler = useCallback((InputIdentifier,inputValue,inputValidity) =>{
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid : inputValidity,
            input: InputIdentifier //Esta es una key que voy a mapear en mis inputvalues
            })
        },[dispatchFormState])
    

    
//--------------------------

    return (
        <View style={styles.screen}>
            <EditModal
            modalVisible={modalVisible} 
            onClose={closeEditModal}
            onSend={modalSendFormHandler}
            errorText={error}
            loading={isLoading}
            title={changingField}
            acceptButtonText={'Aceptar'}
            errorText={error}
            loading={isLoading}
            >
            <Input
            maxLength={15}
            min={1}
            desiredLength={15} 
            initialValue ={modalValue}
            fontSize={24}
            textAlign='center'
            onInputChange={setEditValueHandler}
            autoCapitalize={'none'}
            errorText="Ingrese un instagram válido."
            />
            </EditModal>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Bienvenido a Bianca!</Text>
                <View style={styles.textContainer}>
                    <TouchableOpacity 
                    style={{flex:1,alignContent:'center',justifyContent:'center',flexDirection:'row'}}
                    onPress={()=>{setInstaInfoToggle(!instaInfoToggle)}}>
                        <FontAwesome name='instagram' size={25} color={Colors.accent}/>
                        {isLoading ? 
                            (<ActivityIndicator size='large' color={Colors.primary}/>) 
                            : 
                            <Text style={styles.instaAccount}> {userData.instaAccount} </Text>
                        }
                    </TouchableOpacity>
                </View>
                {instaInfoToggle &&
                    <View style={{alignContent:'center',alignItems:'center'}}>                            
                        <Text
                        style={{color:Colors.accent,fontFamily:'open-sans',fontSize:18,textAlign:'center'}}
                        >Tenga presente que mediante esta cuenta de instagram Bianca 
                            <Text style={{fontFamily:'open-sans-bold'}}> valida las publicaciones</Text>, verifique que
                            <Text style={{fontFamily:'open-sans-bold'}}> coincida con la de su cuenta en Instagram!</Text>
                            <Text style={{fontFamily:'open-sans'}}>No es necesario que contenga el @.</Text></Text>
                        <TouchableOpacity
                        onPress={()=>openModalHandler('Instagram Account',userData.instaAccount)} 
                        style={{margin:4}}><Text style={{color:'green'}}>Edit</Text></TouchableOpacity>
                    </View>
                }
            </View>
            <View style={styles.userPropsContainer}>
                <View style={styles.textContainer}>
                    <FontAwesome name='user-o' size={25} color={Colors.accent}/>
                    {isLoading ? 
                        (<ActivityIndicator size='large' color={Colors.primary}/>) 
                        :
                        <Text style={styles.instaAccount}> {userData.name} </Text>
                    }
                </View>
                <View style={styles.textContainer}>
                    <FontAwesome name='envelope-square' size={25} color={Colors.accent}/>
                    {isLoading ? 
                        (<ActivityIndicator size='large' color={Colors.primary}/>) 
                        :
                        <Text style={styles.instaAccount}> {userData.email} </Text>
                    }
                </View>
            
                {changePassToggle &&             
                    <View style={styles.authContainer}>
                        
                    <ScrollView>
                            <Input
                                id='old_password'
                                label='Contraseña Actual'
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
                                id='password'
                                label='Nueva Contraseña'
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
                                label='Confirmar Nueva Contraseña'
                                keyboardType='default'
                                required
                                secureTextEntry
                                minLength={5}
                                autoCapitalize="none"
                                errorText="Ingrese una contraseña válida mínimo 5 caracteres."
                                onInputChange={inputChangeHandler}
                                initialValue=''
                            />
                        </ScrollView>
                    </View>
                    }
                    <View style={styles.buttonContainer}>
                                    <Button 
                                        title='Cambiar Contraseña' 
                                        color={Colors.accent} 
                                        onPress={goToChangePassword}
                                    />                            
                    </View>          
                {messageOK && <Text style={{color:'green'}}>{messageOK}</Text>}
                {error && <Text style={{color:'red'}}>{error}</Text>}
                </View>
    
        </View>
    )
}

/**
 * PUNTAJE DEL
 *                 
 * <View style={styles.textContainer}>
        <FontAwesome name='user-o' size={25} color={Colors.accent}/>
        {isLoading ? 
                (<ActivityIndicator size='large' color={Colors.primary}/>) :
        <Text style={styles.instaAccount}> Puntaje de usuario {userData.score} </Text>}
    </View>
 */

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        marginTop:25,
    },
    titleContainer:{
        alignItems:'center',
        width:'100%',
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:50,
        padding:10,
    },
    title:{
        textAlign:'center',
        fontSize:24,
        fontFamily:'open-sans-bold',
        marginVertical:12,
    },
    instaAccount:{
        marginHorizontal:20,
        fontSize:18,
        fontFamily:'open-sans-bold',
        color:Colors.primary,
    },
    userPropsContainer:{
        flex:1,
        alignItems:'center',
        width:'100%',
    },
    editProfileContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:50,
        padding:10,
    },
    authContainer:{
        //height:'100%',
        width:'100%',
        padding:15,
        elevation:3,
    },
})

export default ProfileScreen