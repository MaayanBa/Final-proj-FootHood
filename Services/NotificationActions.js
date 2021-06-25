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

export default function NotificationActions({ navigation }) {
    const { state: { token }, pushNotificationToken } = useContext(AuthContext)
    const { state: { myTeams, loadMessages }, GetTeamDetails, LoadMessages } = useContext(TeamContext);
    const { state: { gamesList }, GetGamesList } = useContext(GameContext);
    const [notificationIncome, setNotificationIncome] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState('')
    const notificationListener = useRef();
    const responseListener = useRef();
    const [keyTeam, setKeyTeam] = useState(0);
    const [receivedAction, setReceivedAction] = useState(false)
    const [responsedAction, setResponsedAction] = useState(false)

    useEffect(() => {
        pushNotifications().then(expoToken => {
            setExpoPushToken(expoToken)
            if (expoToken !== undefined)
                pushNotificationToken(token.Email, expoToken.data);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(not => {
            if (not.request.content.data.name === "message") {
                // console.log("loadMessages" +loadMessages)
                // loadMessages?LoadMessages(false) :LoadMessages(true); 
                LoadMessages(not.request.content.data.CreatedAt)
                console.log(not.request.content.data)
            }
            else {
                setReceivedAction(true)
                setNotification(not.request.content.data)
                setNotificationIncome(true)
                GetTeamDetails(token.Email)
            }
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            setResponsedAction(true)
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
            if (notification.name == "RemoveFromTeam" && notification.T_SerialNum === -1) {
                if (receivedAction) {
                    navigation.navigate('StackNav_MyTeams');
                    setNotificationIncome(false)
                }
                setReceivedAction(false)
                setResponsedAction(false)
            }
            else {
                // console.log("TEAM-------------->" + myTeams.length)
                myTeams.map(async (team, i) => {
                    if (team.TeamSerialNum == notification.T_SerialNum) {
                        setKeyTeam(i)
                        if (notification.G_SerialNum != undefined)
                            GetGamesList(team.TeamSerialNum)
                        if (notification.name == "message") {
                            if (responsedAction) {
                                navigation.navigate('StackNav_MyTeams', { screen: 'TeamPage', params: { key: i } });
                                setResponsedAction(false)
                                setNotificationIncome(false)
                            }
                        }
                        if (notification.name == "AcceptRequesta") {
                            if (receivedAction) {
                                navigation.navigate('StackNav_MyTeams', { screen: 'TeamPage', params: { key: i } });
                                setNotificationIncome(false)
                            }
                        }

                        setReceivedAction(false)
                    }
                })
            }
        }
    }, [myTeams]);

    useEffect(() => {
        if (notificationIncome) {
            gamesList.map(async (game, key) => {
                if (game.GameSerialNum == notification.G_SerialNum) {
                    if (responsedAction) {
                        // console.log("INDEX------> " + key)
                        navigation.navigate('StackNav_MyTeams', {
                            screen: 'GamePage',
                            params: { keyTeam: keyTeam, index: key }
                        });
                        setResponsedAction(false)
                    }
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