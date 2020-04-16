import React, { useState, useCallback, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'

import {useSelector, useDispatch} from 'react-redux'
import * as userActions from '../../store/actions/user'

import { FontAwesome } from '@expo/vector-icons'

import Colors from '../../constants/Colors'
import EditModal from '../../components/CustomModal'
import Input from '../../components/Input'

const ProfileScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [instaInfoToggle, setInstaInfoToggle] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalValidity, setModalValidity] = useState(false)
    const [modalValue, setModalValue] = useState('')
    const [changingField, setChangingField] = useState('')
    
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
    }

    const setEditValueHandler = useCallback((InputIdentifier, inputValue, inputValidity) => {
        setModalValue(inputValue)
        setModalValidity(inputValidity)
        },[setEditValueHandler, setModalValue])

        const openModalHandler = (valueTitle, actualValue) => {
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
                setError('Invalid form credentials')
            }
    }

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
                <Text>{error}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    titleContainer: {
        alignItems: 'center',
        width: '90%',
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
        width: '90%',
    },
    editProfileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        padding: 10,
    }
})


export default ProfileScreen