import React, { useState ,useEffect} from 'react'
import {Text,View,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import QRButton from '../components/QRButton'
import Colors from '../constants/Colors'


const EventStatusIndicator = props => {
    
    const [message,setMessage] = useState('')
    const [showButton,setShowButton] = useState(true)
    const [propButtonFlag,setPropButtonFlag] = useState(true)

    const Funcion = (event,contractList)=>{
        setPropButtonFlag(true)
        if (event == null || contractList.length == 0){
            setShowButton(true)
            return
        }
        if (event.status=="O" || event.status=="F"){
            for (i=0; i<contractList.length; i++){
                contract = contractList[i]
                //comparo por titulo QUE NO ES UNIQUE NO DEBERIA SER ASI pero por ahora lo dejo..
                if (contract.eventTitle == event.title) {
                    //estoy en el evento
                    setPropButtonFlag(false)
                    setShowButton(false)
                    switch (contract.status){
                        case "2BA":
                            setMessage("Esperando Validar su Foto")
                            break;
                        case "W":
                            setMessage(`Felicitaciones, tu foto fue acreditada.\nMuestra ${contract.instaaccount} en mostrador` )
                            break;
                        case "F":
                            setMessage("Muchas gracias por participar.")
                            break;
                    }
                }
            }
        } else if (event.status == "2BO"){
            setShowButton(false)
            setMessage("Este evento no ha arrancado")
        } else if (event.status == "C"){
            setShowButton(false)
            setMessage("Este evento esta cerrado")
        } 
        if (propButtonFlag){
            setShowButton(true)
        }
    }

    useEffect(()=>{
        Funcion(props.event,props.contractList)
    },[Funcion,props.event,props.contractList]) //por dependencia a dispatch solo se me llama una vez

    return(
        <View>
            {showButton && !props.sent ? 
                <QRButton onPress={props.onButtonPress}>
                    <Text style={styles.ingresarCodigoText}>Ingresar Codigo</Text>
                </QRButton>
                :
                <TouchableOpacity onPress={()=>{
                    Alert.alert(
                        'Bianca Info:','- Bianca lo contactara por mail al validar la foto.\n- Tenga en cuenta que @Bianca lo seguira por instagram, corrobore que se encuentra bien la cuenta de Instagram en su perfil.\n- Si todavia no se le indicó que retire su premió, pruebe refrescando la app!\n- El proceso puede demorar hasta 5 minutos',
                        [{text:'Aceptar',style:'cancel',onPress: () => props.onLoadContractsAndEvents()}])
                    }}>  
                <View style={styles.container}>
                        <Text style={styles.messageText}>{message}</Text>
                        <Text style={styles.infoText}>Click aqui para mas información</Text>
                </View>
                </TouchableOpacity>     
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:Colors.primary,
        padding:8,
        borderRadius:10,
    },
    messageText:{
        fontSize:14,
        fontFamily:'open-sans'
    },
    infoText:{
        fontSize:10,
        fontFamily:'open-sans'
    },
    ingresarCodigoText:{
        fontFamily:'open-sans'     
    }
})

export default EventStatusIndicator