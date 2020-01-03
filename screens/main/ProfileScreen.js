import React,{useState,useCallback,useEffect} from 'react'
import {View,Text,StyleSheet,Button,ActivityIndicator,TouchableOpacity} from 'react-native'
import Colors from '../../constants/Colors'
import {FontAwesome} from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'
import EditModal from '../../components/CustomModal'
import * as userActions from '../../store/actions/user'

const ProfileScreen = props => {

    //define my state variables

    //USE STATE
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState()
    const [instaInfoToggle,setInstaInfoToggle] = useState(false)
    const [modalVisible,setModalVisible] = useState(false)
    const [modalValidity,setModalValidity] = useState(false)
    const [modalValue,setModalValue] = useState('')
    const [changingField,setChangingField] = useState('')
    
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
//--------------------------

    return (
        <View style={styles.screen}>
            <EditModal 
            modalVisible={modalVisible} 
            onClose={closeEditModal}
            onSetCodeValue={setEditValueHandler} //Esta funcion proviene de on InputChange del input
            onSend={modalSendFormHandler}
            errorText={error}
            loading={isLoading}
            title={changingField}
            initialValue={modalValue}
            acceptButtonText={'Aceptar'}
            maxLength={15}
            minLength={1}
            errorText={error}
            loading={isLoading}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Bienvenido a Bianca!</Text>
                <View style={styles.textContainer}>
                    <TouchableOpacity 
                    style={{flex:1,alignContent:'center',justifyContent:'center',flexDirection:'row'}}
                    onPress={()=>{setInstaInfoToggle(!instaInfoToggle)}}>
                        <FontAwesome name='user-o' size={25} color={Colors.accent}/>
                        {isLoading ? 
                                (<ActivityIndicator size='large' color={Colors.primary}/>) : 
                        <Text style={styles.instaAccount}> {userData.instaAccount} </Text>}
                    </TouchableOpacity>
                </View>
                {instaInfoToggle &&
                    <View style={{alignContent:'center',alignItems:'center'}}>                            
                        <Text
                        style={{color:Colors.accent,fontFamily:'open-sans',fontSize:18,textAlign:'center'}}
                        >Tenga presente que mediante esta cuenta de instagram Bianca 
                            <Text style={{fontFamily:'open-sans-bold'}}> valida las publicaciones</Text>, verifique que
                            <Text style={{fontFamily:'open-sans-bold'}}> coincida con la de su cuenta en Instagram!</Text></Text>
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
                            (<ActivityIndicator size='large' color={Colors.primary}/>)  :
                    <Text style={styles.instaAccount}> {userData.name} </Text>}
                </View>
                <View style={styles.textContainer}>
                    <FontAwesome name='user-o' size={25} color={Colors.accent}/>
                    {isLoading ? 
                            (<ActivityIndicator size='large' color={Colors.primary}/>) :
                    <Text style={styles.instaAccount}> {userData.email} </Text>}
                </View>
                <Text>{error}</Text>
            </View>
        </View>
    )
}

/**
 * PUNTAJE DEL USUARIO COMENTADO!
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
        width:'90%',
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
        width:'90%',
    },
    editProfileContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:50,
        padding:10,
    }
})

export default ProfileScreen