import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import StackNav from './Navigations/StackNav';
import { Provider as AuthProvider } from './Contexts/AuthContext';
import { Provider as TeamProvider } from './Contexts/TeamContext';
import { Provider as PlayerProvider } from './Contexts/PlayerContext';
//import {setNavigator} from './Navigations/navigationRef'
//inside the stack nav ===>   ref={(navigator) => setNavigator(navigator)}

const cssApp = AppCss;
//The End.......
// "homepage": "http://proj.ruppin.ac.il/bgroup13/Mobile"
export default function App() {

  return (
    <PlayerProvider>
      <TeamProvider>
        <AuthProvider>
          <ImageBackground source={require('./assets/WallPaper.png')} style={cssApp.imageBackGround}>
            <StatusBar />
            <StackNav />
          </ImageBackground >
        </AuthProvider>
      </TeamProvider>
    </PlayerProvider>

  );
}
