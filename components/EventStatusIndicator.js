import React, { useState } from 'react'
import {Text,View} from 'react-native'
import QRButton from '../../components/QRButton'


const EventStatusIndicator = props => {
    
    const [message,setMessage] = useState('')
    const [showButton,setShowButton] = useState(false)

    const Funcion = (event,contractList)=>{
        if (event.status=="O" || event.status=="F"){
            for (contract in contractList){
                //comparo por titulo QUE NO ES UNIQUE NO DEBERIA SER ASI pero por ahora lo dejo..
                if (contract.title == event.title) {
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
            //Si no estoy en el contrato
            setShowButton(true)
        } else if (event.status == "2B0"){
            setMessage("Este evento no ha arrancado")
        } else if (event.status == "C"){
            setMessage("Este evento esta cerrado")
        }

    }

    return(
        <View></View>
    )

}

export default EventStatusIndicator