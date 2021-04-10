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
import StackNav_MyTeams from './StackNav_MyTeams'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();





export default function TabNav() {
    return (
        <Tab.Navigator initialRouteName='Main'
            tabBarOptions={{
                showIcon: 'true',
                labelStyle: {
                    fontSize: 13,
                    //color:'white'
                },
                activeTintColor: 'orange',
                inactiveTintColor: 'white',
                style: {
                    borderTopWidth: 0,
                    height: 70,
                    backgroundColor: 'transparent',
                    elevation: 0
                },
            }}>
            <Tab.Screen name="Timer" component={Timer}
                //tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'Timer',
                    tabBarIcon: () => (<ImgTimer source={require('../assets/Timer.png')} resizeMode='contain' style={{ width: 48, height: 48 }} />)
                }} />
            <Tab.Screen name="Players" component={Players}
                //tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'Players',
                    tabBarIcon: () => (<ImgTimer source={require('../assets/Players.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />)
                }} />
            <Tab.Screen name="Main" component={Main}
                //tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'Home Page',
                    tabBarIcon: () => (<ImgTimer source={require('../assets/HomePage.png')} resizeMode='contain' style={{ width: 48, height: 48 }} />)
                }} />
            <Tab.Screen name="FindGame" component={FindGame}
                //tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'Find Game',
                    tabBarIcon: () => (<ImgTimer source={require('../assets/FindGame.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />)
                }} />
            <Tab.Screen name="StackNav_MyTeams" component={StackNav_MyTeams}
                //tabBarOptions={showIcon = true}
                options={{
                    tabBarLabel: 'My Teams',
                    tabBarIcon: () => (<ImgTimer source={require('../assets/MyTeams.png')} resizeMode='contain' style={{ width: 60, height: 60 }} />)
                }} />
                {/* <Stack.Screen name="AddNewTeam" component={AddNewTeam}/> */}
     
        </Tab.Navigator>
    )
}