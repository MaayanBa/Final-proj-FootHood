import React, { useState, useContext } from 'react';
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalSearchInApp, Pressable, TextInput, Image, ScrollView
} from 'react-native';
import { Entypo as PlusIcon } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements';
import AppCss from '../../../CSS/AppCss';
import { Context as TeamContext } from '../../../Contexts/TeamContext';

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
    modal_Txt: {
        marginBottom: 15,
        padding: 10,
        textAlign: "center"
    },
    addPlayersBtns: {
        flexDirection: "row-reverse",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    labels: {
        alignSelf: 'flex-end'
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 40,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
    teamPlayers_Text: {
        padding: 10,
        fontWeight: "bold",
    },
})

export default function Modal_SearchInApp(props) {

    const [fullName, setFullName] = useState("");
    const { state: { searchedPlayers }, SearchPlayer,AddPlayer } = useContext(TeamContext);

    const SearchPlayers = () => {

        var firstName = "";
        var lastName = "";
        console.log(fullName)
        var checkName = fullName.split(' ');
        console.log("Length:" + checkName.length)
        if (checkName.length === 1) {
            firstName = fullName;
            lastName = null;
            console.log("CASE 1!")
        }
        else if (checkName.length >= 2) {
            firstName = fullName.split(' ').slice(0, -1).join(' ');
            lastName = fullName.split(' ').slice(-1).join(' ');
            console.log("CASE 2!")
        }

        console.log("First: " + firstName + " Last: " + lastName)
        const player = {
            FirstName: firstName,
            LastName: lastName
        }
        SearchPlayer(player)
    }

const AddNewPlayerToTeam=(p)=>{
    const selectedPlayer = {
        EmailPlayer: p.Email,
        TeamSerialNum: props.team.TeamSerialNum
    }
    console.log(selectedPlayer)
    AddPlayer(selectedPlayer)
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
        return <ListItem key={key} bottomDivider style={styles.rowPlayer_ItemList}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CardPlayer', { p })} >
                <Image style={appCss.playerCardIcon_Btn} source={require('../../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => AddNewPlayerToTeam(p)}>
                <PlusIcon name="plus" size={25} color="black" />
            </TouchableOpacity>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>

    })


    const modal_searchInApp = <ModalSearchInApp animationType="slide"
        transparent={true} visible={props.searchInAppModalVisible}
        onRequestClose={() => props.setShowSearchPlayer_Modal(false)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modal_View}>
                <Text style={styles.modal_Txt}>Enter Player Details:</Text>
                <Text style={styles.labels}>Full Name:</Text>
                <TextInput style={styles.input} onChangeText={setFullName} value={fullName}/>
                <Pressable style={styles.modal_Closebtn} onPress={() => SearchPlayers()} >
                    <Text style={appCss.inputLabel}>Search</Text>
                </Pressable>
                {searchedPlayers.length == 0 ? null :
                    <View style={styles.playerList_View}>
                        <Text style={styles.teamPlayers_Text}>Search Results:</Text>
                        <ScrollView>
                            {searchedPlayerList}
                        </ScrollView>
                        <Pressable style={styles.modal_Closebtn} onPress={() => Close()} >
                            <Text style={appCss.inputLabel}>Close</Text>
                        </Pressable>
                    </View >
                }
            </View>
        </View>
    </ModalSearchInApp>

    return (
        <View style={styles.addPlayersBtns}>
            {modal_searchInApp}
        </View>
    )
}
