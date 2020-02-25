import React from 'react'
import {View,StyleSheet,Text,ActivityIndicator,Image} from 'react-native'
import Colors from '../constants/Colors';
import EventStatusIndicator from '../components/EventStatusIndicator'


const EventDetail = props =>{
    return (
        <View style={styles.screen}>
            {props.loading ? (<ActivityIndicator size='large' color={Colors.primary}/>) : 
                <View style={{flex:1,width:'100%',height:'100%'}}>
                    
                    <View style={styles.detail}>

                        <View style={styles.eventTitleContainer}>
                            <Text style={styles.eventTitleText}>{props.event.title}</Text>
                        </View>

                        <View style={styles.eventDescriptionContainer}>
                            <Text style={styles.eventDescText}>{props.event.desc}</Text>
                        </View>

                        <View style={styles.eventStatusContainer}>
                            <Text style={styles.eventStatusTitleText} >Estado del evento:</Text>
                            <EventStatusIndicator
                                showEventStatus = {true}
                                event = {props.event}
                                sent = {props.sentCode}
                                onButtonPress = {props.insertCodeButton}
                                contractList = {props.activeContracts}
                                onLoadContractsAndEvents = {props.loadContractsAndEvents}
                            />

                        </View>
                        <Image 
                            style={styles.image} 
                            source={require('../staticData/BiancaLogo.png')}/>
                    </View>
                    
                    <View style={styles.button}>
                        <EventStatusIndicator
                            sent = {props.sentCode}
                            onButtonPress = {props.insertCodeButton}
                            event = {props.event}
                            contractList = {props.activeContracts}
                            onLoadContractsAndEvents = {props.loadContractsAndEvents} 
                        />
                    </View>
                
                </View>
            }
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detail: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
    },
    eventTitleContainer: {
        width: '80%',
        marginTop: 20,
        marginBottom: 10,
        borderColor: Colors.primary,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderTopLeftRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    eventDescriptionContainer: {
        width: '85%',
        marginVertical: 10,
        marginLeft: '5%',
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    eventStatusContainer: {
        width: '85%',
        height: '20%',
        marginVertical: 10,
        marginLeft: '5%',
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    eventTitleText: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'open-sans-bold'
    },
    eventDescText: {
        fontSize: 14,
        fontFamily: 'open-sans'
    },
    eventStatusTitleText: {
        textAlign: 'center',
        color: Colors.primary,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
    },
    button: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: '40%',
        flex: 1,
    },
});

export default EventDetail

