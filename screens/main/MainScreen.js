import React,{useState,useCallback} from 'react'
import {View,Text,StyleSheet,FlatList,ActivityIndicator,StatusBar} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons' //CREO QUE ME LA TENGO Q BAJAR
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import STEPS from '../../staticData/comoFuncionaSteps'
import Card from '../../components/Card'
import QRButton from '../../components/QRButton'
import InsertCode from '../../components/CustomModal'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'

/*
ACA TENGO QUE HACER UN IMPORT CON USE EFFECT O DE ALGUNA MANERA CARGAR LOS EVENTOS EN LOS
QUE ESTOY ENLISTADO. COSA DE PODER ACTUALIZAR EN CUALES ESTOY.
PARA ESTO SE PODRIA HACER UN PEDIDO A UN URL DE LA API CON BAREVENTO/ENLISTED
PODRIA TENER UN REGISTRO DE EVENTOS REALIZADOS. BAREVENTO/ISWINNER (fue medio lo que charlamos con los chicos)
POR OTR LADO FALTA HACER UN OBJETO EVENTO ASI COMO EN SHOPP HAY OBJETOS DE COMPRAS.
EMPROLIJAR BOTON DE LOGOUT.
VER TEMA NOTIFICACIONES
*/


const MainScreen = props => {
    const [modalVisible,setModalVisible] = useState(false)
    const [codeValue, setCodeValue] = useState('')
    const [error,setError] = useState()
    const [modalValidity,setModalValidity] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const userToken = useSelector(state=>state.auth.token)
    const activeEvents = useSelector(state=>state.events.activeEvents)
    const dispatch = useDispatch()

    const setCodeValueHandler = useCallback((InputIdentifier,inputValue,inputValidity) =>{
        setCodeValue(inputValue)
        setModalValidity(inputValidity)
        },[setCodeValueHandler,setCodeValue,setError])

    insertCodeButton = () => { 
        setModalVisible(true)
       //iPermitir ingresar codigo
    }
    LogOutHandler = () => {
        dispatch(AuthActions.logout())
        props.navigation.navigate('start')
    }
    
    closeInsertCode = () => {
        setModalVisible(false)
    }

    sendInsertCode = async () => {
        if(!userToken){
            console.log("AUTHENTICATE!")
            return
        }
        let action
        
        action = EventActions.joinEvent(userToken,codeValue)

        if(modalValidity){
            setIsLoading(true)
            setError(null)
            try{
                await dispatch(action)
                setIsLoading(false)
                closeInsertCode()
            }catch (err){
                //tipicamente error de Invalid Credentials proveniente del servidor data
                setError(err.message)
                setIsLoading(false)
            }
        }else{
            //SER MAS ROBUSTO CON ESTOOOOOOOOOOOOOOOOO!!!!
            setError('Invalid form credentials')
        }
    }

    verifyCodeValueAndError =() => {
        console.log('Valores del Modal:')
        console.log(codeValue)
        console.log(modalValidity)
        console.log(error)
        console.log(activeEvents)
    }

    verifyCodeValueAndError()

    return (
        
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.dark} barStyle={"light-content"} translucent={false}/>
            <View style={{width:'100%',height:'100%',flex:1,marginTop:25}}> 
            <InsertCode 
            modalVisible={modalVisible} 
            onClose={closeInsertCode}
            onSetCodeValue={setCodeValueHandler}
            onSend={sendInsertCode}
            title={"Inserte Código del Local"}
            initialValue={"....."}
            acceptButtonText={"Activar"}
            maxLength={5}
            minLength={5}
            errorText={error}
            loading={isLoading}
            />
                    <View style={styles.howItWorks}>
                        <Text style={styles.title}>¿Como funciona?</Text>
                        <FlatList
                            keyExtractor ={(item,index) => item.id}
                            data={STEPS}
                            renderItem={itemData =><Card>
                                    <Text style={styles.stepTitle}> {itemData.item.title}</Text>
                                    <Text style={styles.stepDesc}>{itemData.item.description}</Text>
                                </Card>}
                        />
                    </View>
                    <View style={styles.button}>
                    {isLoading ? 
                            (<ActivityIndicator size='large' color={Colors.primary}/>) 
                        :
                            (activeEvents[0] ? 
                                    <Text style={{...styles.stepTitle,paddingTop:10}}>Esperando Acreditar su Foto!!</Text>
                                :
                                    <QRButton onPress={insertCodeButton}>
                                        <Text>Ingresar Codigo</Text>
                                    </QRButton>
                                
                            )
                    }
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
    },
    title:{
        textAlign:'center',
        fontSize:24,
        fontFamily:'open-sans-bold',
        marginVertical:12,
    },
    howItWorks:{
        width:'100%',
        height:'90%',
        justifyContent:'space-around',
        alignContent:'space-around',
        
    },
    button:{
        height:'5%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
    },
    stepTitle:{
        textAlign:'center',
        fontSize:16,
        fontFamily:'open-sans-bold'
    },
    stepDesc:{
        fontSize:14,
        fontFamily:'open-sans'
    },
})

MainScreen.navigationOptions = navData => {
    return {
        headerTitle: 'MainScreen'
    }
}

export default MainScreen