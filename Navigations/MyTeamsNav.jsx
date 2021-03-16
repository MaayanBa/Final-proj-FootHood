import React from 'react';
import MyTeams from '../Pages/MyTeams/MyTeams';
import AddNewTeam from '../Pages/MyTeams/AddNewTeam';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MyTeamsNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MyTeams" >
                <Stack.Screen name="MyTeams" component={MyTeams} options={{ headerBackTitleVisible: false, headerShown: false }} />
                <Stack.Screen name="AddNewTeam" component={AddNewTeam} options={{ headerBackTitleVisible: false, headerShown: false }} />
                {/* need to pull all team that the user registerd to and show them in list */}
            </Stack.Navigator>
        </NavigationContainer>

    )
}
