import React from 'react'
import {
    Modal, 
    Text, 
    Button, 
    TouchableWithoutFeedback,
    StyleSheet, 
    TouchableOpacity,
    View,
    ActivityIndicator,
    Keyboard
} from 'react-native'

import Colors from '../constants/Colors'

const CustomModal = props =>{
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
            props.onClose();
          }}>
            {!props.loading && 
            <TouchableOpacity
            activeOpacity={1}
            onPressOut={ () => { props.onClose() } } 
            style={styles.modal}>
                <TouchableWithoutFeedback>
                    <View style={ styles.container }>
                        <Text style={ styles.title }>{ props.title }</Text>
                        { props.children }
                        <View style={ styles.buttonContainer }>
                        <Button 
                        title={ props.acceptButtonText }
                        color="green"
                        onPress={ () => {
                            Keyboard.dismiss()
                            props.onSend()
                            }}/>
                        <Button
                        title="Cancelar"
                        color="red"
                        onPress={ () => { props.onClose() } }/>
                        </View>
                        {props.errorText && <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{props.errorText}</Text>
                        </View>}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
            }
          </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 150,
        backgroundColor: 'rgba(100,100,100, 0.4)',
    },
    container:{
        width: 260,
        height: 260,
        backgroundColor: 'white',
        elevation: 5,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F5F5F5'
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 10,
    },
    errorContainer:{
        marginVertical: 5,
    },
    errorText:{
        fontFamily: 'open-sans',
        fontSize: 13,
        color: 'red'
    },
    buttonContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginVertical: 5
    }
})


export default CustomModal