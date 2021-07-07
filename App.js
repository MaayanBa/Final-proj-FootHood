import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import StackNav from './Navigations/StackNav';
import { Provider as AuthProvider } from './Contexts/AuthContext';
import { Provider as TeamProvider } from './Contexts/TeamContext';
import { Provider as PlayerProvider } from './Contexts/PlayerContext';
import { Provider as GameProvider } from './Contexts/GameContext';
import { Provider as CitiesProvider } from './Contexts/CitiesContext';
import { Provider as EquipmentProvider } from './Contexts/EquipmentContext';
import { Provider as SettingsProvider } from './Contexts/SettingsContext';
import { Provider as JarvisProvider } from './Contexts/JarvisContext';
import { Provider as NewsProvider } from './Contexts/NewsContext';
import pushNotifications from './Services/registerForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';

//import {setNavigator} from './Navigations/navigationRef'
//inside the stack nav ===>   ref={(navigator) => setNavigator(navigator)}

const cssApp = AppCss;
//The End.......
// "homepage": "http://proj.ruppin.ac.il/bgroup13/Mobile"
export default function App() {
  // useEffect(() => {
  //   pushNotifications();
  //   //addlisner
  //   Notifications.addNotificationReceivedListener((notification) => {
  //     console.log(notification)

  //   })
  // })

  return (
    <NewsProvider>
      <JarvisProvider>
        <SettingsProvider>
          <EquipmentProvider>
            <CitiesProvider>
              <PlayerProvider>
                <GameProvider>
                  <TeamProvider>
                    <AuthProvider>
                      <ImageBackground source={require('./assets/WallPaper.png')} style={cssApp.imageBackGround}>
                        <StatusBar />
                        <StackNav />
                      </ImageBackground >
                    </AuthProvider>
                  </TeamProvider>
                </GameProvider>
              </PlayerProvider>
            </CitiesProvider>
          </EquipmentProvider>
        </SettingsProvider>
      </JarvisProvider>
    </NewsProvider>
  );
}
