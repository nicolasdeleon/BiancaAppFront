import React from 'react'
import {View,StyleSheet,Text,Platform,TouchableOpacity,TouchableNativeFeedback,ActivityIndicator,Image} from 'react-native'
import Colors from '../constants/Colors';
import EventStatusIndicator from '../components/EventStatusIndicator'


const EventItem = props =>{
    let TouchableCmp = TouchableOpacity
    if(Platform.OS === 'android' && Platform.Version>=21){
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <View style={styles.event}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                </View>
            </TouchableCmp>
        </View>
    )
};


const styles = StyleSheet.create({
    event:{
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        height: 300,
        margin: 20,
        overflow: 'hidden',
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        marginVertical:4,
    },
    textContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:'15%',
        padding:10,
    }
});

export default EventItem

