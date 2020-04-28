import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import MyEvent from '../../components/MyEvent'


const ProfileScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>Resumen de tu cuenta</Text>
            <Text>Te presentamos un breve resumen de tu actividad al dia de hoy</Text>
            <Text>Cuantos eventos haz participado</Text>
            <Text>Eventos Realizados y Activos</Text>
            <MyEvent
            text={"Ganate un 30% de descuento en todos los eventos de Bianca!"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
})


export default ProfileScreen