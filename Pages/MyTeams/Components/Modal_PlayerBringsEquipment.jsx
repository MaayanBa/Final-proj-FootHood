import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalPlayerBringsEquipment, Pressable, ImageBackground,ScrollView
} from 'react-native';
import AppCss from '../../../CSS/AppCss';
import { Avatar, ListItem } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { Entypo as Pencil } from '@expo/vector-icons';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
// import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';


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
        textAlign: "center",
        fontWeight: "bold",
    },
    btnText: {
        alignSelf: 'center',
        fontWeight: "bold",
    },
    btns_View: {
        marginBottom:20,
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
    // const { state: { equipments }, GetAllEquipments } = useContext(EquipmentContext);


    useEffect(() => {
        GetPlayers4Game(props.game.GameSerialNum, players)
    }, [])


    const playersInGameList = playersPerGame.map((p, i) => (
        <ListItem key={i} bottomDivider style={{ color: "#D9D9D9" }} >
            <View>
                <RadioButton
                    value={i}
                    status={choosenPlayer === i ? 'checked' : 'unchecked'}
                    onPress={() => setChoosenPlayer(i)}
                />
            </View>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>
    ))
    // const equipmentsList= 

    const modal_PlayerBringsEquipment = <ModalPlayerBringsEquipment animationType="slide"
        transparent={true} visible={playerBringsModalVisible}
        onRequestClose={() => setPlayerBringsModalVisible(!playerBringsModalVisible)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modal_View}>
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
                    <Text style={styles.modal_Txt}>Choose Player:</Text>
                        {playersInGameList}
                    <Text style={styles.modal_Txt}>Choose Equipment To Assign:</Text>
                    {/* {equipmentsList} */}
                    <View style={styles.btns_View}>
                        <Pressable style={styles.modal_Closebtn} onPress={() => setPlayerBringsModalVisible(!playerBringsModalVisible)} >
                            <Text style={appCss.inputLabel}>Close</Text>
                        </Pressable>
                        <Pressable style={styles.modal_Closebtn} onPress={() => console.log("Assign")} >
                            <Text style={appCss.inputLabel}>Assign</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        </View>
    </ModalPlayerBringsEquipment>

    return (
        <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => setPlayerBringsModalVisible(true)} style={{ alignItems: 'flex-start' }}>
                <Pencil name="pencil" size={24} color="black" />
            </TouchableOpacity>
            {modal_PlayerBringsEquipment}
        </View>
    )
}
