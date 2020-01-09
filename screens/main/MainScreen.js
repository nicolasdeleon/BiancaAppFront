import React,{useState,useCallback, useEffect} from 'react'
import {View,Text,StyleSheet,FlatList,ActivityIndicator,StatusBar, Keyboard} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import STEPS from '../../staticData/comoFuncionaSteps'
import Card from '../../components/Card'
import InsertCode from '../../components/CustomModal'
import EventStatusIndicator from '../../components/EventStatusIndicator'
import * as EventActions from '../../store/actions/events'
import * as AuthActions from '../../store/actions/auth'
import Input from '../../components/Input'


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
        },[setCodeValueHandler,setCodeValue,setModalValidity,codeValue])

    insertCodeButton = () => { 
        setModalVisible(true)
    }
    LogOutHandler = () => {
        dispatch(AuthActions.logout())
        props.navigation.navigate('start')
    }
    
    closeInsertCode = () => {
        setModalVisible(false)
    }

    sendInsertCode = async () => {
        console.log("------------------------------DEBUG-------------------------------")+
        console.log(modalValidity)
        console.log(codeValue)

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
            console.log(codeValue)
            setError('Invalid form credentials')
        }
    }

    DEBUG_PRINTS_TO_CONSOLE =() => {
        console.log("ACTIVE EVENTS:")
        console.log(activeEvents)
        console.log("USER ACTIVE CONTRACTS")
        console.log(activeContracts)
    }

    DEBUG_PRINTS_TO_CONSOLE()

    return (
        
        <View style={styles.screen} >
            <StatusBar backgroundColor={Colors.dark} barStyle={"light-content"} translucent={false}/>
            <View style={{flex:1}}> 
                <InsertCode
                modalVisible={modalVisible} 
                onClose={closeInsertCode}
                onSend={sendInsertCode}
                title={"Inserte Código del Local"}
                acceptButtonText={"Activar"}
                errorText={error}
                loading={isLoading}>
                <Input
                maxLength={5}
                min={5}
                desiredLength={5} 
                initialValue ={"....."}
                fontSize={24}
                textAlign='center'
                onInputChange={setCodeValueHandler}
                autoCapitalize={'characters'}
                />
                </InsertCode>
                <View style={styles.howItWorks}>
                    <View style={{borderBottomWidth:1,borderBottomColor:"#dddddd"}}>
                    <Text style={styles.title}>Camino de Canje</Text>
                    </View>
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
        headerTitle: 'Bianca'
    }
}

export default MainScreen