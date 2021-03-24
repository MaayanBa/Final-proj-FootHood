import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import StackNav from './Navigations/StackNav';


//The End.......
// "homepage": "http://proj.ruppin.ac.il/bgroup13/Mobile"
export default function App() {
  return (
    <ImageBackground source={require('./assets/WallPaper.png')} style={AppCss.imageBackGround}>
      <StatusBar backgroundColor="transparent" />
      <StackNav />

    </ImageBackground >
  );
}
