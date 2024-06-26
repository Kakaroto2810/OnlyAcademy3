  // App.js

  import 'react-native-gesture-handler';
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { createStackNavigator } from '@react-navigation/stack';
  import Icon from 'react-native-vector-icons/Ionicons';
  import HomeScreen from './HomeScreen';
  import WalletScreen from './WalletScreen';
  import PaymentScreen from './PaymentScreen';
  import LoginScreen from './LoginScreen';
  import supabase from './supabaseClient';

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => <HomeScreen {...props} supabase={supabase} />}
      </Stack.Screen>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
