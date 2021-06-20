import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as GameContext } from '../../Contexts/GameContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
import * as Notifications from 'expo-notifications';
import NotificationActions from '../../Services/NotificationActions';

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
    const { state: { gamesList }, GetGamesList,  } = useContext(GameContext);
    const { GetPlayers } = useContext(PlayerContext);
    const [user, setUser] = useState(token)
    const [renderScreen, setRenderScreen] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRenderScreen(!renderScreen)
            GetTeamDetails(user.Email)
            GetPlayers();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <NotificationActions navigation={navigation} />
            <View style={styles.header}>
                <Header navigation={navigation} />
                <Text style={styles.title}>"Main page"</Text>
            </View>
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