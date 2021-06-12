import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as GameContext } from '../../Contexts/GameContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
import * as Notifications from 'expo-notifications';
import pushNotifications from '../../Services/pushNotifications';

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
    const { state: { gamesList }, GetGamesList } = useContext(GameContext);
    const { GetPlayers } = useContext(PlayerContext);
    const [user, setUser] = useState(token)
    const [renderScreen, setRenderScreen] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        GetPlayers();
        GetTeamDetails(user.Email)
        pushNotifications().then(expoToken => {
            setExpoPushToken(expoToken)
            if (expoToken !== undefined) {
                pushNotificationToken(token.Email, expoToken.data);
            }
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            functionsCases(notification.request.content.data);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            functionsCases(response.notification.request.content.data);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const functionsCases = async (notification) => {
        console.log(notification)
        switch (notification.name) {
            case "newTeamAdded":
                let keyTeam = 0;
                let index = 0;
                console.log(myTeams.length)

                myTeams.map(async (team, i) => {
                    if (team.TeamSerialNum == notification.T_SerialNum) {
                        keyTeam = i;
                        await GetGamesList(myTeams[i].TeamSerialNum)

                        navigation.navigate('StackNav_MyTeams', {
                            screen: 'GameList',
                            params: { key: keyTeam }
                        });
                        // gamesList.map(async (game, key) => {
                        //     console.log(game.GameSerialNum)
                        //     if (game.GameSerialNum == notification.G_SerialNum)
                        //         navigation.navigate('StackNav_MyTeams', {
                        //             screen: 'GameList',
                        //             params: { key: keyTeam }
                        //         });
                        // })
                    }
                });
                // console.log("index = " + index)
                //navigation.navigate('StackNav_MyTeams')
                // navigation.navigate('MyTeams')
                // navigation.navigate('TeamPage', { key: keyTeam })
                // navigation.navigate('GameList', { key: keyTeam })


                return //navigation.navigate('GamePage', { index, keyTeam })



            default:
                return console.log("null")
        }
    }

    // useEffect(() => {
    //     GetPlayers();
    //     GetTeamDetails(user.Email)
    // }, [])

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