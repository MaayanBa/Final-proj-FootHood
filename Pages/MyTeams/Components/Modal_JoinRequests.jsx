import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalJoinRequests, Pressable, Image, ImageBackground, ScrollView
} from 'react-native';
import { AntDesign as MailIcon, AntDesign as PlusIcon, Feather as RequestAction } from '@expo/vector-icons';
import AppCss from '../../../CSS/AppCss';
import { Avatar, ListItem, Badge } from 'react-native-elements';
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as AuthContext } from '../../../Contexts/AuthContext';
import Modal_Alert from '../../Modal_Alert';

export default function Modal_JoinRequests(props) {
    const [requestsModalVisible, setRequestsModalVisible] = useState(false);
    const { state: { joinRequests }, GetJoinRequests, GetTeamDetails } = useContext(TeamContext);
    const { state: { players } } = useContext(PlayerContext);
    const { DeleteRequest, ApproveRequest, GetPlayers4Game } = useContext(GameContext);
    const { state: { token } } = useContext(AuthContext)
    const [badge, setBadge] = useState(0);
    const [alertModalVisible, setAlertModalVisible] = useState(false);

    useEffect(() => {
        GetJoinRequests(props.game, players)
        setBadge(joinRequests.length)
    }, [])

    useEffect(() => {
        setBadge(joinRequests.length)
    }, [joinRequests])

    const DeleteRequests = async (player) => {
        await DeleteRequest(player.Email, props.game.GameSerialNum, props.game.TeamSerialNum);
        await GetJoinRequests(props.game, players);
    }
    const ApproveRequests = async (player) => {
        await ApproveRequest(player.Email, props.game.GameSerialNum);
        await GetJoinRequests(props.game, players);
        await GetPlayers4Game(props.game.GameSerialNum, players);
        GetTeamDetails(token.Email);
    }

    const PlayerCard = (p) => {
        props.navigation.navigate('CardPlayer', { p })
        setRequestsModalVisible(!requestsModalVisible)
    }

    const joinRequestsList = joinRequests.map((p, i) => (
        <ListItem key={i} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
            <TouchableOpacity onPress={() => DeleteRequests(p)}>
                <RequestAction name="x" size={25} color="red" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ApproveRequests(p)}>
                <RequestAction name="check" size={25} color="green" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => PlayerCard(p)} >
                <Image style={[appCss.playerCardIcon_Btn, { left: 5 }]} source={require('../../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>

            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>
    ))


    const modal_JoinRequests = <ModalJoinRequests animationType="slide"
        transparent={true} visible={requestsModalVisible}
        onRequestClose={() => setRequestsModalVisible(!requestsModalVisible)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modal_View}>
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
                    <Text style={[styles.modal_Txt, appCss.inputLabel, { marginTop: 10 }]}>Join Requests:</Text>
                    <ScrollView style={styles.playerList_scrollView}>
                        {joinRequestsList}
                    </ScrollView>
                    <Pressable style={styles.modal_Closebtn} onPress={() => setRequestsModalVisible(!requestsModalVisible)} >
                        <Text style={appCss.inputLabel}>Close</Text>
                    </Pressable>
                </ImageBackground>
            </View>
        </View>
    </ModalJoinRequests>

    return (
        <View>
            {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={"There are no requests"} />}
            <TouchableOpacity onPress={() => badge === 0 ?setAlertModalVisible(true): setRequestsModalVisible(true)} style={styles.PlayerRequest}>
                <Text style={styles.btnText}>Join Requests</Text>
                <MailIcon name="mail" size={24} color="black" />
            </TouchableOpacity>
            {modal_JoinRequests}
            {badge === 0 ? null :
                <Badge
                    containerStyle={{ position: 'absolute', top: 0, left: 0 }}
                    value={badge}
                    status="error" />}
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70
    },
    modal_View: {
        margin: 20,
        borderRadius: 20,
        padding: 5,
        paddingBottom: 20,
        shadowColor: "#D9D9D9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        height: '80%',
        width: '95%',
        alignSelf: 'center'
    },
    PlayerRequest: {
        backgroundColor: '#D9D9D9',
        padding: 20,
        width: 170,
        height: 50,
        marginRight: 10,
        borderRadius: 20,
        opacity: 0.3,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    modal_Txt: {
        marginBottom: 15,
        padding: 10,
        textAlign: "center"
    },
    btnText: {
        alignSelf: 'center',
        fontWeight: "bold",
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 40,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
        marginBottom: 20,
    },
    playerList_scrollView: {
        height: 460,
    },
})
