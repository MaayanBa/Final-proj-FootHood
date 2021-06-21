
import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalSearchInApp, Pressable, TextInput, Image, ScrollView, SafeAreaView,ImageBackground
} from 'react-native';
import { Entypo as PlusIcon } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements';
import AppCss from '../../../CSS/AppCss';
import { Context as TeamContext } from '../../../Contexts/TeamContext';

export default function Modal_SearchInApp(props) {
    const [fullName, setFullName] = useState("");
    const { state: { searchedPlayers, myTeams }, SearchPlayer, AddPlayer, SetSearchPlayer, GetPlayers4Team } = useContext(TeamContext);
    const teamKey = props.teamKey;


    const SearchPlayers = () => {
        var firstName = "";
        var lastName = "";
        var checkName = fullName.split(' ');
        if (checkName.length === 1) {
            firstName = fullName;
            lastName = null;
        }
        else if (checkName.length >= 2) {
            firstName = fullName.split(' ').slice(0, -1).join(' ');
            lastName = fullName.split(' ').slice(-1).join(' ');
        }

        const player = {
            FirstName: firstName,
            LastName: lastName
        }
        SearchPlayer(player)
    }

    const AddNewPlayerToTeam = async (p) => {
        const selectedPlayer = {
            EmailPlayer: p.Email,
            TeamSerialNum: myTeams[teamKey].TeamSerialNum
        }
        await AddPlayer(selectedPlayer)
        await GetPlayers4Team(myTeams[teamKey].TeamSerialNum, myTeams);
        SetSearchPlayer();
        Close();
    }

    const Close = () => {
        const player = {
            FirstName: null,
            LastName: null
        }
        SearchPlayer(player)
        props.setShowSearchPlayer_Modal(false)
    }


    const searchedPlayerList = searchedPlayers.map((p, key) => {
        return <ListItem key={key} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CardPlayer', { p })} >
                <Image style={appCss.playerCardIcon_Btn} source={require('../../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                await AddNewPlayerToTeam(p);
                props.setForceState();
            }}>
                <PlusIcon name="plus" size={25} color="black" />
            </TouchableOpacity>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>

    })

    return (
        <ModalSearchInApp animationType="slide"
            transparent={true} visible={props.searchInAppModalVisible}
            onRequestClose={() => props.setShowSearchPlayer_Modal(false)}
        >
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.centeredView}>
                        <View style={styles.modal_View}>
                            <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
                                <Text style={styles.modal_Txt}>Enter Player Details:</Text>
                                <Text style={styles.labels}>Full Name:</Text>
                                <TextInput style={styles.input} onChangeText={setFullName} value={fullName} />
                                <Pressable style={styles.modal_Closebtn} onPress={() => SearchPlayers()} >
                                    <Text style={appCss.inputLabel}>Search</Text>
                                </Pressable>
                                {
                                    searchedPlayers.length == 0 ? null :
                                        <View style={styles.playerList_View}>
                                            <Text style={styles.teamPlayers_Text}>Search Results:</Text>
                                            <ScrollView style={styles.playerList_scrollView}>
                                                {searchedPlayerList}
                                            </ScrollView>
                                            <Pressable style={styles.modal_Closebtn} onPress={() => Close()} >
                                                <Text style={appCss.inputLabel}>Close</Text>
                                            </Pressable>
                                        </View >
                                }
                            </ImageBackground>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ModalSearchInApp>
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
        height: 640,
    },
    modal_Txt: {
        marginBottom: 15,
        padding: 10,
        textAlign: "center",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 5
    },
    labels: {
        alignSelf: 'flex-end',
        right: 15
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 50,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
    teamPlayers_Text: {
        padding: 10,
        fontWeight: "bold",
    },
    playerList_scrollView: {
        height: 250
    },
})