import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const EditProfileScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>EditProfileScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        alignContent:'center',
    }
})

export default EditProfileScreen