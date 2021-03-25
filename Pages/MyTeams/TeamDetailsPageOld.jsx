import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, Modal, Button,
    Pressable, ScrollView, SafeAreaView,
    Image, View, StatusBar, TouchableOpacity, ImageBackground
} from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width: '100%',
        padding: 20,
    },
    cover: {
        height: 240,
        position: 'relative', // because it's parent
        borderRadius: 10,
    },
    teamHeader: {
        alignItems: 'center',
        position: 'absolute', // child
        bottom: 735, // position where you want
        right: 165,
        color: 'white',
        fontSize: 30,
        fontWeight: "bold",

    },
    btnTouch: {
        elevation: 8,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: '90%',
    },
    btnTouch: {
        elevation: 5,
        backgroundColor: "#D9D9D9",
        opacity: 0.8,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginTop: 10,
        width: '90%'
    },
    txtBtnTouch: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: 'center',
        textTransform: "uppercase",
        width: 250,
    },
    buttons: {
        alignItems: 'center',
        position: 'absolute', // child
        bottom: 550, // position where you want
        right: 75
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        marginTop: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        width: 100
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    leaveTeam: {
        flexDirection: "row-reverse",
        padding: 6,
        justifyContent: 'flex-end',

    },
    leaveText: {
        fontSize: 16,
        color: 'white'
    },
    teamPlayersText: {
        fontSize: 16,
        padding: 5,
        fontWeight: "bold",
        color: 'white'
    },
    addPlayersBtns: {
        flexDirection: "row",
    }

})

const team =
{
    teamName: "Barca",
    groupPhoto: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
    teamManager: "Benel",
    numberOfPlayers: 10,
    playersInTeam: [
        { Name: "Lionel Messi", PlayerImg: "https://assets.laliga.com/squad/2020/t178/p19054/2048x2048/p19054_t178_2020_1_002_000.jpg" },
        { Name: "Cristiano Ronaldo", PlayerImg: "https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg" },
        { Name: "Neymar Jr.", PlayerImg: "https://sportshub.cbsistatic.com/i/r/2020/12/13/2106d28e-ef9a-4813-9c9e-ba468026d2e3/thumbnail/640x360/3cfd012b2f428aa2f4cf7ef9cd4b5d64/neymar-1.png" },
        { Name: "Bruno Fernandes", PlayerImg: "http://therepublikofmancunia.com/wp-content/uploads/2020/06/NINTCHDBPICT000565411429-1440x684.jpg" },
        { Name: "Eran Levi", PlayerImg: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2018/10/09/15390673413277_b.jpg" },
        { Name: "Lionel Messi", PlayerImg: "https://assets.laliga.com/squad/2020/t178/p19054/2048x2048/p19054_t178_2020_1_002_000.jpg" },
        { Name: "Cristiano Ronaldo", PlayerImg: "https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg" },
        { Name: "Neymar Jr.", PlayerImg: "https://sportshub.cbsistatic.com/i/r/2020/12/13/2106d28e-ef9a-4813-9c9e-ba468026d2e3/thumbnail/640x360/3cfd012b2f428aa2f4cf7ef9cd4b5d64/neymar-1.png" },
        { Name: "Bruno Fernandes", PlayerImg: "http://therepublikofmancunia.com/wp-content/uploads/2020/06/NINTCHDBPICT000565411429-1440x684.jpg" },
        { Name: "Eran Levi", PlayerImg: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2018/10/09/15390673413277_b.jpg" }

    ],
    rulesAndLaws: "Hello And welcome to FootHood First Game. The rules are- Each team has 5 players and the team who wins is the team who reaches 2 goals. The game time is 8 min. If needed there is a 2 min extra time."
}
const playerList = team.playersInTeam.map((p, i) => (
    <ListItem key={i} bottomDivider>
        <Avatar rounded source={{ uri: p.PlayerImg }} />
        <ListItem.Content >
            <ListItem.Title>{p.Name}</ListItem.Title>
        </ListItem.Content>
    </ListItem>
))

export default function TeamDetailsPageOld(props) {
    const [rulesModalVisible, setRuleModalVisible] = useState(false);
    const [addPlayerModalVisible, setAddPlayerModalVisible] = useState(false);

    const ExitTeam = () => { }
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: team.groupPhoto }} style={styles.cover} />
            <View style={styles.buttons}>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={rulesModalVisible}
                        onRequestClose={() => {
                            setRuleModalVisible(!rulesModalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{team.rulesAndLaws}</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setRuleModalVisible(!rulesModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Exit</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setRuleModalVisible(true)} style={styles.btnTouch}>
                        <Text style={styles.txtBtnTouch}>Rules And Laws</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={addPlayerModalVisible}
                        onRequestClose={() => {
                            setAddPlayerModalVisible(!addPlayerModalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.btnTouch}>
                                        <View style={styles.addPlayersBtns}>
                                            <Feather name="link" size={24} color="black" />
                                            <Text style={styles.txtBtnTouch}>Via Link</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.btnTouch}>
                                        <View style={styles.addPlayersBtns}>
                                            <Feather name="user-plus" size={24} color="black" />
                                            <Text style={styles.txtBtnTouch}>Contact List</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.btnTouch}>
                                        <View style={styles.addPlayersBtns}>
                                            <Feather name="search" size={24} color="black" />
                                            <Text style={styles.txtBtnTouch}>Search In App</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setAddPlayerModalVisible(!addPlayerModalVisible)}
                                >
                                    <Text style={styles.textStyle}>Exit</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setAddPlayerModalVisible(true)} style={styles.btnTouch}>
                        <Text style={styles.txtBtnTouch}>Add New Players</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <Text style={styles.teamHeader}>{team.teamName}</Text>
            <Text style={styles.teamPlayersText}>Team Players:</Text>
            <ScrollView>
                {playerList}
            </ScrollView>
            <TouchableOpacity style={styles.leaveTeam} onPress={() => ExitTeam()}>
                <Feather name="log-out" size={24} color="white" />
                <Text style={styles.leaveText}>Leave Team</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

}