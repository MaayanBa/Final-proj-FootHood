import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
// import { firebase } from '../../api/FireBase'

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

export default function Main({ navigation }) {

    const { state: { token }, tryLocalSignin } = useContext(AuthContext)
    const { state: { myTeams }, GetTeamDetails } = useContext(TeamContext);
    const { GetPlayers } = useContext(PlayerContext);

    const [user, setUser] = useState(token)
    const [renderScreen, setRenderScreen] = useState(false)
    //const [emailUser, setEmailUser] = useState(token.Email)

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
                <Header />
                <Text style={styles.title}>"Main page"</Text>
            </View>
            <View style={styles.mainContent}></View>
            <View style={styles.footer}></View>
        </View>
    )
}
