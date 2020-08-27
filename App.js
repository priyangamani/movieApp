
import React from 'react';
import AppNavigator from './src/AppNavigator'
import rootReducers from './src/reducers'
import { createStore, applyMiddleware } from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
  whitelist: ['user'],
}


const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = createStore(persistedReducer,{}, applyMiddleware(reduxThunk))
let persistor = persistStore(store)

const App = () => {
  return (
    <Provider store={store}>
       <PersistGate  persistor={persistor}>
      <AppNavigator/>
      </PersistGate>
      </Provider>
  );
};



export default App;
