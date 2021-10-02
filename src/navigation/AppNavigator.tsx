import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreditCardScreen from '../screens/CreditCardScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DebitCardScreen from '../screens/DebitCardScreen';
import SpendingLimitScreen from '../screens/SpendingLimitScreen';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Debit">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Debit" component={DebitCardScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Credit" component={CreditCardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="SpendingLimit" component={SpendingLimitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
