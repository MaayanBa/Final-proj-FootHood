import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { firebase } from '../../api/FireBase';
import { Avatar } from 'react-native-paper';
import AppCss from '../../CSS/AppCss';
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';
// import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import NotificationActions from '../../Services/NotificationActions';
import TextTickerRow from '../Main/TextTickerRow';


export default function TeamPage(props) {

    const { key } = props.route.params;
    const { state: { myTeams, teamPlayers,loadMessages }, setTeamPlayers, GetTeamDetails, SendMessageTeamChat } = useContext(TeamContext);
    const { state: { gamesList }, GetGamesList, GameRegisterd, GetAmountRegisteredPlayersEachGame } = useContext(GameContext);
    const { state: { players } } = useContext(PlayerContext);
    const [messages, setMessages] = useState([]);
    const { state: { token } } = useContext(AuthContext)
    const [user, setUser] = useState(token)
    const team = myTeams[key];

    useEffect(() => {
        setTeamPlayers(myTeams[key], players);
        fetchMessages().catch(e => console.log(e))
        GetGamesList(myTeams[key].TeamSerialNum)
        GetAmountRegisteredPlayersEachGame(myTeams[key].TeamSerialNum)
        //GameRegisterd(user.Email,myTeams[key].TeamSerialNum);
    }, [])

    useEffect(() => {
        fetchMessages().catch(e => console.log(e))
    }, [loadMessages])

    const convertToArray = (data) => {
        let res = []
        Object.keys(data).map((key) => {
            let val = data[key]
            res.push({ ...val, createdAt: new Date(val.createdAt) })
        })
        return res
    }

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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            await GetTeamDetails(token.Email)

            await setTeamPlayers(myTeams[key], players);
            await GetAmountRegisteredPlayersEachGame(myTeams[key].TeamSerialNum)

        });
        return () => unsubscribe();
    }, [props.navigation, myTeams]);


    const updateMessages = async () => {
        try {
            let messagesToSave = messages.map((val) => {
                return {
                    ...val,
                    createdAt: val.createdAt.getTime()
                }
            })
            await firebase.database().ref(`${myTeams[key].TeamSerialNum}`).set(messagesToSave)
            await AsyncStorage.setItem(`messages_count_${myTeams[key].TeamSerialNum}`, `${messagesToSave.length}`)
            //console.log("Updating messages")
        } catch (e) {
            console.log(e)
            return Promise.reject(e + " Failed fetching data")
        }
    }

    const onSend = useCallback((message = []) => {
        // console.log("On send")
        setMessages((prev) => {
            let newMessages = [...prev, ...message]
            GiftedChat.append(prev, message)
            console.log(message[message.length - 1]);
            SendMessageTeamChat(user.Email, myTeams[key].TeamSerialNum, myTeams[key].TeamName, user.FirstName, message[message.length - 1].text, message[message.length - 1].createdAt)
            return newMessages
        })
    }, [])

    const PrintNameOfPlayers = () => {
        let names = '';
        let counter = 0;
        teamPlayers.forEach(p => {
            if (counter < 5)
                names += p.FirstName + ", "
            else if (counter === 5)
                names += p.FirstName + "... "
            counter++;
        });
        return names;
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <NotificationActions navigation={props.navigation} />
                {myTeams.length ==0  ? null :
                    <View style={[appCss.container, styles.container_extra]}>
                        <TouchableOpacity style={styles.TeamInformation}
                            onPress={() => props.navigation.navigate('TeamDetailsPage', { key })}>
                            <View style={styles.TeamInformation_Up}>
                                <View style={styles.TeamInformation_Up_Title}>
                                    <Text style={styles.txtTeam}> Team</Text>
                                    <Text style={styles.teamName_txt}>{myTeams[key].TeamName}</Text>
                                </View>
                                <View style={styles.TeamInformation_Up_imgView}>
                                    <Avatar.Image size={100} source={{ uri: myTeams[key].TeamPicture }} />
                                </View>
                            </View>
                            <View style={styles.TeamInformation_players}>
                                <Text style={{ fontWeight: 'bold' }}>Players: </Text>
                                <Text>{PrintNameOfPlayers()}</Text>
                            </View>
                        </TouchableOpacity>

                        {team.EmailManager == user.Email ?
                            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CreateNewGame', { team })}
                                style={[appCss.btnTouch, styles.btnTouch_extra]}>
                                <Text style={appCss.txtBtnTouch}>Create New Game</Text>
                            </TouchableOpacity>
                            : null}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('GameList', { gamesList, key })}
                            style={[appCss.btnTouch, styles.btnTouch_extra]}>
                            <Text style={appCss.txtBtnTouch}>View Games</Text>
                        </TouchableOpacity>
                        <View style={[styles.chatContainer, { height: team.EmailManager == user.Email ? Dimensions.get('window').height - 392 : Dimensions.get('window').height - 332 }]}>
                            <GiftedChat
                                messages={messages}
                                onSend={messages => onSend(messages)}
                                user={{
                                    _id: user.Email,
                                    name: user.FirstName,
                                    avatar: user.PlayerPicture
                                }}
                                inverted={false}
                            // scrollToBottom={true}
                            />
                        </View>
                        <TextTickerRow navigation={props.navigation}/>
                    </View>
                }
            </ScrollView>
        </SafeAreaView >
    );
}


const appCss = AppCss;
const styles = StyleSheet.create({
    container_extra: {
        paddingTop: 50,
        alignItems: 'center',
        flex: 1,
    },
    TeamInformation: {
        backgroundColor: '#D9D9D9',
        padding: 15,
        width: '90%',
        borderRadius: 30,
    },
    TeamInformation_Up: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    TeamInformation_players: { flexDirection: 'row-reverse' },
    TeamInformation_Up_imgView: {
        width: 10,
        height: 100
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
    teamName_txt: {
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: "bold",
    },
    btnTouch_extra: {
        marginTop: 15,
        width: '90%'
    },
    chatContainer: {
        width: Dimensions.get('window').width - 20,
        // height: team.EmailManager == user.Email ? Dimensions.get('window').height - 320:Dimensions.get('window').height - 370,
        // flexDirection:'row',
        // alignSelf:'flex-end'
        // paddingBottom: 40,

        // top:40,
    },

})