
import React, { useState, useCallback, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'

import Colors from '../constants/Colors'
import ProgressBar from 'react-native-progress/Bar'
import { useSelector, useDispatch } from 'react-redux'

const MyEvent = props =>{
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const activeContracts = useSelector( state => state.events.activeContracts )
    const dispatch = useDispatch()
        //status post
    //('2BA', 'To_be_accepted'),
    //('W', 'Winner'),
    //('F', 'Finished'),
    //('R', 'Refused')
    const loadContracts = useCallback(async () =>{
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(EventActions.getActiveContracts())
        } catch (err){
            setError(err.message)
        }
        setIsLoading(false)
    },[dispatch, setIsLoading, setError])

    useEffect( () => {
        let mounted = true
        loadContracts()
        /*if(props.currentStatus === '2BA'){
            console.log("2BA")
            setProgress(0.50)
            if (props.currentStatus === "N" || props.currentStatus === "R" ) {
                setProgress(1)
            } else {
                
            }
        }*/
        return () => false
    },[dispatch, loadContracts])

    return (
    <View style={styles.Container}>
        <View style={styles.imageContainer}>
            <Image style={ styles.image } source={ require('../staticData/BiancaLogo.png') }/>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.beneficioText}>{props.text}</Text>
            <ProgressBar
                            style={styles.progress}
                            progress={progress}
                            //indeterminate={this.state.indeterminate}
                        />
        </View>
    </View>
    )
};

const styles = StyleSheet.create({
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
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '30%'
    },
    infoContainer: {
        height: '100%',
        width: '70%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    beneficioText: {
        fontFamily: 'open-sans',
        textAlign: 'left'
    },
    progress: {
        fontFamily: 'open-sans',
        textAlign: 'left',
        marginVertical: 6,
    },
    progress: {
      margin: 1,
    }, 
});

export default MyEvent