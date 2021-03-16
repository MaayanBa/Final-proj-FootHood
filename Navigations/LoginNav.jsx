import React from 'react';
import { View, Text } from 'react-native';
import LoginUser from '../Pages/Login/LoginUser';
import Register from '../Pages/Login/Register';
import ForgotPassword from '../Pages/Login/ForgotPassword';
import MainNav from './MainNav';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      //primary: 'rgb(255, 45, 85)',
      background: 'transparent',
      
    },
    
  };

export default function LoginNav() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName="MainNav" >
                <Stack.Screen name="LoginUser" component={LoginUser} options={{headerBackTitleVisible: false, headerShown: false}} />
                <Stack.Screen name="Register" component={Register}options={{headerBackTitleVisible: false, headerShown: false}} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerBackTitleVisible: false, headerShown: false}} />
                <Stack.Screen name="MainNav" component={MainNav} options={{headerBackTitleVisible: false, headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}
