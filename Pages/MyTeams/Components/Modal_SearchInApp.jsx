import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalSearchInApp, Pressable, TextInput
} from 'react-native';
import { Feather } from '@expo/vector-icons';
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
    addPlayersBtns: {
        flexDirection: "row-reverse",
    },
    btnText: {
        alignSelf: 'center',
        fontWeight: "bold",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    labels: {
        alignSelf: 'flex-start'
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 40,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
})

export default function Modal_SearchInApp(props) {

    const [fullName, setFullName] = useState("");
    const { state: { players }, SearchPlayer } = useContext(TeamContext);

    // const closeOldModel=()=>{
    //     props.setSearchInAppModalVisible(true)
    //     // props.setAddPlayerModalVisible(false)
    // }
    const SearchPlayers = () => {

        var firstName = "";
        var lastName = "";
        console.log(fullName)
        var checkName = fullName.split(' ');
        console.log("Length:" + checkName.length)
        // switch (checkName.length) {
        //     case (checkName.length == 1):
        //         firstName = fullName;
        //         console.log("CASE 1!")

        //     case (checkName.length >= 2):
        //         firstName = fullName.split(' ').slice(0, -1).join(' ');
        //         lastName = fullName.split(' ').slice(-1).join(' ');
        //         console.log("XASE 2!")
        // }
        if (checkName.length === 1) {
            firstName = fullName;
            lastName = null;
            console.log("CASE 1!")
        }
        else if (checkName.length >= 2) {
            firstName = fullName.split(' ').slice(0, -1).join(' ');
            lastName = fullName.split(' ').slice(-1).join(' ');
            console.log("XASE 2!")
        }

        console.log("First: " + firstName + " Last: " + lastName)
        const player = {
            FirstName: firstName,
            LastName: lastName
        }
        SearchPlayer(player)
        props.setShowSearchPlayer_Modal(false);
        
    }
    const modal_searchInApp = <ModalSearchInApp animationType="slide"
        transparent={true} visible={props.searchInAppModalVisible}
        onRequestClose={() => props.setSearchInAppModalVisible(!props.searchInAppModalVisible)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modal_View}>
                <Text style={styles.modal_Txt}>Enter Player Details:</Text>
                <Text style={styles.labels}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFullName}
                    value={fullName}
                />
                <Pressable style={styles.modal_Closebtn} onPress={() => SearchPlayers()} >
                    <Text style={appCss.inputLabel}>Search</Text>
                </Pressable>
            </View>
        </View>
    </ModalSearchInApp>

    return (
        <View style={styles.addPlayersBtns}>
            {/* <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch, { width: "90%" }]} onPress={() => closeOldModel()}>
                <View style={styles.addPlayersBtns}>
                    <Feather name="search" size={24} color="black" />
                    <Text style={[appCss.txtBtnTouch, { fontSize: 16 }]}>&nbsp; Search In App</Text>
                </View>
            </TouchableOpacity> */}
            {modal_searchInApp}
        </View>
    )
}
