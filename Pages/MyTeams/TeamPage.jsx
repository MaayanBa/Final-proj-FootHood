import React, { useState, useEffect, useCallback } from 'react';
import { Text, Button, StyleSheet, ScrollView, SafeAreaView, Image, View, StatusBar, TouchableOpacity } from 'react-native';

import { Card, Title, Paragraph } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat'
import TabNav from '../../Navigations/TabNav';
import Header from '../Main/Header';
import { Avatar } from 'react-native-paper';


const styles = StyleSheet.create({
    // header: {
    //     paddingTop: 40,
    //     paddingLeft: 30,
    //     paddingRight: 40,
    // },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width: '100%',
        paddingTop: 70,
        alignItems: 'center'

    },

    TeamInformation: {
        backgroundColor: '#D9D9D9',
        padding: 15,
        width: '90%',
        borderRadius: 30,
        //alignContent:''
    },
    TeamInformation_Up: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',

    },
    TeamInformation_players: {

    },
    TeamInformation_Up_imgView: {
        width: 10,
        height: 140
    },
    teamImg: {
        borderRadius: 30
    },
    TeamInformation_Up_Title: {
        justifyContent: 'flex-start',
        width: 250

    },
    txtTeam: {
        alignSelf: 'center',
        paddingBottom: 5,
        fontWeight: "bold",
    },
    txtTeam_Name: {
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: "bold",

    },
    btnTouch: {
        elevation: 8,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        width: '90%'
    },
    txtBtnTouch: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    chatContainer: {
        width: '90%',
        height: '60%',
        paddingBottom: 10
    },


})

const team =
{
    teamName: "Barca",
    groupPhoto: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
    teamManager: "Benel",
    numberOfPlayers: 10,
    playersInTeam: [
        { Name: "Maayan" }, { Name: "Benel" }, { Name: "Guy" }, { Name: "Yossi" }, { Name: "Avi" }
    ]
}

export default function TeamPage(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello Daniel! I am CR7 and I would like to welcome you to my app!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'CR7',
                    avatar: 'https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const TeamInformation = () => { }

    const ViewGames = () => { }



    return (
        //   <SafeAreaView>
        // <ScrollView> 
        <View style={styles.container}>
            <TouchableOpacity style={styles.TeamInformation} onPress={()=>props.navigation.navigate('TeamDetailsPage')}>
                <View style={styles.TeamInformation_Up}>
                    <View style={styles.TeamInformation_Up_Title}>
                        <Text style={styles.txtTeam}> Team</Text>
                        <Text style={styles.txtTeam_Name}>{team.teamName}</Text>
                    </View>
                    <View style={styles.TeamInformation_Up_imgView}>
                        <Avatar.Image size={100} source={{ uri: team.groupPhoto }} />
                    </View>
                </View>
                <View style={styles.TeamInformation_players}>
                    <Text>Players:</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CreateNewGame')} style={styles.btnTouch}>
                <Text style={styles.txtBtnTouch}>Create New Game</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() =>props.navigation.navigate('GameList')} style={styles.btnTouch}>
                <Text style={styles.txtBtnTouch}>View Games</Text>
            </TouchableOpacity>

            <View style={styles.chatContainer}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        </View>
    );
}

/* <SafeAreaView> */
/* <ScrollView> */
/* </ScrollView>  */
/* </SafeAreaView> */