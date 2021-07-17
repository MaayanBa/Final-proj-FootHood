import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, ActivityIndicator, LogBox } from 'react-native';
import Header from './Header';
import News from './News';
import TodaysGame from './TodaysGame';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as GameContext } from '../../Contexts/GameContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
import * as Notifications from 'expo-notifications';
import NotificationActions from '../../Services/NotificationActions';
import { Dimensions } from 'react-native';
import Modal_Alert from '../Modal_Alert';

LogBox.ignoreLogs([
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    })
});

export default function Main({ navigation }) {
    const { state: { token }, getSettingNotifications, StartTimer } = useContext(AuthContext)
    const { state: { leaveTeamAlert }, GetTeamDetails, ClearLeaveAlert } = useContext(TeamContext);
    const { state: { registeredAtList1Game }, GetTodaysGame, CleanTodaysGame, CheckIfRegisterd2AnyGame } = useContext(GameContext);
    const { GetPlayers } = useContext(PlayerContext);
    const [user, setUser] = useState(token)
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1300);
        StartTimer();
    }, [])

    useEffect(() => {
        if (!registeredAtList1Game) {
            CleanTodaysGame();
        }
    }, [registeredAtList1Game])

    useEffect(() => {
        if (leaveTeamAlert !== '') {
            Alert("You have left the team successfully!")
            ClearLeaveAlert()
        }
    }, [leaveTeamAlert])

    const Alert = (message) => {
        setAlertText(message)
        setAlertModalVisible(true)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            CheckIfRegisterd2AnyGame(token.Email)
            GetTodaysGame(token.Email)
            GetTeamDetails(user.Email)
            GetPlayers();
            getSettingNotifications();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [navigation]);

    return (
        <View style={styles.container}>
            {loading ?
                <View style={styles.loading}>
                    <ActivityIndicator size={80} color="#0000ff" style={{ alignItems: 'center' }} />
                </View>
                : <>
                    {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
                    <NotificationActions navigation={navigation} />
                    {token == null ? null : <Header navigation={navigation} />}
                    <TodaysGame />
                    <News />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        paddingTop: 40
    },
    loading: {
        marginTop: 200
    },
});