// import { useContext } from 'react';
// import { Context as AuthContext } from '../Contexts/AuthContext';
// import * as Permissions from 'expo-permissions'
// // import * as Notification from 'expo-permissions'
// // import { Notification } from 'expo';
// import * as Notifications from 'expo-notifications';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default async () => {
//     //const {state: { token },pushNotificationToken } = useContext(AuthContext);

//     let previousTokenDate = await AsyncStorage.getItem('pushTokenDate');

//     // if (previousTokenDate == new Date().toLocaleDateString())
//     //     return;

//     // else {
//     let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     //console.log(status)
//     if (status !== 'granted')
//         return;

//     let token = await Notifications.getExpoPushTokenAsync();
//     //pushNotificationToken(token.Email,token.data);
//     AsyncStorage.setItem('pushTokenDate', new Date().toLocaleDateString());
//     //}
// }