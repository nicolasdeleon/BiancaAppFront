import React from 'react'
import {
    View,
    SafeAreaView,
    Image,
    Text,StyleSheet,
    TouchableOpacity
} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
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
import { HeaderButtons, Item } from 'react-navigation-header-buttons'


//IMPORT CONSTANTS AND UTILS 
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'


//IMPORT SCREENS
import EventDetailScreen from '../screens/main/EventDetailScreen'
import EventFeedScreen from '../screens/main/EventFeedScreen'
import ProfileScreen from '../screens/main/ProfileScreen'
import ConfigScreen from '../screens/main/ConfigScreen'
import LogInSignupScreen from '../screens/register/LogInSignupScreen'
import RegisterScreen from '../screens/register/RegisterScreen'
import StartupScreen from '../screens/StartupScreen'
import ForgotPasswordScreen from '../screens/register/ForgotPasswordScreen' //forgotPass
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
            fontFamily: 'open-sans-bold',
        },
        headerStyle:{
            backgroundColor: Colors.accent,
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

const ConfigStack = createStackNavigator({
    Config: ConfigScreen,
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
        headerTitle: "Mi perfil",

        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
        headerTitle: "Actividad",

        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
    Events: {
        screen: EventNavigator,
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
    Profile: {
        screen:ProfileStack,
        navigationOptions:{
            tabBarColor:Colors.primary,
            tabBarIcon:  (tabInfo) => {
                return(
                    <FontAwesome
                    name = 'bell-o'
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


const MainProfileDrawer = createDrawerNavigator({
    ok: EventsandProfile,
    config: ConfigStack,
},{
    contentOptions: {
        activeTintColor: Colors.primary,
    },
    drawerWidth: '38%',
    hideStatusBar: true,
    drawerPosition: 'right',
    contentComponent: props => {
        //ESTO ES COMO UN COMPONENTE COMUN Y CORRIENTE!
        const dispatch = useDispatch()
        return (
            <View style={{
                backgroundColor: Colors.accent,
                alignItems:'center',
                height:'100%',
                width:'100%'
                }}>
                <SafeAreaView
                    forceInset={ { top: 'always', horizontal: 'never'} }> 
                        <View style={styles.imageContainer}>
                            <Image style={ styles.image } source={ require('../staticData/BiancaLogo.png') }/>
                        </View>
                        <View style={ styles.menuButtonContainer }>
                            <TouchableOpacity  
                                style={{marginVertical: 6}}
                                onPress={ () => {
                                    props.navigation.navigate('Events')
                                }}>
                                <Text style={ styles.menuItemText }>Eventos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  
                                style={{marginVertical: 6}}
                            onPress={ () => {
                                props.navigation.navigate('config')
                            }}>
                                <Text style={ styles.menuItemText }>Mi Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  
                            style={{marginVertical: 20}}
                            onPress={ () => {
                                dispatch(authActions.logout())
                                    props.navigation.navigate('start')
                                }}>
                                    <Text style={ styles.menuItemText }>Salir</Text>
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
    imageContainer: {
        height: '35%',
        alignItems:'center',
        marginTop: 15,
        borderBottomColor: Colors.silver,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    menuButtonContainer: {
        margin: 2,
        alignItems: 'center',
        marginLeft: 12,
        marginVertical: 7
    },
    menuItemText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    image: {
        width: 115,
        height: 115,
        flex: 1,
    },
})


export default createAppContainer(AppAndLoginSignup)