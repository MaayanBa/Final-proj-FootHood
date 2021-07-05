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
    const { state: { gamesList }, GetGamesList, GetTodaysGame } = useContext(GameContext);
    const { GetPlayers } = useContext(PlayerContext);
    const [user, setUser] = useState(token)
    const [renderScreen, setRenderScreen] = useState(false)
    // const [titles, setTitles] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetTodaysGame(token.Email)
            setRenderScreen(!renderScreen)
            GetTeamDetails(user.Email)
            GetPlayers();
            getSettingNotifications();
            // GetNews();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [navigation]);

    // const GetNews = () => {
    //     let title = [];
    //     fetch('https://www.one.co.il/cat/coop/xml/rss/newsfeed.aspx?c=3')
    //         .then(res => res.text())
    //         .then(data => {
    //             var XMLParser = require('react-xml-parser');
    //             var xml = new XMLParser().parseFromString(data);
    //             // console.log(xml);
    //             // console.log(xml.getElementsByTagName('title'));
    //             headers = xml.getElementsByTagName('title')
    //             headers.map(x => {
    //                 if (x.value != "ONE") {
    //                     // console.log(x.value)
    //                     // console.log("===============")
    //                     title.push(x.value);
    //                 }
    //             })
    //             setTitles(title)

    //         })
    //         .catch(err => console.log(err));

    // }

    return (
        <View style={styles.container}>
            <NotificationActions navigation={navigation} />
            <View style={styles.header}>
                <Header navigation={navigation} />
                <TodaysGame />
                {/* <Text style={styles.title}>"Main page"</Text> */}
            </View>
            <View style={styles.mainContent}>
                <News/>
            </View>
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