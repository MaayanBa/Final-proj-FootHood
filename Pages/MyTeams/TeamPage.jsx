import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    Text,
    Button,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    View,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat'
import { firebase } from '../../api/FireBase';
import Header from '../Main/Header';
import { Avatar } from 'react-native-paper';
import { Context as TeamContext } from '../../Contexts/TeamContext'


const styles = StyleSheet.create({
    // header: {
    //     paddingTop: 40,
    //     paddingLeft: 30,
    //     paddingRight: 40,
    // },
    container: {
        flex: 1,
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
    TeamInformation_players: {},
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
        fontSize: 32,
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
        height: '55%',
        paddingBottom: 10
    },


})

// const team =
//     {
//         teamName: "Barca",
//         groupPhoto: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
//         teamManager: "Benel",
//         numberOfPlayers: 10,
//         playersInTeam: [
//             {Name: "Maayan"}, {Name: "Benel"}, {Name: "Guy"}, {Name: "Yossi"}, {Name: "Avi"}
//         ]
//     }



const convertToArray = (data) => {
    let res = []
    Object.keys(data).map((key) => {
        let val = data[key]
        res.push({ ...val, createdAt: new Date(val.createdAt) })
    })
    return res
}


export default function TeamPage(props) {
    const { team } = props.route.params;
    const { GetPlayers4Team } = useContext(TeamContext)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages().catch(e => console.log(e))
        // console.log("this is the player list = " + team.PlayersList)
        // console.log(team)
        //GetPlayers4Team(team.PlayersList) -- to check

        
        // setMessages([
        //     {
        //         _id: 1,
        //         text: 'Hello Daniel! I am CR7 and I would like to welcome you to my app!',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 2,
        //             name: 'CR7',
        //             avatar: 'https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg',
        //         },
        //     },
        // ])
    }, [])


    const fetchMessages = async () => {
        try {
            let data = await firebase.database().ref(`${team.TeamSerialNum}`).get()
            if (data.exists()) {
                data = data.exportVal()
                data = convertToArray(data)
                setMessages(data)
            }
        } catch (e) {
            console.log(e)
            return Promise.reject("Failed fetching data")
        }
    }

    useEffect(() => {
        if (!messages || messages.length === 0) return
        updateMessages()
    }, [messages])


    const updateMessages = async () => {
        try {
            let messagesToSave = messages.map((val) => {
                return {
                    ...val,
                    createdAt: val.createdAt.getTime()
                }
            })
            await firebase.database().ref(`${team.TeamSerialNum}`).set(messagesToSave)
            console.log("Updating messages")
        } catch (e) {
            console.log(e)
            return Promise.reject(e + " Failed fetching data")
        }
    }

    const onSend = useCallback((message = []) => {
        console.log("On send")
        setMessages((prev) => {
            let newMessages = [...prev, ...message]
            GiftedChat.append(prev, message)
            return newMessages
        })
    }, [])

    const TeamInformation = () => {
    }

    const ViewGames = () => {
    }


    return (
        //   <SafeAreaView>
        // <ScrollView>
        <View style={styles.container}>
            <TouchableOpacity style={styles.TeamInformation}
                onPress={() => props.navigation.navigate('TeamDetailsPage', { team })}>
                <View style={styles.TeamInformation_Up}>
                    <View style={styles.TeamInformation_Up_Title}>
                        <Text style={styles.txtTeam}> Team</Text>
                        <Text style={styles.txtTeam_Name}>{team.TeamName}</Text>
                    </View>
                    <View style={styles.TeamInformation_Up_imgView}>
                        <Avatar.Image size={100} source={{ uri: team.TeamPicture }} />
                    </View>
                </View>
                <View style={styles.TeamInformation_players}>
                    <Text>Players: {team.PlayersList.length}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CreateNewGame')}
                style={styles.btnTouch}>
                <Text style={styles.txtBtnTouch}>Create New Game</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('GameList')}
                style={styles.btnTouch}>
                <Text style={styles.txtBtnTouch}>View Games</Text>
            </TouchableOpacity>

            <View style={styles.chatContainer}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                        avatar: 'https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg'
                    }}
                    inverted={false}
                />
            </View>
        </View>
    );
}

/* <SafeAreaView> */
/* <ScrollView> */
/* </ScrollView>  */
/* </SafeAreaView> */