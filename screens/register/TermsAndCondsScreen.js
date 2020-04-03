import React from 'react'
import { View, Text, StyleSheet, FlatList} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import TermsAndConditions from '../../staticData/terms'
import Colors from '../../constants/Colors'


const TermsAndCondsScreen = props => {
    renderTermPoint = (item) => {
        return(
            <View style={{flex:1,margin:10,flexWrap:'wrap'}}> 
                <Text style={{fontFamily:'open-sans-bold',fontSize:10}}>{item.item.title}</Text>
                <Text style={{fontFamily:'open-sans',fontSize:7,flexWrap:'wrap',}}>{item.item.textito}</Text>
            </View>
        )
    }

    return (
        <View
        style={styles.screen}>
            <LinearGradient colors={[Colors.accent,Colors.dark]} style={styles.gradient}>
                <View style={styles.authContainer}>
                <FlatList 
                    data={TermsAndConditions}
                    renderItem={renderTermPoint}
                    keyExtractor={item => item.id}
                    />
                </View>
            </LinearGradient>
        </View>
    )
}

TermsAndCondsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Términos y Condiciones'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        width: '100%',
        maxHeight: '100%',
    },
    authContainer: {
        width: '90%',
        maxHeight: '90%',
        borderColor: '#f5f5f5',
        borderWidth: 1,
        elevation: 3,
        backgroundColor: 'white',
        marginHorizontal: 20,
        flex: 1,
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default TermsAndCondsScreen