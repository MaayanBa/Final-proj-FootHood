import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import News from './News';
import TodaysGame from './TodaysGame';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as GameContext } from '../../Contexts/GameContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
import * as Notifications from 'expo-notifications';
import NotificationActions from '../../Services/NotificationActions';
import XMLParser from 'react-xml-parser';
import TextTicker from 'react-native-text-ticker'
import { Dimensions } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    })
});

export default function Main({ navigation }) {
    const { state: { token }, tryLocalSignin, pushNotificationToken, getSettingNotifications } = useContext(AuthContext)
    const { state: { myTeams }, GetTeamDetails, } = useContext(TeamContext);
    const { GetTodaysGame } = useContext(GameContext);
    const { GetPlayers } = useContext(PlayerContext);
    const [user, setUser] = useState(token)
    const [renderScreen, setRenderScreen] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetTodaysGame(token.Email)
            setRenderScreen(!renderScreen)
            GetTeamDetails(user.Email)
            GetPlayers();
            getSettingNotifications();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <NotificationActions navigation={navigation} />
            <Header navigation={navigation} />
            <TodaysGame />
            <News />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        paddingTop: 40
    },
    title: {
        alignItems: 'center',
        padding: 40,
        color: 'white',
        fontSize: 40,
    },
});