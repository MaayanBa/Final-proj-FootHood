import React from 'react';
import FindGame from '../Pages/FindGame/FindGame'
import HotGames from '../Pages/FindGame/HotGames'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackNav_FindGame() {
    return (
        <Stack.Navigator initialRouteName="FindGame" screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
            <Stack.Screen name="FindGame" component={FindGame} />
            <Stack.Screen name="HotGames" component={HotGames} />
       </Stack.Navigator>
    )
}