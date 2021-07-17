import React from 'react';
import {Image as ImgTimer,Image as ImgPlayers,Image as ImgHomePage,Image as ImgFindGame,Image as ImgMyTeams,} from 'react-native';
import StackNav_Main from './StackNav_Main';
import Players from '../Pages/Players/Players'
import Watches from '../Pages/Timer/Watches';
import StackNav_FindGame from './StackNav_FindGame';
import StackNav_MyTeams from './StackNav_MyTeams'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default function TabNav() {
    return (
        <Tab.Navigator initialRouteName='StackNav_Main'
            tabBarOptions={{
                showIcon: 'true',
                labelStyle: {
                    fontSize: 13,
                    paddingBottom: 3
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
            <Tab.Screen name="Timer" component={Watches}
                options={{
                    tabBarLabel: 'Timer',
                    tabBarIcon: () => (<ImgTimer source={require('../assets/Timer.png')} resizeMode='contain' style={{ width: 48, height: 48 }} />)
                }} />
            <Tab.Screen name="Players" component={Players}
                options={{
                    tabBarLabel: 'Players',
                    tabBarIcon: () => (<ImgPlayers source={require('../assets/Players.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />)
                }} />
            <Tab.Screen name="StackNav_Main" component={StackNav_Main}
                options={{
                    tabBarLabel: 'Home Page',
                    tabBarIcon: () => (<ImgHomePage source={require('../assets/HomePage.png')} resizeMode='contain' style={{ width: 48, height: 48 }} />)
                }} />
            <Tab.Screen name="StackNav_FindGame" component={StackNav_FindGame}
                options={{
                    tabBarLabel: 'Find Game',
                    tabBarIcon: () => (<ImgFindGame source={require('../assets/FindGame.png')} resizeMode='contain' style={{ width: 50, height: 50 }} />)
                }} />
            <Tab.Screen name="StackNav_MyTeams" component={StackNav_MyTeams}
                options={{
                    tabBarLabel: 'My Teams',
                    tabBarIcon: () => (<ImgMyTeams source={require('../assets/MyTeams.png')} resizeMode='contain' style={{ width: 60, height: 60 }} />)
                }} />
        </Tab.Navigator>
    )
}