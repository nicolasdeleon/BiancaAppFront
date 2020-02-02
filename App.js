//import react and expo stuff
import React, {useState} from 'react';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

//import redux & redux-thunk stuff to enable store actions and reducers
import {createStore, combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

//import reducers for store configuration
import authReducer from './store/reducers/auth'
import eventsReducer from './store/reducers/events'
import userReducer from './store/reducers/user'


//IMPORT NAVIGATOR SCREENS ETC
import MainStack from './navigation/NavigationWindow'

//reudx configurations
const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  user: userReducer
})
//applyMiddleware(ReduxThunk) es mi configuracion para poder mandar asybc requests desde mis actions
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),

  })
}

export default function App() {
  
  const [isFontsLoaded, setIsFontsLoaded] = useState(false)

  if(!isFontsLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{setIsFontsLoaded(true)}}/>
  }

  return (
    <Provider store={store}>
      <MainStack/>
    </Provider>
    );
}


