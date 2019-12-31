import React, { useState } from 'react'
import {Text,View} from 'react-native'
import QRButton from 'QRButton'


const EventStatusIndicator = props => {
    
    const [message,setMessage] = useState('')
    const [showButton,setShowButton] = useState(true)

    const Funcion = (event,contractList)=>{
        if (event.status=="O" || event.status=="F"){
            for (contract in contractList){
                //comparo por titulo QUE NO ES UNIQUE NO DEBERIA SER ASI pero por ahora lo dejo..
                if (contract.eventTitle == event.title) {
                    //estoy en el evento
                    setShowButton(false)
                    switch (contract.status){
                        case "2BA":
                            setMessage("Esperando Acreditar su Foto!!")
                        case "W":
                            setMessage(`Felicitaciones, tu foto fue acreditada. \n
                            Retira con el siguiente codigo ${contract.winnerCode}` )
                        case "F":
                            setMessage("Muchas gracias por participar.")
                    }
                }
            }
        } else if (event.status == "2B0"){
            setMessage("Este evento no ha arrancado")
        } else if (event.status == "C"){
            setMessage("Este evento esta cerrado")
        }
    }

    Funcion(props.event,props.contractList)

    return(
        <View>
            {showButton ? 
                <QRButton onPress={props.onButtonPress}>
                    <Text>Ingresar Codigo</Text>
                </QRButton>
                :  
                <Text>{message}</Text>   
            }
        </View>
    )
}

export default EventStatusIndicator