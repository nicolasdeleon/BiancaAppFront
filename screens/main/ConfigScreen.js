import React, { useState, useCallback, useEffect,useReducer } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Button,
} from 'react-native'


import {useSelector, useDispatch} from 'react-redux'
import * as userActions from '../../store/actions/user'

import { FontAwesome } from '@expo/vector-icons'

import Colors from '../../constants/Colors'
import EditModal from '../../components/CustomModal'
import Input from '../../components/Input'

import * as AuthActions from '../../store/actions/auth'

const ConfigScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalValidity, setModalValidity] = useState(false)
    const [modalValue, setModalValue] = useState('')
    const [changingField, setChangingField] = useState('')
    const [changePassToggle,setChangePassTogle] = useState(false)    
    const [messageOK,setmessageOK] = useState()

    //REDUX
    const dispatch = useDispatch()
    const userData = useSelector(state=>state.user)
    const userToken = useSelector(state=>state.auth.token)

    const loadUserData = useCallback(async () =>{
        setIsLoading(true)
        setChangePassTogle(false)
        setError(null)
        try {
            await dispatch(userActions.getUserInfo(userToken))
        } catch (err){
            setError(err.message)
        }
        setIsLoading(false)
    },[dispatch, setIsLoading, setError])

    useEffect( () => {
        loadUserData()
    },[dispatch, loadUserData])


//FUNCIONES PARA EL MODAL O QUE SE ACTIVAN DESDE EL MODAL
    const closeEditModal = () =>{
        setModalVisible(false)
        setError(null)
    }

    const setEditValueHandler = useCallback((InputIdentifier, inputValue, inputValidity) => {
        setModalValue(inputValue)
        setModalValidity(inputValidity)
        },[setEditValueHandler, setModalValue])

        const openModalHandler = (valueTitle, actualValue) => {
        setError(null)
        setModalValue(actualValue)
        setChangingField(valueTitle)
        setModalVisible(true)
    }

    const modalSendFormHandler = async () =>{
            if(!userToken){
                return
            }
            let action
            switch (changingField){
                case 'Instagram Account':
                        action = userActions.changeUserValues(userToken,userData.email,userData.name,modalValue)
                    break;
                default:
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
                    setError(err.message)
                    setIsLoading(false)
                }
            }else{
                setError('Credenciales inválidas.')
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
    const NotChangePassword = () => {
        setChangePassTogle(false)
    }
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
                setError(null)
                setIsLoading(true)
                try{
                    await dispatch(action)
                    setIsLoading(false)
                    setmessageOK("Contraseña cambiada con éxito.")
                }catch (err){
                    setError(err.message)
                    setIsLoading(false)
                }
            }else{
                setError('Error en credenciales.')
                setIsLoading(false)
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



    return (
        
        <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={80}
        onRefresh={loadUserData}
        refreshing={isLoading}
        style={styles.screen}>
            
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
                <ScrollView style={styles.titleContainer}>
                    <Text style={styles.title}>Bienvenido a Bianca!</Text>
                    <View style={styles.textContainer}>
                        <FontAwesome name='instagram' size={25} color={Colors.accent}/>
                        {isLoading ? 
                        (<ActivityIndicator size='large' color={Colors.primary}/>) 
                        : 
                        <Text style={styles.instaAccount}> {userData.instaAccount} </Text>
                        }
                        
                    </View>
                    <View style={{alignContent:'center',alignItems:'center'}}>                            
                        <Text
                        style={{color:Colors.accent,fontFamily:'open-sans',fontSize:16,textAlign:'center'}}
                        >Tenga presente que mediante esta cuenta de instagram Bianca 
                            <Text style={{fontFamily:'open-sans-bold'}}> valida las publicaciones</Text>, verifique que
                            <Text style={{fontFamily:'open-sans-bold'}}> coincida con la de su cuenta en Instagram!</Text>
                            <Text style={{fontFamily:'open-sans'}}> No es necesario que contenga el @.</Text></Text>
                            <Text></Text>
                        <View style={styles.buttonContainer}>
                            <Button
                            title='Actualizar cuenta Instagram' 
                            color={Colors.accent}
                            onPress={()=>openModalHandler('Instagram Account',userData.instaAccount)}
                            ></Button>                   
                        </View>    
                    </View>
                
                    
                {changePassToggle &&             
                        <View style={styles.authContainer}>

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
                        </View>
                    }
                    {!changePassToggle && <Text></Text>}
                    <View style={{alignContent:'center',alignItems:'center'}}>   
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='Cambiar Contraseña en Bianca APP' 
                                color={Colors.accent} 
                                onPress={goToChangePassword}
                            />
                            {changePassToggle &&
                            <View style={{width: 100, marginVertical: 8, alignSelf:'center'}}>
                                <Button 
                                title='Cancelar'
                                color={'#ff0000'}
                                onPress={NotChangePassword}
                                />
                            </View>
                            }
                        </View>
                        
                    {isLoading ? 
                        (<ActivityIndicator size='large' color={Colors.primary}/>) 
                        : 
                        <View>
                        {messageOK && <Text style={{color:'green'}}>{messageOK}</Text>}
                        {error && <Text style={{color:'red'}}>{error}</Text>}
                        </View>
                    }
                    </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    titleContainer: {
        width: '100%',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        padding: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        marginVertical: 12,
    },
    instaAccount: {
        marginHorizontal: 20,
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: Colors.primary,
    },
    userPropsContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    editProfileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        padding: 10,
    }, 
    authContainer:{
        marginVertical: 20,
        width:'100%',
        padding:15,
        elevation:3,
    },
})


export default ConfigScreen