import React from 'react';
import AddNewTeam from '../Pages/MyTeams/AddNewTeam';
import TeamPage from '../Pages/MyTeams/TeamPage';
import CreateNewGame from '../Pages/MyTeams/CreateNewGame';
import TeamDetailsPage from '../Pages/MyTeams/TeamDetailsPage';
import GameList from '../Pages/MyTeams/GameList';
import MyTeams from '../Pages/MyTeams/MyTeams';

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

export default function StackNav_MyTeams() {
    return (
       
            <Stack.Navigator initialRouteName="MyTeams" screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
                <Stack.Screen name="AddNewTeam" component={AddNewTeam} />
                <Stack.Screen name="MyTeams" component={MyTeams} />
                <Stack.Screen name="TeamPage" component={TeamPage} />
                <Stack.Screen name="CreateNewGame" component={CreateNewGame} />
                <Stack.Screen name="TeamDetailsPage" component={TeamDetailsPage} />
                <Stack.Screen name="GameList" component={GameList} />
            </Stack.Navigator>
       

    )
}
