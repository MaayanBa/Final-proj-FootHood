import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import Header from './Header';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
// import { firebase } from '../../api/FireBase'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from '../../Services/registerForPushNotificationsAsync'



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function Main({ navigation }) {

    const { state: { token }, tryLocalSignin } = useContext(AuthContext)
    const { state: { myTeams }, GetTeamDetails } = useContext(TeamContext);
    const { GetPlayers } = useContext(PlayerContext);

    const [user, setUser] = useState(token)
    const [renderScreen, setRenderScreen] = useState(false)
    //const [emailUser, setEmailUser] = useState(token.Email)
    // const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();

    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //         setNotification(notification);
    //         console.log("recieve")
    //         console.log(notification.request.content.data)
    //         // console.log(notificationListener.current)
    //     });

    //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log("response")
    //         console.log(response);
    //     });

    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    // }, []);

    // // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
    // async function sendPushNotification(expoPushToken) {
    //     const message = {
    //         to: expoPushToken,
    //         sound: 'default',
    //         title: 'Original Title',
    //         body: 'And here is the body ya manyak!',
    //         data: { someData: 'goes here' },
    //     };

    //     await fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(message),
    //     });
    // }

    useEffect(() => {

        //console.log(navigation)
        //tryLocalSignin()
        //console.log("th user email ---> "+user.Email)
        //console.log("th user email ---> "+emailUser)
        //=================אולי צריך להחזיר את השורה למטה
        //GetTeamDetails(user.Email)
        GetPlayers();
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //GetTeamDetails(user.Email)
            setRenderScreen(!renderScreen)
            GetPlayers();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [navigation]);

    useEffect(() => {
        GetTeamDetails(user.Email)
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header navigation={navigation} />
                <Text style={styles.title}>"Main page"</Text>
            </View>
            {/* <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                <Text>Your expo push token: {expoPushToken}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification && notification.request.content.title} </Text>
                    <Text>Body: {notification && notification.request.content.body}</Text>
                    <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                </View>
                <Button
                    title="Press to schedule a notification"
                    onPress={async () => {
                        await schedulePushNotification();
                    }}
                />
            </View> */}
            <View style={styles.mainContent}></View>
            <View style={styles.footer}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        alignItems: 'center',
        padding: 40
    },
    title: {
        alignItems: 'center',
        padding: 40,
        color: 'white',
        fontSize: 40,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
});