import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalWaitingList, Pressable, Image, ImageBackground
} from 'react-native';
import AppCss from '../../../CSS/AppCss';
import { Avatar, ListItem, Badge } from 'react-native-elements';
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as AuthContext } from '../../../Contexts/AuthContext';

export default function Modal_WaitingList(props) {
    const [waitingModalVisible, setWaitingModalVisible] = useState(false);
    const { state: { players } } = useContext(PlayerContext);
    const { state: { gamesList, playersPerGame }, GetPlayers4Game } = useContext(GameContext);
    const { state: { token } } = useContext(AuthContext)
    const [badge, setBadge] = useState(0);


    useEffect(() => {
        GetPlayers4Game(props.game.GameSerialNum, players);
    }, [])


    const PlayerCard = (p) => {
        props.navigation.navigate('CardPlayer', { p })
        setWaitingModalVisible(!waitingModalVisible)
    }

    // const waitingList = players.map((p, i) => (
    //     <ListItem key={i} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
    //         <TouchableOpacity activeOpacity={0.8} onPress={() => PlayerCard(p)} >
    //             <Image style={[appCss.playerCardIcon_Btn, { left: 5 }]} source={require('../../../assets/PlayerCardIcon.png')} />
    //         </TouchableOpacity>
    //         <ListItem.Content style={{ alignItems: 'flex-end' }} >
    //             <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
    //         </ListItem.Content>
    //         <Avatar rounded source={{ uri: p.PlayerPicture }} />
    //     </ListItem>
    // ))


    const modal_WaitingList = <ModalWaitingList animationType="slide"
        transparent={true} visible={waitingModalVisible}
        onRequestClose={() => setWaitingModalVisible(!waitingModalVisible)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modal_View}>
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
                    <Text style={[styles.modal_Txt, appCss.inputLabel, { marginTop: 10 }]}>Waiting List:</Text>
                    {/* {waitingList} */}
                    <Pressable style={styles.modal_Closebtn} onPress={() => setWaitingModalVisible(!waitingModalVisible)} >
                        <Text style={appCss.inputLabel}>Close</Text>
                    </Pressable>
                </ImageBackground>
            </View>
        </View>
    </ModalWaitingList>

    return (
        <View>
            <TouchableOpacity onPress={() => badge === 0 ? alert("There is no one currently waiting") : setWaitingModalVisible(true)} style={styles.WaitingList}>
                <Text style={styles.btnText}>Waiting List</Text>
            </TouchableOpacity>
            {modal_WaitingList}
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
    WaitingList: {
        backgroundColor: '#D9D9D9',
        padding: 20,
        borderRadius: 20,
        width: 170,
        height: 50,
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
