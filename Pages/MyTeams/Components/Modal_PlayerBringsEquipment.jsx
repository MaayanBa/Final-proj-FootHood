import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text, TextInput, Modal as ModalPlayerBringsEquipment,
    Pressable, ImageBackground, ScrollView, SafeAreaView
} from 'react-native';
import AppCss from '../../../CSS/AppCss';
import { Avatar, ListItem } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { Entypo as Pencil } from '@expo/vector-icons';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as AuthContext } from '../../../Contexts/AuthContext';
import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import EquipmentsRadioBtns from './EquipmentsRadioBtns';

export default function Modal_PlayerBringsEquipment(props) {
    const index = props.index;
    const keyTeam = props.keyTeam;
    const [playerBringsModalVisible, setPlayerBringsModalVisible] = useState(false);
    const { state: { gamesList, playersPerGame }, GetPlayers4Game } = useContext(GameContext);
    const { state: { players } } = useContext(PlayerContext);
    const { state: { myTeams } } = useContext(TeamContext);
    const [choosenPlayer, setChoosenPlayer] = useState();
    const [choosenEquipment, setChoosenEquipment] = useState();
    const { state: { token } } = useContext(AuthContext)
    // const [user, setUser] = useState(token)
    const { state: { equipments }, AssignEquipment2Player, GetAllEquipments, GetItemsAssignForGame, AddNewItem } = useContext(EquipmentContext);
    const [newEquipment, setNewEquipment] = useState()

    useEffect(() => {
        GetPlayers4Game(gamesList[index].GameSerialNum, players);
        GetAllEquipments(gamesList[index].GameSerialNum);
    }, [])

    const AssignEquipment = async () => {
        if (choosenPlayer != null && choosenEquipment != null) {
            let assignEquipment2Player = {
                GameSerialNum: gamesList[index].GameSerialNum,
                EmailPlayer: playersPerGame[choosenPlayer].Email,
                BringItems: equipments[choosenEquipment].EquipmentName,
            }
            await AssignEquipment2Player(assignEquipment2Player)
            await GetItemsAssignForGame(gamesList[index].GameSerialNum)
            setChoosenPlayer(null)
            setChoosenEquipment(null)
            setPlayerBringsModalVisible(false)
        }
        else
            alert("You must pick a player and item")
    }

    const AddNewEquipment = async () => {
        if (newEquipment != null) {
            const equipment = {
                GameSerialNum: gamesList[index].GameSerialNum,
                EquipmentName: newEquipment
            }
            await AddNewItem(equipment);
            await GetAllEquipments(gamesList[index].GameSerialNum);
            setNewEquipment(null)
        }
        else
            alert("Please enter equipment name")
    }
    const playersInGameList = playersPerGame.map((p, i) => (
        <ListItem key={i} containerStyle={{ backgroundColor: "transparent" }}>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title style={styles.label}>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            {/* <Avatar rounded source={{ uri: p.PlayerPicture }} /> */}
            <View>
                <RadioButton
                    value={i}
                    status={choosenPlayer === i ? 'checked' : 'unchecked'}
                    onPress={() => setChoosenPlayer(i)}
                />
            </View>
        </ListItem>
    ))
    // const equipmentsList = () => equipments.map((e, i) => (
    //     <ListItem key={i} containerStyle={{ backgroundColor: "transparent" }} >
    //         <ListItem.Content style={{ alignItems: 'flex-end' }} >
    //             <ListItem.Title style={styles.label}>{e.EquipmentName}</ListItem.Title>
    //         </ListItem.Content>
    //         <View>
    //             <RadioButton
    //                 value={i}
    //                 status={choosenEquipment === i ? 'checked' : 'unchecked'}
    //                 onPress={() => setChoosenEquipment(i)}
    //             />
    //         </View>
    //     </ListItem>
    // ))


    const Close = () => {
        setChoosenPlayer(null)
        setChoosenEquipment(null)
        setNewEquipment(null)
        setPlayerBringsModalVisible(!playerBringsModalVisible)
    }
    const modal_PlayerBringsEquipment = <ModalPlayerBringsEquipment animationType="slide"
        transparent={true} visible={playerBringsModalVisible}
        onRequestClose={() => Close()}
    >
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.centeredView}>
                    <View style={styles.modal_View}>
                        <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
                            <Text style={styles.modal_Txt}>Assign Equipment:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: 170 }}>
                                    <Text style={styles.modal_Txt}>Equipment:</Text>
                                    <ScrollView style={{ height: 300, backgroundColor: 'rgba(52, 52, 52, 0.1)', borderRadius: 20, left: 10 }}>
                                        {/* {equipments == "There are no Equipments for this game" ? null : equipmentsList()} */}
                                        {equipments == "There are no Equipments for this game" ? null : <EquipmentsRadioBtns index={index} keyTeam={keyTeam} setChoosenEquipment={(e) => setChoosenEquipment(e)} choosenEquipment={choosenEquipment} />}
                                    </ScrollView>
                                </View>
                                <View style={styles.verticleLine}></View>
                                <View style={{ width: 170 }}>
                                    <Text style={styles.modal_Txt}>Player:</Text>
                                    <ScrollView style={{ height: 300, backgroundColor: 'rgba(52, 52, 52, 0.1)', borderRadius: 20, right: 10 }}>
                                        {playersInGameList}
                                    </ScrollView>
                                </View>
                            </View>
                            <Text style={styles.modal_Txt}>Add A New Equipment:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Pressable style={styles.modal_Closebtn} onPress={() => AddNewEquipment()} >
                                    <Text style={[appCss.inputLabel, { marginHorizontal: 25 }]}>Add</Text>
                                </Pressable>
                                <TextInput style={styles.input} onChangeText={setNewEquipment} value={newEquipment} />
                            </View>
                            <View style={styles.btns_View}>
                                <Pressable style={styles.modal_Closebtn} onPress={() => Close()} >
                                    <Text style={[appCss.inputLabel, { marginHorizontal: 25 }]}>Close</Text>
                                </Pressable>
                                <Pressable style={styles.modal_Closebtn} onPress={() => AssignEquipment()} >
                                    <Text style={[appCss.inputLabel, { marginHorizontal: 25 }]}>Assign</Text>
                                </Pressable>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </ModalPlayerBringsEquipment>

    return (
        <View style={{ padding: 10 }}>
            {/* {myTeams[keyTeam].EmailManager !== user.Email ? null : */}
            <TouchableOpacity onPress={() => setPlayerBringsModalVisible(true)} style={{ alignItems: 'flex-start' }}>
                <Pencil name="pencil" size={24} color="black" />
            </TouchableOpacity>
            {/* } */}
            {modal_PlayerBringsEquipment}
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
        // margin: 20,
        borderRadius: 20,
        padding: 5,
        paddingBottom: 20,
        height: '100%',
        width: '100%'
    },
    modal_Txt: {
        marginBottom: 5,
        padding: 10,
        marginTop: 10,
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
        paddingTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
    input: {
        height: 42,
        margin: 12,
        borderWidth: 1,
        width: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingRight: 10

    },
    verticleLine: {
        marginTop: 30,
        height: '90%',
        width: 1,
        backgroundColor: '#909090',
    },
})