import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalContactList, Pressable, TextInput, Image, ScrollView, SafeAreaView, ImageBackground
} from 'react-native';
import { Entypo as PlusIcon } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements';
import AppCss from '../../../CSS/AppCss';
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import * as Contacts from 'expo-contacts';
import { Dimensions } from 'react-native';




export default function Modal_ContactList(props) {
    const { state: { myTeams, teamPlayers }, AddPlayer, GetPlayers4Team } = useContext(TeamContext);
    const { state: { players }, } = useContext(PlayerContext);
    const teamKey = props.teamKey;
    const [contactList, setContactList] = useState([])

    useEffect(() => {
        (async () => {
            teamPlayers.map(t => {
                if (t.Email.includes("maayanstudent@gmail.com")) {
                    console.log("sakldnasld")
                }
            })
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });
                let playersInContacts = [];
                players.forEach(p => {
                    let checkIfAlreadyInTeam = false;
                    teamPlayers.map(t => {
                        if (t.Email.includes(p.Email)) {
                            checkIfAlreadyInTeam = true
                        }
                    })
                    if (!checkIfAlreadyInTeam) {
                        data.forEach(contact => {
                            if (contact.phoneNumbers !== undefined) {
                                // console.log(contact.phoneNumbers[0].number)
                                if (contact.phoneNumbers[0].number.includes(p.Phone)) {
                                    playersInContacts.push(p);
                                    console.log(p.Phone)
                                }
                            }
                        });
                    }

                })

        setContactList(playersInContacts);
        //     console.log(data.length)
    }
        }) ();
    }, []);


const AddNewPlayerToTeam = async (p) => {
    const selectedPlayer = {
        EmailPlayer: p.Email,
        TeamSerialNum: myTeams[teamKey].TeamSerialNum
    }
    await AddPlayer(selectedPlayer)
    await GetPlayers4Team(myTeams[teamKey].TeamSerialNum, myTeams);
    Close();
}

const Close = () => {
    props.setShowContactListModal(false)
}



const contactListClicked = contactList.map((p, key) => {
    return <ListItem key={key} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {props.props.props.navigation.navigate('CardPlayer', { p }); Close()}} >
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
    <ModalContactList animationType="slide"
        transparent={true} visible={props.searchInAppModalVisible}
        onRequestClose={() => props.setShowContactListModal(false)}
    >
        <SafeAreaView>
            <ScrollView>
                <View style={styles.centeredView}>
                    <View style={[appCss.modal_View, { height:Dimensions.get('window').height-100, paddingBottom: 1 } ]}>
                        <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>

                            {
                                contactListClicked.length == 0 ? null :
                                    <View style={styles.playerList_View}>
                                        <Text style={styles.contactsList_Text}>Contacts List:</Text>
                                        <ScrollView style={styles.playerList_scrollView}>
                                            {contactListClicked}
                                        </ScrollView>
                                        <Pressable style={[styles.modal_Closebtn]} onPress={() => Close()} >
                                            <Text style={appCss.inputLabel}>Close</Text>
                                        </Pressable>
                                    </View >
                            }
                        </ImageBackground>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    </ModalContactList>
)
}

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        color: 'white'
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
    contactsList_Text: {
        alignSelf:'center',
        paddingTop: 50,
        paddingBottom: 25,
        fontWeight: "bold",
        fontSize:25,
        color: 'white'
    },
    playerList_scrollView: {
        height: Dimensions.get('window').height-350
    },
})