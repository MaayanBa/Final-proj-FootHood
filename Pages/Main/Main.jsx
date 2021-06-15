import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as GameContext } from '../../Contexts/GameContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
import * as Notifications from 'expo-notifications';
import pushNotifications from '../../Services/pushNotifications';
import { setIn } from 'formik';
import  NotificationActions from '../../Services/NotificationActions';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    })
});

export default function Main({ navigation }) {
    const { state: { token }, tryLocalSignin, pushNotificationToken } = useContext(AuthContext)
    const { state: { myTeams }, GetTeamDetails, } = useContext(TeamContext);
    const { state: { gamesList }, GetGamesList,GetGamesPlayerNotRegistered } = useContext(GameContext);
    const { GetPlayers } = useContext(PlayerContext);
    const [user, setUser] = useState(token)
    const [renderScreen, setRenderScreen] = useState(false)
    const [notificationIncome, setNotificationIncome] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState('')
    const notificationListener = useRef();
    const responseListener = useRef();
    const [keyTeam, setKeyTeam] = useState(0);

    useEffect(() => {
        GetTeamDetails(user.Email)
        GetGamesPlayerNotRegistered(user.Email)
        GetPlayers();
       // NotificationActions();
        // pushNotifications().then(expoToken => {
        //     setExpoPushToken(expoToken)
        //     if (expoToken !== undefined)
        //         pushNotificationToken(token.Email, expoToken.data);
        // });

        // notificationListener.current = Notifications.addNotificationReceivedListener(not => {
        //     setNotification(not.request.content.data)
        //     setNotificationIncome(true)
        //     GetTeamDetails(user.Email)
        //     //functionsCases(not.request.content.data);
        // });

        // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //     setNotification(response.notification.request.content.data)
        //     setNotificationIncome(true)
        //     GetTeamDetails(user.Email)
        //     // functionsCases(response.not.request.content.data);
        // });

        // return () => {
        //     Notifications.removeNotificationSubscription(notificationListener.current);
        //     Notifications.removeNotificationSubscription(responseListener.current);
        // };
    }, []);

    // useEffect(() => {
    //     if (notificationIncome) {
    //         // console.log("TEAM-------------->" + myTeams.length)
    //         myTeams.map(async (team, i) => {
    //             if (team.TeamSerialNum == notification.T_SerialNum) {
    //                 setKeyTeam(i)
    //                 GetGamesList(team.TeamSerialNum)
    //             }
    //         })
    //     }
    // }, [myTeams]);

    // useEffect(() => {
    //     if (notificationIncome) {
    //         gamesList.map(async (game, key) => {
    //             if (game.GameSerialNum == notification.G_SerialNum) {
    //                 // console.log("INDEX------> " + key)
    //                 navigation.navigate('StackNav_MyTeams', {
    //                     screen: 'GamePage',
    //                     params: { keyTeam: keyTeam, index: key }
    //                 });
    //             }
    //         })
    //         setNotificationIncome(false)
    //     }
    // }, [gamesList]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //GetTeamDetails(user.Email)
            setRenderScreen(!renderScreen)
            GetPlayers();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [navigation]);



    return (
        <View style={styles.container}>
            <NotificationActions navigation={navigation}/>
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