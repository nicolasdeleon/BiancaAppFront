
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'

import Colors from '../constants/Colors'

const MyEvent = props => {
    return (
    <View style={styles.Container}>
        <View style={styles.imageContainer}>
            <Image style={ styles.image } source={ require('../staticData/BiancaLogo.png') }/>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.beneficioText}>{props.text}</Text>
            <View style={styles.childrenContainer}>
                { props.children }
            </View>
        </View>
    </View>
    )
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 120,
        borderBottomColor: Colors.silver,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '30%'
    },
    infoContainer: {
        height: '100%',
        width: '70%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    beneficioText: {
        fontFamily: 'open-sans',
        textAlign: 'left'
    },
    childrenContainer: {
        marginTop: 20,
    }
});

export default MyEvent