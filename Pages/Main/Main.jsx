import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Header from './Header';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'


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

export default function Main({navigation}) {

    const { state: { token }, tryLocalSignin } = useContext(AuthContext)
    const { GetTeamDetails } = useContext(TeamContext);
    const [user, setUser] = useState(token)
    //const [emailUser, setEmailUser] = useState(token.Email)
    
    useEffect(() => {
       //console.log(navigation)
       //tryLocalSignin()
        console.log("th user email ---> "+user.Email)
        //console.log("th user email ---> "+emailUser)
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
