import React, { useState ,useEffect} from 'react'
import {Text,View,StyleSheet} from 'react-native'
import QRButton from '../components/QRButton'
import Colors from '../constants/Colors'


const EventStatusIndicator = props => {
    
    const [message,setMessage] = useState('')
    const [showButton,setShowButton] = useState(false)

    const Funcion = (event,contractList)=>{
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
                    setShowButton(false)
                    switch (contract.status){
                        case "2BA":
                            setMessage("Esperando Validar su Foto")
                            break;
                        case "W":
                            setMessage(`Felicitaciones, tu foto fue acreditada.
                            \rRetira con el siguiente codigo ${contract.winer_code}` )
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
    }

    useEffect(()=>{
        Funcion(props.event,props.contractList)
    },[Funcion,props.event,props.contractList]) //por dependencia a dispatch solo se me llama una vez

    return(
        <View>
            {showButton && !props.sent ? 
                <QRButton onPress={props.onButtonPress}>
                    <Text>Ingresar Codigo</Text>
                </QRButton>
                :   
                <View style={styles.container}>
                        <Text>{message}</Text>
                    <Text>@Biancaapp lo seguira por Instagram</Text>    
                </View>     
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:Colors.primary,
        padding:12,
        borderRadius:10,
        
    }
})

export default EventStatusIndicator