import React from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import TermsAndConditions from '../../staticData/terms'
import Colors from '../../constants/Colors'

const TermsAndCondsScreen = props => {

    renderTermPoint = (item) => {
      //  console.log(item.item.textito)
        return(
               // <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'justify',marginVertical:5, width:"90%"}}>
                <View>
                    <Text style={{fontFamily:'open-sans'}}>{item.item.title} </Text>
                    <Text style={{fontFamily:'open-sans'}}>{item.item.textito}</Text>
                </View>
        )
    }

    return (
        <View
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <LinearGradient colors={[Colors.accent,Colors.dark]} style={styles.gradient}>
                <View style={styles.authContainer}>
                <FlatList 
                    data={TermsAndConditions}
                    renderItem={renderTermPoint}
                    keyExtractor={item => item.id}
                    //style={{marginVertical:5}}
                    />
                </View>
            </LinearGradient>
        </View>
    )
}


TermsAndCondsScreen.navigationOptions = (navData) => {
    return{
        headerTitle: 'Términos y Condiciones'
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
    },
    authContainer:{
      //  width:'95%',
        maxHeight:'90%',
        padding:5,
        borderColor:'#f5f5f5',
      //  borderWidth:1,
      //  elevation:3,
        backgroundColor:'white'
    },
    cartItem: {
        padding:10,
        backgroundColor:"white",
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center',
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContainer:{
        marginTop:10,
    }
})


export default TermsAndCondsScreen