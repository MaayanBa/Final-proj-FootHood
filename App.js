import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import StackNav from './Navigations/StackNav';
import {TokenProvider} from './Contexts/LoginContext';
import {useLogin, useLoginUpdate} from './Contexts/LoginContext'




//The End.......
// "homepage": "http://proj.ruppin.ac.il/bgroup13/Mobile"
export default function App() {

  const loginData = useLogin();
  const setLoginData = useLoginUpdate();

  return (
    <TokenProvider>
      <ImageBackground source={require('./assets/WallPaper.png')} style={AppCss.imageBackGround}>
        <StatusBar backgroundColor="transparent" />
        <StackNav />
      </ImageBackground >
    </TokenProvider>
  );
}
