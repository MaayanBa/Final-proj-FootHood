import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import StackNav from './Navigations/StackNav';
//import {Context as AuthContext} from './Contexts/AuthContext'
import { Provider as AuthProvider } from './Contexts/AuthContext';




//The End.......
// "homepage": "http://proj.ruppin.ac.il/bgroup13/Mobile"
export default function App() {

  return (
    <AuthProvider>
      <ImageBackground source={require('./assets/WallPaper.png')} style={AppCss.imageBackGround}>
        <StatusBar backgroundColor="transparent" />
        <StackNav />
      </ImageBackground >
    </AuthProvider>
  );
}
