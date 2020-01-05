import React,{useState,useCallback, useEffect} from 'react'
import {View,Text,StyleSheet,FlatList,ActivityIndicator,StatusBar} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import STEPS from '../../staticData/comoFuncionaSteps'
import Card from '../../components/Card'
import InsertCode from '../../components/CustomModal'
import EventStatusIndicator from '../../components/EventStatusIndicator'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'


const MainScreen = props => {

    //VARIABLES STORED IN COMPONENT STATE

    const [modalVisible,setModalVisible] = useState(false)
    const [codeValue, setCodeValue] = useState('')
    const [error,setError] = useState()
    const [sentCode,setSentCode] = useState(false)
    const [modalValidity,setModalValidity] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [eventMsj,setEventMsj] = useState()
    const userToken = useSelector(state=>state.auth.token)
    const activeEvents = useSelector(state=>state.events.activeEvents)
    const activeContracts = useSelector(state=>state.events.activeContracts)
    const dispatch = useDispatch()

    //FUNCTION THAT LOADS CONTRACTS AND EVENTS
    const loadContractsAndEvents = useCallback(async () =>{
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(EventActions.getActiveEvents())
            await dispatch(EventActions.getActiveContracts(userToken))
        } catch (err){
            setError(err.message)
        }
        setIsLoading(false)
    },[dispatch,setIsLoading,setError])

    //FUNTION THAT RUNS LOAD CONTRACTS AND EVENTS
    useEffect(()=>{
            loadContractsAndEvents()
            console.log('yes')
    },[dispatch,loadContractsAndEvents]) //por dependencia a dispatch solo se me llama una vez

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',()=>{
            loadContractsAndEvents() 
        })
        return () => {
            willFocusSub.remove()
        }
    },[loadContractsAndEvents])
    
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
                setSentCode(true)
                closeInsertCode()
                loadContractsAndEvents()
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

    DEBUG_PRINTS_TO_CONSOLE =() => {
        //console.log('Valores del Modal:')
        //console.log(codeValue)
        //console.log(modalValidity)
        //console.log(error)
        console.log("ACTIVE EVENTS:")
        console.log(activeEvents)
        console.log("USER ACTIVE CONTRACTS")
        console.log(activeContracts)
    }

    DEBUG_PRINTS_TO_CONSOLE()

    return (
        
        <View style={styles.screen} >
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
                    <Text style={styles.title}>Camino de Canje</Text>
                    <FlatList
                        onRefresh={loadContractsAndEvents}
                        refreshing={isLoading}
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
                        <EventStatusIndicator
                            sent={sentCode}
                            onButtonPress={insertCodeButton}
                            event={activeEvents[activeEvents.length-1]}
                            contractList={activeContracts}
                            onLoadContractsAndEvents={loadContractsAndEvents} 
                        />
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