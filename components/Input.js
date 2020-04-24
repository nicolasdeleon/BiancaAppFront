import React, {useState,useReducer,useEffect} from 'react'
import {View,Text,TextInput,StyleSheet, Keyboard,TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons as Icon } from '@expo/vector-icons'

const INPUT_CHANGE = "INPUT_CHANGE"
const INPUT_BLUR = "INPUT_BLUR"

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        case INPUT_BLUR:
            return { 
                ...state,
                touched: true,
            }
        default:
            return state;
    }
}

const Input = props =>{
    const [inputState, dispatch] = useReducer(inputReducer,{
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false, 
    })

    const [iconName,setIconName] = useState("eye-off") //visualizar password
    const [secureTextPassword,changeSecureTextPassword] = useState(props.secureTextEntry) //visualizar password

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const telRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.tel && !telRegex.test(text.toLowerCase())) {
        isValid = false
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }
        if(props.email)
            text = text.trim();
        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid,
        })
    }

    const lostFocusHandler = () => {
        dispatch({
            type: INPUT_BLUR,
        })
    }

    const {onInputChange, id} = props
    useEffect(()=>{
        if (inputState.touched){
            onInputChange(id, inputState.value,inputState.isValid)
        }
    },[inputState, onInputChange, id])

    useEffect(()=>{
        if(props.desiredLength == inputState.value.length){
            Keyboard.dismiss()
            onInputChange(id, inputState.value,inputState.isValid)
        }
    })


    const changeIconName= async () =>{
        if (iconName == "eye-off"){
        setIconName("eye")
        changeSecureTextPassword(false)
        
        }
        else {
            setIconName("eye-off")
            changeSecureTextPassword(true)
        }
    }

    return (
    <View style={styles.formControl}>
        <Text style={styles.label}>{props.label}</Text>
        <View style={{flexDirection: "row"}}>
            <TextInput
                {...props} 
                style={{...styles.input, ...props.style}}
                secureTextEntry = {secureTextPassword}
                value= {inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {(id=="password" || id=="password2"|| id=="old_password") &&
            <TouchableOpacity onPress={changeIconName}>
                <Icon name={iconName} size={25}/>
            </TouchableOpacity>
            }
        </View>
        {!inputState.isValid && inputState.touched && <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
            </View>}
    </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    input: {
        flex: 1,
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        fontFamily: 'open-sans'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        fontFamily: 'open-sans',
        fontSize: 13,
        color: 'red'
    }
})


export default Input