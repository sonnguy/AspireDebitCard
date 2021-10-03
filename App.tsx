import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <AppNavigator />
    </Provider>
  );
};

export default App;
