import React from 'react'
import {
    View,
    SafeAreaView,
    Image,
    Text,StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth'

//IMPORT NAVIGATOR STUFF
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

//CUSTOM COMPONENTS
import CustomHeaderButton from '../components/HeaderButton'
import Circle from '../components/Circle'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'


//IMPORT CONSTANTS AND UTILS 
import Colors from '../constants/Colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'


//IMPORT SCREENS
import EventDetailScreen from '../screens/main/EventDetailScreen'
import EventFeedScreen from '../screens/main/EventFeedScreen'
import ProfileScreen from '../screens/main/ProfileScreen'
import LogInSignupScreen from '../screens/register/LogInSignupScreen'
import RegisterScreen from '../screens/register/RegisterScreen'
import StartupScreen from '../screens/StartupScreen'
import FeedbackFormScreen from '../screens/main/FeedbackFormScreen'
import ForgotPasswordScreen from '../screens/register/ForgotPasswordScreen' //forgotPass
import HowToScreen from '../screens/main/HowToScreen'
import HowToScreen2 from '../screens/main/HowToScreen2'
import HowToScreen3 from '../screens/main/HowToScreen3'
import TermsAndCondsScreen from '../screens/register/TermsAndCondsScreen'

//CREATION OF NAVIGATION FLOW

const EventNavigator = createStackNavigator({
    EventFeed: EventFeedScreen,
    EventDetail: EventDetailScreen,
}, {
    navigationOptions:{
        drawerIcon: drawerConfig =>(<Ionicons name='md-list' size={23} color={drawerConfig.tintColor}/>),
    },
    defaultNavigationOptions: ({navigation}) => ({
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerStyle:{
            backgroundColor: Colors.accent
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans-bold' 
        },
        headerTintColor: "black",
        headerTitle: "Eventos",
        headerRight:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
        title="Menu"
        iconName="md-menu"
        onPress={()=>{navigation.toggleDrawer()}}
        />
        </HeaderButtons>,
    }),
})


const HowToScreenNav = createMaterialTopTabNavigator({
    step_1: HowToScreen,
    step_2: HowToScreen2,
    step_3: HowToScreen3,
},{
    tabBarPosition: "bottom",
    tabBarComponent: props => (
        <View style={{
            flexDirection: 'row',
            backgroundColor: Colors.accent,
            alignContent:'center',
            justifyContent:'center'
            }}>
            <Circle hollow={ props.navigation.state.index === 0 }/>
            <Circle hollow={ props.navigation.state.index === 1 }/>
            <Circle hollow={ props.navigation.state.index === 2 }/>
        </View>
      ),
})


const HowToStack = createStackNavigator({
    HowTo: HowToScreenNav,
},{
    navigationOptions:{
        drawerIcon: drawerConfig =>(<Ionicons name='md-list' size={23} color={drawerConfig.tintColor}/>),
    },

    defaultNavigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerStyle: {
            backgroundColor: Colors.accent
        },
        headerBackTitleStyle: {
            fontFamily:'open-sans-bold' 
        },
        headerTintColor: "black",
        headerTitle: "Bianca", //ESTO NO ANDA Y NO SE PORQQUE
        headerRight:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
        title="Menu"
        iconName="md-menu"
        onPress={()=>{navigation.toggleDrawer()}}
        />
        </HeaderButtons>,
    }),
})


const ProfileStack = createStackNavigator({
    Profile: ProfileScreen,
},{
    navigationOptions: {
        drawerIcon: drawerConfig =>(<Ionicons name='md-list' size={23} color={drawerConfig.tintColor}/>),
    },

    defaultNavigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerStyle: {
            backgroundColor: Colors.accent
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans-bold' 
        },
        headerTintColor: "black",
        headerTitle: "Usuario",
        
        headerRight:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
        title="Menu"
        iconName="md-menu"
        onPress={()=>{navigation.toggleDrawer()}}
        />
        </HeaderButtons>,
    }),
})


//materialBottomTab entre Main y perfil
const EventsandProfile = createMaterialBottomTabNavigator({
    HowTo: {
        screen:HowToStack,
        navigationOptions: {
        tabBarColor: Colors.accent,
            tabBarIcon:  ( tabInfo ) => {
                return(
                    <MaterialCommunityIcons 
                    name = 'dog'
                    size = {25}
                    color = {tabInfo.tintColor}
                    />
                )},
        }
    },
    Events: {
        screen: EventNavigator,
        navigationOptions: {
            tabBarColor: Colors.accent,
            tabBarIcon:  ( tabInfo ) => {
                return(
                    <FontAwesome 
                    name = 'tasks'
                    size = {25}
                    color = { tabInfo.tintColor }
                    />
                )},
        }
    },
    Profile: {
        screen:ProfileStack,
        navigationOptions:{
            tabBarColor:Colors.primary,
            tabBarIcon:  (tabInfo) => {
                return(
                    <
                    Ionicons
                    //name = 'user-o'
                    name = 'md-settings'
                    size = {25}
                    color = { tabInfo.tintColor }
                    />
                )},
        },
    }
},{
        initialRouteName: 'Events',
        navigationOptions:{
drawerIcon: drawerConfig =>(<Ionicons name='md-create' size={23} color={drawerConfig.tintColor}/>)
},
    labeled: false,
    activeTintColor: "white",
    shifting: false, //si tengo dos colores de tabBarColor distintos, al hacer shift queda el efecto lindo
    //si lo coloco en false me vuelve al color de tab default, para modificarlo:
    barStyle: {
        backgroundColor:Colors.accent
    }
})

const FeedbackStack = createStackNavigator({
    Feedback: FeedbackFormScreen,
},{
    navigationOptions:{
        drawerIcon: drawerConfig =>(<Ionicons name='md-list' size={23} color={drawerConfig.tintColor}/>),
    },

    defaultNavigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
            fontFamily:'open-sans-bold'
        },
        headerStyle: {
            backgroundColor: Colors.accent
        },
        headerBackTitleStyle: {
            fontFamily:'open-sans-bold' 
        },
        headerTintColor: "black",
        headerTitle: "¡Dejanos tu Reseña!",
        headerRight:  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
        title="Menu"
        iconName="md-menu"
        onPress={ () => { navigation.toggleDrawer() } }
        />
        </HeaderButtons>,
    }),
})


const MainProfileDrawer = createDrawerNavigator({
    ok: EventsandProfile,
    feedback: FeedbackStack,
},{
    contentOptions: {
        activeTintColor: Colors.primary,
    },
    drawerWidth: '50%',
    hideStatusBar: true,
    drawerPosition: 'right',
    contentComponent: props => {
        //ESTO ES COMO UN COMPONENTE COMUN Y CORRIENTE!
        const dispatch = useDispatch()
        return (
            <View style={{
                backgroundColor: Colors.accent,
                height:'100%',
                width:'100%'
                }}>
                <SafeAreaView
                    forceInset={ { top: 'always', horizontal: 'never'} }> 
                        <View style={ { height: '35%', marginTop: 10 } }>
                        <TouchableOpacity 
                        style={ { flex: 1 } } 
                        onPress={ () => { props.navigation.navigate('ok') } }>
                        <Image 
                            style={ styles.image } 
                            source={ require('../staticData/BiancaLogo.png') }/>
                        </TouchableOpacity>
                        </View>
                        <View style={ styles.menuButtonContainer }>
                            <TouchableOpacity  onPress={ ()=> {
                                props.navigation.navigate('feedback')
                            }}>
                            <Text 
                            style={ styles.menuItemText }>
                                Give us Feedback!</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={ styles.menuButtonContainer }>
                           <TouchableOpacity  onPress={ () => {
                               dispatch(authActions.logout())
                                props.navigation.navigate('start')
                            }}>
                                <Text 
                                style={ styles.menuItemText }>
                                    Log Out</Text>
                            </TouchableOpacity>
                        </View>
                </SafeAreaView>
            </View>
        )
    }
})

//Stack navigator creado para poder pasar de mi screen de log in a mi screen de register si hace falta
//Falta darle un formato apropiado
const RegisterOrSignIn = createStackNavigator({
    singIn: LogInSignupScreen,
    register: RegisterScreen,    
    forgotPassword: ForgotPasswordScreen, //forgotPass
    termsAndConds: TermsAndCondsScreen,
},
    
{defaultNavigationOptions: ({ navigation }) => ({
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerStyle: {
        backgroundColor: Colors.primary
    }
})})

const AppAndLoginSignup = createSwitchNavigator({
    start: StartupScreen,
    auth: RegisterOrSignIn,
    app: MainProfileDrawer,
    })

const styles = StyleSheet.create({
    menuButtonContainer: {
        margin: 2,
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 12,
        marginVertical: 7
    },
    menuItemText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    image: {
        width: '100%',
        height: '60%',
        flex: 1,
    },
})


export default createAppContainer(AppAndLoginSignup)