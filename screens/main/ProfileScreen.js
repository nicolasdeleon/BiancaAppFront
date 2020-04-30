import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import MyEvent from '../../components/MyEvent'
import ProgressBar from 'react-native-progress/Bar'
import Colors from '../../constants/Colors'

const ProfileScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.resumenContainer}>
                <Text style={styles.actividadTitle}>Te dejamos un breve resumen de tu actividad</Text>
            </View>
            <View style={styles.eventosContainer}>
                <Text style={styles.actividadTitle}>Eventos Realizados y Activos</Text>
                <View style={{flex:1, width:'100%'}}>
                    <MyEvent
                    text={"Ganate un 30% de descuento en todos los eventos de Bianca!"}>
                        <Text style={styles.stepText}>Ultimo paso! Introduce tu telefono</Text>
                        <ProgressBar style={styles.progress} width={200} color={Colors.dark} progress={0.7}/>
                    </MyEvent>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    resumenContainer: {
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30%'
    },
    eventosContainer: {
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70%'
    },
    actividadTitle: {
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    },
    progress: {
    },
    stepText: {
        marginBottom: 6,
        fontFamily: 'open-sans'
    }
})


export default ProfileScreen
