import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const RealizedPostsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>RealizedPostsScreen</Text>
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

export default RealizedPostsScreen