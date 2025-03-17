import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/Navigators/AppNavigator';
import {LocationProvider} from './src/Context/LoactionContext';

const App = () => {
  return <AppNavigator />;
};

export default () => (
  <LocationProvider>
    <App />
  </LocationProvider>
);
