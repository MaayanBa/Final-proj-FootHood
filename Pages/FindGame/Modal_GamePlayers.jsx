import React, { useEffect, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Image, Modal, Pressable, ImageBackground } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import AppCss from '../../CSS/AppCss';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';


export default function Modal_GamePlayers(props) {
    const { state: { playersPerGame }, GetPlayers4Game } = useContext(GameContext);
    const { state: { players } } = useContext(PlayerContext);

    useEffect(() => {
        GetPlayers4Game(props.gameSerialNum, players);
    }, [])

    const PlayerCard = (p) => {
        props.navigation.navigate('StackNav_MyTeams', { screen: 'CardPlayer', params: { p } })
        props.setModalPlayersVisible()
    }

    const playersInGameList = playersPerGame.map((p, i) => (
        <ListItem key={i} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => PlayerCard(p)} >
                <Image style={[appCss.playerCardIcon_Btn, { left: 5 }]} source={require('../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>
    ))

    return (
        <Modal animationType="slide"
            transparent={true} visible={props.modalPlayersVisible} onRequestClose={() => props.setModalPlayersVisible()}>
            <View style={styles.centeredView}>
                <View style={appCss.modal_View}>
                    <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
                        <Text style={[styles.modal_Txt, appCss.inputLabel, { marginTop: 10 }]}>Game Players:</Text>
                        <ScrollView style={styles.playerList_scrollView}>
                            {playersPerGame.length != 0 ? playersInGameList : <Text style={[appCss.noResultsTxt, { alignSelf: 'center' }]}>There Are No Players{"\n"}   In This Game Yet!</Text>}
                        </ScrollView>
                        <Pressable style={styles.modal_Closebtn} onPress={() => props.setModalPlayersVisible()} >
                            <Text style={appCss.inputLabel}>Close</Text>
                        </Pressable>
                    </ImageBackground>
                </View>
            </View>
        </Modal>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70
    },
    modal_Txt: {
        marginBottom: 15,
        padding: 10,
        textAlign: "center"
    },
    modal_View: {
        margin: 20,
        borderRadius: 20,
        padding: 5,
        paddingBottom: 20,
        height: '80%',
        width: '95%',
        alignSelf: 'center'
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 40,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
        marginBottom: 20,
    },
    playerList_scrollView: {
        height: 460,
    },
})
