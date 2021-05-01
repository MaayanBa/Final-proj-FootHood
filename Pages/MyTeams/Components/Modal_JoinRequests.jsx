import React, { useState } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalJoinRequests, Pressable, Image
} from 'react-native';
import { AntDesign as MailIcon, AntDesign as PlusIcon, Feather as RequestAction } from '@expo/vector-icons';
import AppCss from '../../../CSS/AppCss';
import { Avatar, ListItem } from 'react-native-elements';


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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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

const team =
{
    TeamName: "Barca",
    TeamPicture: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
    teamManager: "Benel",
    numberOfPlayers: 10,
    PlayersList: [
        { FirstName: "Lionel ",LastName: "Messi" , PlayerPicture: "https://assets.laliga.com/squad/2020/t178/p19054/2048x2048/p19054_t178_2020_1_002_000.jpg" , PlayerCity: "Tel-Aviv",Gender:0,},
        { EmailPlayer: "Cristiano Ronaldo", PlayerImg: "https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg" },
    ],
    rulesAndLaws: "Hello And welcome to FootHood First Game. The rules are- Each team has 5 players and the team who wins is the team who reaches 2 goals. The game time is 8 min. If needed there is a 2 min extra time."
}
export default function Modal_JoinRequests() {
    const [requestsModalVisible, setRequestsModalVisible] = useState(false);

    const joinRequestsList = team.PlayersList.map((p, i) => (
            <ListItem key={i} bottomDivider >
                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("player Card")} >
                <Image style={styles.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>  */}
                <TouchableOpacity onPress={() => console.log("Delete Request")}>
                    <RequestAction name="x" size={25} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("Approve Request")}>
                    <RequestAction name="check" size={25} color="black" />
                </TouchableOpacity>




                <ListItem.Content style={{ alignItems: 'flex-end' }} >
                    <ListItem.Title>{p.FirstName+ " "+p.LastName}</ListItem.Title>
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
