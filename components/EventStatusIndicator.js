import React, { useState, useEffect} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'
import QRButton from '../components/QRButton'
import Colors from '../constants/Colors'


const EventStatusIndicator = props => {

    const [message,setMessage] = useState('')
    const [showButton,setShowButton] = useState(true)
    const [propButtonFlag,setPropButtonFlag] = useState(true)

    const Funcion = (event,contractList)=>{
        setPropButtonFlag(true)
        if (event == null){
            setMessage("No hay eventos activos")
            setShowButton(false)
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
                        case "R":
                            setMessage("Acercate a un personal de Bianca")
                            break;
                    }
                }
            }
            if (propButtonFlag && event.status=="F"){
                setMessage("Este evento ya no acepta cupos")
                setShowButton(false)
            } else if (propButtonFlag){
                setShowButton(true)
                }
        } else if (event.status == "2BO"){
            setShowButton(false)
            setMessage("Este evento no ha arrancado")
        } else if (event.status == "C"){
            setShowButton(false)
            setMessage("Este evento esta cerrado")
        }
    }

    const EventStatusFunction = (event) => {
        setShowButton(false)
        if (event.status === 'O'){
            setMessage("Este evento esta abierto y acepta inscripciones!")
        } else if(event.status == 'F'){
            setMessage("Este evento finalizo. No se aceptan mas inscripciones")
        } else if (event.status === '2BO')
            setMessage("Esperando abrir evento. Mantenete alerta!")
        else if (event.status === "C"){
            setMessage("Evento Cerrado")
        }else {
            setMessage("?")
        }
    }

    useEffect(()=>{
        if(props.showEventStatus){
            EventStatusFunction(props.event)
        }else {
            Funcion(props.event,props.contractList)
        }
    },[Funcion,props.event,props.contractList])


    if(props.showEventStatus){
        return(
            <View style={styles.screen}>
                <Text style={styles.messageText}>{message}</Text>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            {showButton ? 
                <QRButton onPress={props.onButtonPress}/>
                :
                <View style={styles.container}>
                <TouchableOpacity onPress={()=>{
                    Alert.alert(
                        'A tener en cuenta:','- @Bianca lo seguira por instagram, corrobore que se encuentra bien la cuenta de Instagram en su perfil.\n- Si todavia no se le indicó que retire su premió, pruebe refrescando la app!\n- El proceso puede demorar unos minutos',
                        [{text:'Aceptar',style:'cancel',onPress: () => props.onLoadContractsAndEvents()}])
                    }}>  
                <View style={styles.container}>
                        <Text style={styles.messageText}>{message}</Text>
                        <Text style={styles.infoText}>Click aqui para mas información</Text>
                </View>
                </TouchableOpacity>
                </View>     
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }, 
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 10,
    },
    messageText: {
        fontSize: 14,
        fontFamily: 'open-sans'
    },
    infoText: {
        fontSize: 10,
        fontFamily: 'open-sans'
    },
    ingresarCodigoText: {
        fontFamily: 'open-sans'
    }
})

export default EventStatusIndicator