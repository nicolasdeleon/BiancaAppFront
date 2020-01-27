import React,{useState} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'

//https://www.npmjs.com/package/react-native-ratings
import {AirbnbRating } from 'react-native-ratings';

import Colors from '../../constants/Colors';
import {useSelector} from 'react-redux'


const FeedbackFormScreen = props => {

    const [fluidez,setFluidez] = useState(3)
    const [atencion,setAtencion] = useState(3)
    const [pago,setPago] = useState(3)
    const [general,setGeneral] = useState(3)
    const userToken = useSelector(state=>state.auth.token)

    const submitHandler = async () =>{
        const promedio = (fluidez + atencion + pago + general)/4
        const response = await fetch(
            'https://biancaapp-ndlc.herokuapp.com/api/accounts/feedback'
            ,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userToken}`
                },
                body: JSON.stringify({
                    puntaje_promedio: promedio,
                    puntaje_fluidez: fluidez,
                    puntaje_atencion: atencion,
                    puntaje_pago: pago,
                    puntaje_general: general
                })
            })        
       props.navigation.navigate('ok')
    }

    return (
        <View style={styles.screen}>    
        <ScrollView style={styles.scrollParam} justifyContent='space-around'>
            <View style={styles.ratingContainer}>
            <Text style={styles.titleText}>Fluidez</Text>
            <AirbnbRating
            ratingCount={10}
            reviews={['Keh','Soportable','Okok','Piola!','Buenísima']}
            size={18}
            selectedColor={Colors.primary}
            reviewColor={Colors.accent}
            reviewSize={18}
            onFinishRating={value=>setFluidez(value)}
            />
            </View>

            <View style={styles.ratingContainer}>
            <Text style={styles.titleText}>Atencion</Text>
            <AirbnbRating
            ratingCount={10}
            reviews={['Altos Vagos','Regular','Buena','Unos Capos','Broditas']}
            size={18}
            selectedColor={Colors.primary}
            reviewColor={Colors.accent}
            reviewSize={18}
            onFinishRating={value=>setAtencion(value)}
            />
            </View>

            <View style={styles.ratingContainer}>
            <Text style={styles.titleText}>Pago</Text>
            <AirbnbRating
            ratingCount={10}
            reviews={['Malisimo','Esperaba otra cosa','Okok','Buen formato','Excelente']}
            size={18}
            selectedColor={Colors.primary}
            reviewColor={Colors.accent}
            reviewSize={18}
            onFinishRating={value=>setPago(value)}
            />
            </View>

            <View style={styles.ratingContainer}>
            <Text style={styles.titleText}>General</Text>
            <AirbnbRating
            ratingCount={10}
            reviews={['Dedicate a otra Cosa','Puede ser','Normal','Alta idea','Callese y tome mi dinero']}
            size={18}
            selectedColor={Colors.primary}
            reviewColor={Colors.accent}
            reviewSize={18}
            onFinishRating={value=>setGeneral(value)}
            />
            </View>
            
            <View style={styles.submitButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={submitHandler}>
                <Text style={{fontSize:20,color:'white'}}>Submit!</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    scrollParam:{
        width:'100%',
        height:'100%',
        flex:1,
        flexGrow:1
    },
    titleText:{
        fontSize:22,
    },
    ratingContainer:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-around',
        alignItems:'center',
        width:'100%',
        padding:5,
    },
    submitButtonContainer:{
        alignContent:'center',
        alignItems:'center',
        padding:5,
        overflow:'hidden',
        padding:5,
    },
    button:{
        backgroundColor:Colors.accent,
        width:'35%',
        height:40,
        borderRadius:10,
        padding:5,
        alignItems:'center',
        alignContent:'center'
    }


})

export default FeedbackFormScreen