import React, { useState, useEffect, useContext, useRef } from 'react';
import { Context as AuthContext } from '../Contexts/AuthContext';
import { Context as TeamContext } from '../Contexts/TeamContext';
import { Context as GameContext } from '../Contexts/GameContext';
import * as Notifications from 'expo-notifications';
import pushNotifications from '../Services/pushNotifications'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    })
});

export default function NotificationActions({navigation}) {
    const { state: { token }, pushNotificationToken } = useContext(AuthContext)
    const { state: { myTeams }, GetTeamDetails, } = useContext(TeamContext);
    const { state: { gamesList }, GetGamesList } = useContext(GameContext);
    const [notificationIncome, setNotificationIncome] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState('')
    const notificationListener = useRef();
    const responseListener = useRef();
    const [keyTeam, setKeyTeam] = useState(0);

    useEffect(() => {
        pushNotifications().then(expoToken => {
            setExpoPushToken(expoToken)
            if (expoToken !== undefined)
                pushNotificationToken(token.Email, expoToken.data);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(not => {
            setNotification(not.request.content.data)
            setNotificationIncome(true)
            GetTeamDetails(token.Email)
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            setNotification(response.notification.request.content.data)
            setNotificationIncome(true)
            GetTeamDetails(token.Email)
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (notificationIncome) {
            // console.log("TEAM-------------->" + myTeams.length)
            myTeams.map(async (team, i) => {
                if (team.TeamSerialNum == notification.T_SerialNum) {
                    setKeyTeam(i)
                    GetGamesList(team.TeamSerialNum)
                }
            })
        }
    }, [myTeams]);

    useEffect(() => {
        if (notificationIncome) {
            gamesList.map(async (game, key) => {
                if (game.GameSerialNum == notification.G_SerialNum) {
                    // console.log("INDEX------> " + key)
                    navigation.navigate('StackNav_MyTeams', {
                        screen: 'GamePage',
                        params: { keyTeam: keyTeam, index: key }
                    });
                }
            })
            setNotificationIncome(false)
        }
    }, [gamesList]);

    return (
        <>
        </>
    )
}