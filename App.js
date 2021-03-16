import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import LoginNav from './Navigations/LoginNav';
import AddNewTeam from './Pages/MyTeams/AddNewTeam';


export default function App() {
  return (
    <ImageBackground source={require('./assets/WallPaper.png')} style={AppCss.imageBackGround}>
      <StatusBar backgroundColor="transparent" />
      <LoginNav />
      {/* <AddNewTeam/> */}
    </ImageBackground >
  );
}
