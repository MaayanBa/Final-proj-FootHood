import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalJoinRequests, Pressable, Image
} from 'react-native';
import { AntDesign as MailIcon, AntDesign as PlusIcon, Feather as RequestAction } from '@expo/vector-icons';
import AppCss from '../../../CSS/AppCss';
import { Avatar, ListItem } from 'react-native-elements';
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as AuthContext } from '../../../Contexts/AuthContext';



const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70
    },
    modal_View: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        paddingBottom: 20,
        shadowColor: "#D9D9D9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 30,
        height: '60%',
    },
    PlayerRequest: {
        backgroundColor: '#D9D9D9',
        padding: 20,
        width: '50%',
        borderRadius: 30,
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
    },
})

export default function Modal_JoinRequests(props) {
    const [requestsModalVisible, setRequestsModalVisible] = useState(false);
    const { state: { joinRequests }, GetJoinRequests ,GetTeamDetails} = useContext(TeamContext);
    const { state: { players } } = useContext(PlayerContext);
    const { DeleteRequest, ApproveRequest,GetPlayers4Game } = useContext(GameContext);
    const { state: { token } } = useContext(AuthContext)


    useEffect(() => {
        GetJoinRequests(props.game, players)
    }, [])

    const DeleteRequests =async (player) => {
        await DeleteRequest(player.Email, props.game.GameSerialNum);
        await GetJoinRequests(props.game, players);
    }
    const ApproveRequests =async (player) => {
        await ApproveRequest(player.Email, props.game.GameSerialNum);
        await GetJoinRequests(props.game, players);
        await GetPlayers4Game(props.game.GameSerialNum,players);
        GetTeamDetails(token.Email);
    }
    

    const joinRequestsList = joinRequests.map((p, i) => (
        <ListItem key={i} bottomDivider style={{ color: "#D9D9D9" }} >
            {/* <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("player Card")} >
                <Image style={styles.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>  */}
            <TouchableOpacity onPress={() => DeleteRequests(p)}>
                <RequestAction name="x" size={25} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ApproveRequests(p)}>
                <RequestAction name="check" size={25} color="black" />
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
                <Text style={styles.modal_Txt}>Join Requests:</Text>
                {joinRequestsList}
                <Pressable style={styles.modal_Closebtn} onPress={() => setRequestsModalVisible(!requestsModalVisible)} >
                    <Text style={appCss.inputLabel}>Close</Text>
                </Pressable>
            </View>
        </View>
    </ModalJoinRequests>

    return (
        <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => setRequestsModalVisible(true)} style={styles.PlayerRequest}>
                <Text style={styles.btnText}>Players requests</Text>
                <MailIcon name="mail" size={24} color="black" />
            </TouchableOpacity>
            {modal_JoinRequests}
        </View>
    )
}
