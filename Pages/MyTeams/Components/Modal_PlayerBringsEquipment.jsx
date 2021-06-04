import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalPlayerBringsEquipment, Pressable, ImageBackground, ScrollView
} from 'react-native';
import AppCss from '../../../CSS/AppCss';
import { Avatar, ListItem } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { Entypo as Pencil } from '@expo/vector-icons';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as AuthContext } from '../../../Contexts/AuthContext';
import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';


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
        height: '90%',
    },
    modal_Txt: {
        marginBottom: 15,
        padding: 10,
        marginTop:10,
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
    },
    btnText: {
        alignSelf: 'center',
        fontWeight: "bold",
    },
    label: {
        fontWeight: "bold",
        color: "white",
    },
    btns_View: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 40,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
})

export default function Modal_PlayerBringsEquipment(props) {
    const [playerBringsModalVisible, setPlayerBringsModalVisible] = useState(false);
    const { state: { playersPerGame }, GetPlayers4Game } = useContext(GameContext);
    const { state: { players } } = useContext(PlayerContext);
    const [choosenPlayer, setChoosenPlayer] = useState();
    const [choosenEquipment, setChoosenEquipment] = useState();
    const { state: { token } } = useContext(AuthContext)
    const [user, setUser] = useState(token)
    const { state: { equipments }, AssignEquipment2Player } = useContext(EquipmentContext);


    useEffect(() => {
        GetPlayers4Game(props.game.GameSerialNum, players)
    }, [])

    const AssignEquipment = () => {
        if (choosenPlayer != null && choosenEquipment != null) {
            let assignEquipment2Player = {
                GameSerialNum: props.game.GameSerialNum,
                EmailPlayer: playersPerGame[choosenPlayer].Email,
                BringItems: props.equipments[choosenEquipment].EquipmentName,
            }
            // console.log(assignEquipment2Player)
            AssignEquipment2Player(assignEquipment2Player)
        }
        else
            alert("You must pick a player and item")
    }
    const playersInGameList = playersPerGame.map((p, i) => (
        <ListItem key={i} containerStyle={{ backgroundColor: "transparent" }}>
            <View>
                <RadioButton
                    value={i}
                    status={choosenPlayer === i ? 'checked' : 'unchecked'}
                    onPress={() => setChoosenPlayer(i)}
                />
            </View>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title style={styles.label}>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>
    ))
    const equipmentsList = () => props.equipments.map((e, i) => (
        <ListItem key={i} containerStyle={{ backgroundColor: "transparent" }} >
            <View>
                <RadioButton
                    value={i}
                    status={choosenEquipment === i ? 'checked' : 'unchecked'}
                    onPress={() => setChoosenEquipment(i)}
                />
            </View>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title style={styles.label}>{e.EquipmentName}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    ))

    const modal_PlayerBringsEquipment = <ModalPlayerBringsEquipment animationType="slide"
        transparent={true} visible={playerBringsModalVisible}
        onRequestClose={() => setPlayerBringsModalVisible(!playerBringsModalVisible)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modal_View}>
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
                    <Text style={styles.modal_Txt}>Choose Player:</Text>
                    <ScrollView style={{height: 300 }}>
                        {playersInGameList}
                    </ScrollView>
                    <Text style={styles.modal_Txt}>Choose Equipment To Assign:</Text>
                    <ScrollView>
                        {props.equipments == "There are no Equipments for this game" ? null : equipmentsList()}
                    </ScrollView>
                    <View style={styles.btns_View}>
                        <Pressable style={styles.modal_Closebtn} onPress={() => setPlayerBringsModalVisible(!playerBringsModalVisible)} >
                            <Text style={appCss.inputLabel}>Close</Text>
                        </Pressable>
                        <Pressable style={styles.modal_Closebtn} onPress={() => AssignEquipment()} >
                            <Text style={appCss.inputLabel}>Assign</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        </View>
    </ModalPlayerBringsEquipment>

    return (
        <View style={{ padding: 10 }}>
            {props.manager !== user.Email ? null :
                <TouchableOpacity onPress={() => setPlayerBringsModalVisible(true)} style={{ alignItems: 'flex-start' }}>
                    <Pencil name="pencil" size={24} color="black" />
                </TouchableOpacity>}
            {modal_PlayerBringsEquipment}
        </View>
    )
}
