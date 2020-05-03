
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
            <Text style={styles.title}>{props.title}</Text>
            <Image style={ styles.image } source={{uri:props.image}}/>
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
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        },
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
        width: '80%',
        height: '50%'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '30%'
    },
    infoContainer: {
        height: '100%',
        width: '60%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    beneficioText: {
        fontFamily: 'open-sans',
        textAlign: 'left',
        marginBottom: 8,
    },
    childrenContainer: {
    }
});

export default MyEvent