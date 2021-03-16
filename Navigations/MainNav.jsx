import React from 'react';
import {
    View, Text, ImageBackground,
    Image as ImgTimer,
    Image as ImgPlayers,
    Image as ImgHomePage,
    Image as ImgFindGame,
    Image as ImgMyTeams
} from 'react-native';
import Main from '../Pages/Main/Main';
import Timer from '../Pages/Timer/Timer';
import Players from '../Pages/Players/Players';
import FindGame from '../Pages/FindGame/FindGame';
import MyTeams from '../Pages/MyTeams/MyTeams';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function MainNav() {
    return (
        <Tab.Navigator initialRouteName='Main'>
            <Tab.Screen name="Timer" component={Timer}
                tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'Timer',
                    tabBarIcon: ({ tintColor }) =>
                        (<ImgTimer source={require('../assets/Timer.png')} resizeMode='contain' style={{ width: 48, height: 48 }} />)
                }} />
            <Tab.Screen name="Players" component={Players} 
            tabBarOptions={showIcon = true}
            options={{
                tabBarLabel: 'Players',
                tabBarIcon: ({ tintColor }) =>
                    (<ImgTimer source={require('../assets/Players.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />)
            }} />
            <Tab.Screen name="Main" component={Main} tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'Home Page',
                    tabBarIcon: ({ tintColor }) =>
                        (<ImgTimer source={require('../assets/HomePage.png')} resizeMode='contain' style={{ width: 48, height: 48 }} />)
                }} />
            <Tab.Screen name="FindGame" component={FindGame} tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'Find Game',
                    tabBarIcon: ({ tintColor }) =>
                        (<ImgTimer source={require('../assets/FindGame.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />)
                }} />
            <Tab.Screen name="MyTeams" component={MyTeams} tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'My Teams',
                    tabBarIcon: ({ tintColor }) =>
                        (<ImgTimer source={require('../assets/MyTeams.png')} resizeMode='contain' style={{ width: 60, height: 60 }} />)
                }} />
        </Tab.Navigator>
    )
}