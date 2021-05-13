import React, { useState, useContext, useEffect } from 'react';
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
        backgroundColor: "#F4EFE8",
        borderRadius: 20,
        padding: 5,
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 500
    },
    modal_Txt: {
        marginBottom: 15,
        padding: 10,
        textAlign: "center",
    },
    addPlayersBtns: {
        //flexDirection: "row-reverse",
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
    const { state: { searchedPlayers, myTeams }, SearchPlayer, AddPlayer, SetSearchPlayer, GetPlayers4Team, GetTeamDetails } = useContext(TeamContext);
    const [forceState, setForceState] = useState(false)
    const teamKey = props.teamKey;

    useEffect(() => {
        
        //GetPlayers4Team(props.team.TeamSerialNum,myTeams);
        //console.log(props.navigation)
        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     console.log("FOCuS=======>")
        //   });
        //   return unsubscribe;
    }, [])

    // const unsubscribe = props.navigation.addListener('tabPress', e => {
    //     // Prevent default action
    //     e.preventDefault();
    //   })

    const SearchPlayers = () => {
        var firstName = "";
        var lastName = "";
        //console.log(fullName)
        var checkName = fullName.split(' ');
        //console.log("Length:" + checkName.length)
        if (checkName.length === 1) {
            firstName = fullName;
            lastName = null;
        }
        else if (checkName.length >= 2) {
            firstName = fullName.split(' ').slice(0, -1).join(' ');
            lastName = fullName.split(' ').slice(-1).join(' ');
        }

        //console.log("First: " + firstName + " Last: " + lastName)
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
        //console.log(selectedPlayer)
        await AddPlayer(selectedPlayer)
        //GetTeamDetails(user.Email)
        await GetPlayers4Team(myTeams[teamKey].TeamSerialNum, myTeams);
        SetSearchPlayer();
        Close();
    }

    const Close = () => {
        const player = {
            FirstName: null,
            LastName: null
        }
        //SearchPlayer(player)
        //SetSearchPlayer()
        props.setShowSearchPlayer_Modal(false)
    }


    const searchedPlayerList = searchedPlayers.map((p, key) => {
        return <ListItem key={key} bottomDivider style={styles.rowPlayer_ItemList}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CardPlayer', { p })} >
                <Image style={appCss.playerCardIcon_Btn} source={require('../../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={async() => {
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
        <View style={styles.addPlayersBtns}>
            <ModalSearchInApp animationType="slide"
                transparent={true} visible={props.searchInAppModalVisible}
                onRequestClose={() => props.setShowSearchPlayer_Modal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modal_View}>
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
        </View>
    )
}
