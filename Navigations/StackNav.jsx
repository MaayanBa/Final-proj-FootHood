import React from 'react';
import { View, Text } from 'react-native';
import LoginUser from '../Pages/Login/LoginUser';
import Register from '../Pages/Login/Register';
import ForgotPassword from '../Pages/Login/ForgotPassword';
import TabNav from './TabNav';
import AddNewTeam from '../Pages/MyTeams/AddNewTeam';
import TeamPage from '../Pages/MyTeams/TeamPage';
import CreateNewGame from '../Pages/MyTeams/CreateNewGame';
import TeamDetailsPage from '../Pages/MyTeams/TeamDetailsPage';
import GameList from '../Pages/MyTeams/GameList';

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

export default function StackNav() {
    return (
        <NavigationContainer theme={MyTheme}>
<<<<<<< HEAD
            <Stack.Navigator initialRouteName="LoginUser" screenOptions={{headerBackTitleVisible: false, headerShown: false}}>
=======
            <Stack.Navigator initialRouteName="TabNav" screenOptions={{headerBackTitleVisible: false, headerShown: false}}>
>>>>>>> parent of 2ba5f9b (Merge pull request #2 from Danielgr7/Daniel_Branch)
                <Stack.Screen name="LoginUser" component={LoginUser}/>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="TabNav" component={TabNav} />
                <Stack.Screen name="AddNewTeam" component={AddNewTeam}/>
                <Stack.Screen name="TeamPage" component={TeamPage} />
                <Stack.Screen name="CreateNewGame" component={CreateNewGame} />
                <Stack.Screen name="TeamDetailsPage" component={TeamDetailsPage} />
                <Stack.Screen name="GameList" component={GameList} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
