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
import colors from '../styles/colors';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let image = require('../assets/images/home-icon.png');
          switch (route.name) {
            case 'Debit':
              image = require('../assets/images/debit-icon.png');
              break;
            case 'Payment':
              image = require('../assets/images/payment-icon.png');
              break;
            case 'Credit':
              image = require('../assets/images/credit-icon.png');
              break;
            case 'Profile':
              image = require('../assets/images/profile-icon.png');
              break;
            default:
              break;
          }
          return <Image source={image} />;
        },
        tabBarActiveTintColor: colors.secondary,
        headerShown: false,
      })}
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
