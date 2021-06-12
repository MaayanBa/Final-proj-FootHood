import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import AppCss from './CSS/AppCss';
import StackNav from './Navigations/StackNav';
import { Provider as AuthProvider } from './Contexts/AuthContext';
import { Provider as TeamProvider } from './Contexts/TeamContext';
import { Provider as PlayerProvider } from './Contexts/PlayerContext';
import { Provider as GameProvider } from './Contexts/GameContext';
import { Provider as CitiesProvider } from './Contexts/CitiesContext';
import { Provider as EquipmentProvider } from './Contexts/EquipmentContext';
import pushNotifications from './Services/pushNotifications';

//import {setNavigator} from './Navigations/navigationRef'
//inside the stack nav ===>   ref={(navigator) => setNavigator(navigator)}

const cssApp = AppCss;
//The End.......
// "homepage": "http://proj.ruppin.ac.il/bgroup13/Mobile"

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   })
// });

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   pushNotifications().then(token => setExpoPushToken(token));

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     functionsCases(notification.request.content.data.name);
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     functionsCases(response.notification.request.content.data.name);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);


  // const functionsCases = async (response) => {
  //   console.log(response)
  // }


  return (
    <EquipmentProvider>
      <CitiesProvider>
        <PlayerProvider>
          <GameProvider>
            <TeamProvider>
              <AuthProvider>
                <ImageBackground source={require('./assets/WallPaper.png')} style={cssApp.imageBackGround}>
                  {/* {console.log(expoPushToken.data)} */}
                  <StatusBar />
                  <StackNav />
                </ImageBackground >
              </AuthProvider>
            </TeamProvider>
          </GameProvider>
        </PlayerProvider>
      </CitiesProvider>
    </EquipmentProvider>


  );
}
