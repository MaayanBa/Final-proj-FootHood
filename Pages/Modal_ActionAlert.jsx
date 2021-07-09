import React, { useState, useContext } from 'react'
import { ActionSheetIOS } from 'react-native';
import {StyleSheet, View, Text,Modal as ModalAlertAction, Pressable, ImageBackground} from 'react-native';
import AppCss from '../CSS/AppCss';
import { Context as AuthContext } from '../Contexts/AuthContext';
import { Context as GameContext } from '../Contexts/GameContext';
import { Context as TeamContext } from '../Contexts/TeamContext';

export default function Modal_ActionAlert(props) {
    const { RemoveGameFromList } = useContext(GameContext);
    const { state: { token } ,signOut} = useContext(AuthContext)
    const { GetTeamDetails,RemoveFromTeam } = useContext(TeamContext);


    const Action = async (action, item) => {
        if (action === 'RemoveGame') {
            let game2Remove = {
                EmailManager: token.Email,
                GameSerialNum: item.GameSerialNum,
                TeamSerialNum: item.TeamSerialNum
            }
            await RemoveGameFromList(game2Remove)
            props.setAlertActionModalVisible()
        }
        if (action === 'RemovePlayer') {
            let playerInTeam = {
                TeamSerialNum: props.team,
                EmailPlayer: item.Email
            }
            console.log(playerInTeam)
            await RemoveFromTeam(playerInTeam)
            await GetTeamDetails(token.Email);
            props.setAlertActionModalVisible()

        }
        if (action === 'LogOutUser') {
            signOut(token.Email)
            props.setAlertActionModalVisible()
        }
    }
    return (
        <ModalAlertAction animationType="slide"
            transparent={true} visible={props.alertActionModalVisible} onRequestClose={() => props.setAlertActionModalVisible()}>
            <View style={styles.centeredView}>
                <View style={styles.modal_View}>
                    <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../assets/WallPaperWhite2.png')}>
                        <Text style={[appCss.modal_Txt, { paddingTop: 25, color: 'white' }]}>Alert!</Text>
                        <Text style={styles.modal_Txt}>
                            {props.text}
                        </Text>
                        <View style={styles.buttons}>
                            <Pressable style={styles.modal_Closebtn} onPress={() => Action(props.action, props.item)}>
                                <Text style={appCss.inputLabel}>Ok</Text>
                            </Pressable>
                            <Pressable style={styles.modal_Closebtn} onPress={() => props.setAlertActionModalVisible()}            >
                                <Text style={appCss.inputLabel}>Close</Text>
                            </Pressable>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </ModalAlertAction>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70,
    },
    modal_View: {
        margin: 20,
        padding: 10,
        shadowColor: "#D9D9D9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems: 'center',
        height: '40%',
        borderRadius: 30,
        elevation: 30,
        borderRadius: 30
    },
    modal_Txt: {
        padding: 20,
        alignItems: 'center',
        textAlign: 'left',
        fontWeight: "bold",
        color: 'white'
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 50,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        width: 80,
        alignItems: 'center',
        alignSelf: "center",
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        // marginBottom: 30
    },
})

