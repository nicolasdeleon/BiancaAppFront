import React, { useState, useCallback } from 'react'
import {
    View,
    Easing,
    StyleSheet,
    Animated,
    Text,
    TouchableOpacity,
    Linking,
    Platform
} from 'react-native'

import AwesomeButton from 'react-native-really-awesome-button';

import useAnimation from '../../components/UseAnimaton'
import Colors from '../../constants/Colors';

const StoryWelcome = props =>{

    const [doAppearAnimaton, setAppearAnimaton] = useState(props.active)
    const appearAnimaton = useAnimation({doAnimation: doAppearAnimaton, duration: 500, easing: Easing.linear, callback: ()=>{}, delay: 0})

    const startDesappearAnimation = () => {
        // HERE WITH A CALLBACK I NEED TO FORCE APPEARENCE OF NEXT SCREEN
        props.next()
    }

    const RateUs = useCallback(async () => {
        var url = ''
        if(Platform.OS === 'android') {
            url = 'https://play.google.com/store/apps/details?id=bianca.bianca'
        }
        else if (Platform.OS === 'ios') {
            url = 'https://apps.apple.com/ar/app/bianca/id1500011909'
        }
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
          } else {
            // Alert.alert('Ups! No se pudo abir');
          }
    }, [])


    function DataCheck() {
        return (
            <View style={styles.datacheckContainer}>
                <Text style={styles.beneficioEntregadoText}>
                El beneficio se verá reflejado en tu cuenta de Wabi dentro de los próximos 5 días hábiles{'\n'}{'\n'}
                <Text style={{color:Colors.primary, fontSize:22}}>{props.data4company}</Text>
                </Text>
                <Text style={styles.ponganseEnContacto}>Contactanos a support@biancaapp.com por cualquier consulta</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={styles.Container}>
                <Animated.Text style={{...styles.textGraciasPorUsar}}>Gracias por usar</Animated.Text>
                <Animated.Text style={{...styles.textBianca}}>Bianca</Animated.Text>
            </View>
            {props.eventType != 'A' && <DataCheck/>}
            <Animated.View style={{...styles.Container}}>
                <TouchableOpacity
                    onPress={RateUs}>
                    <Text style={{...styles.textCalificanos}}>Calificar en App Store y Play Store!</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{...styles.Container}}>
                <AwesomeButton 
                    backgroundColor={Colors.primary}
                    borderRadius={20}
                    width={200}
                    backgroundPlaceholder={'#010203'}
                    backgroundDarker={'#010203'}
                    onPress={(next) => {
                        startDesappearAnimation()
                        next()
                    }}>
                    BUSCA OTROS EVENTOS
                </AwesomeButton>
        </Animated.View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute'
    },
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    textGraciasPorUsar: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: 'white',
        marginVertical: 6,
    },
    textBianca: {
        fontSize: 24,
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        color: Colors.primary
    },
    textSiTeGusto: {
        fontSize: 20,
        fontFamily: 'open-sans',
        textAlign: 'center',
        color: 'white'
    },
    textCalificanos: {
        fontSize: 20,
        fontFamily: 'open-sans',
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'white'
    },
    datacheckContainer: {
        marginVertical: 10,
        height: '20%',
        width: '95%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    beneficioEntregadoText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'open-sans',
        margin: 4,
    },
    ponganseEnContacto: {
        color: Colors.silver,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: 'open-sans',
        margin: 4,
    }
});

export default StoryWelcome
