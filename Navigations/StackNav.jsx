import React, { useContext } from 'react';
import NewLoginUser from '../Pages/Login/NewLoginUser';
import Register from '../Pages/Login/Register';
import ForgotPassword from '../Pages/Login/ForgotPassword';
import TabNav from './TabNav';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Context as AuthContext } from '../Contexts/AuthContext';

const Stack = createStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};
export default function StackNav() {
    const { state } = useContext(AuthContext);

    return (
        <NavigationContainer theme={MyTheme}>
            
            <Stack.Navigator initialRouteName="NewLoginUser" screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
                {
                    state.token === null ?
                        <>
                            <Stack.Screen name="NewLoginUser" component={NewLoginUser} />
                            <Stack.Screen name="Register" component={Register} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                        </> :
                        <>
                            <Stack.Screen name="TabNav" component={TabNav} />
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>

    )
}
