import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import StackNav from './Navigations/StackNav';
import { Provider as AuthProvider } from './Contexts/AuthContext';
import { Provider as TeamProvider } from './Contexts/TeamContext';



//The End.......
// "homepage": "http://proj.ruppin.ac.il/bgroup13/Mobile"
export default function App() {

  return (
    <TeamProvider>
      <AuthProvider>
        <ImageBackground source={require('./assets/WallPaper.png')} style={AppCss.imageBackGround}>
          <StatusBar backgroundColor="transparent" />
          <StackNav />
        </ImageBackground >
      </AuthProvider>
    </TeamProvider>
  );
}
