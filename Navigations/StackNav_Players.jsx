import React from 'react';
import Players from '../Pages/Players/Players'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackNav_Players() {
    return (
        <Stack.Navigator initialRouteName="Players" screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
            <Stack.Screen name="Players" component={Players} />
       </Stack.Navigator>
    )
}