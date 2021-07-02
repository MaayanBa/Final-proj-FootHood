import React from 'react';
import Main from '../Pages/Main/Main';
import SettingsPage from '../Pages/Main/SettingsPage';
import SendFeedback from '../Pages/Main/SendFeedback';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../Pages/Main/MyProfile';
import EditPersonalDetails from '../Pages/Main/EditPersonalDetails';

const Stack = createStackNavigator();

export default function StackNav_Main() {
    return (
            <Stack.Navigator initialRouteName="Main" screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="SettingsPage" component={SettingsPage} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
                <Stack.Screen name="SendFeedback" component={SendFeedback} />
                <Stack.Screen name="EditPersonalDetails" component={EditPersonalDetails} />
            </Stack.Navigator>
    )
}