import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Pressable, ImageBackground, Image } from 'react-native';
import AppCss from '../../../CSS/AppCss';
import DateAndTime from './DateAndTime';
import NumOfTeamsAndPlayers from './NumOfTeamsAndPlayers';
import { Feather as LocationFeather } from '@expo/vector-icons';
import Modal_LocationMap from '../Components/Modal_LocationMap';
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import { Context as GameContext } from '../../../Contexts/GameContext';


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
        elevation: 20,
        height: '80%',
        borderRadius: 30
    },
    modal_Txt: {
        marginBottom: 15,
        padding: 10,
        textAlign: "center"
    },
    btnText: {
        alignSelf: 'center',
        fontWeight: "bold",
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 10,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        alignSelf: "center",
    },
    location_View: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 35,
    },
    btns_View: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default function Modal_EditGame(props) {
    const { state: { myTeams } } = useContext(TeamContext);
    const { state: { gamesList }, EditGameDetailes } = useContext(GameContext);
    const [numOfTeamsState, setNumOfTeamsState] = useState(props.game.NumOfTeams);
    const [numOfPlayersInTeam, setNumOfPlayersInTeam] = useState(props.game.NumOfPlayersInTeam);
    const [modalVisible, setModalVisible] = useState(false);
    const [gameLocation, setGameLocation] = useState(props.game.GameLocation);
    const [gameDate, setGameDate] = useState(new Date(props.game.GameDate).toLocaleDateString());
    const [gameTime, setGameTime] = useState(props.game.GameTime);
    const [lastRegistrationDate, setLastRegistrationDate] = useState(new Date(props.game.LastRegistrationDate).toLocaleDateString());
    const [lastRegistrationTime, setLastRegistrationTime] = useState(props.game.LastRegistrationTime);
    const [editOrNew, setEditOrNew] = useState(true)


    const liftState = (dateGame, gameTime, dateRegistration, registrationTime) => {
        setGameDate(dateGame);
        setGameTime(gameTime);
        setLastRegistrationDate(dateRegistration)
        setLastRegistrationTime(registrationTime)
    }
    const getLocation = (loc) => {
        setGameLocation(loc);
    }
    const Approve = () => {
        let game = {}
        game.NumOfTeams = numOfTeamsState
        game.NumOfPlayersInTeam = numOfPlayersInTeam
        game.GameLocation = gameLocation
        game.GameDate = new Date(gameDate).toLocaleDateString()
        typeof gameTime !== 'string' ? game.GameTime = gameTime.toLocaleTimeString() : game.GameTime =gameTime
        game.LastRegistrationDate = new Date(lastRegistrationDate).toLocaleDateString()
        typeof lastRegistrationTime !== 'string' ? game.LastRegistrationTime = lastRegistrationTime.toLocaleTimeString() :game.LastRegistrationTime = lastRegistrationTime
        game.TeamSerialNum = myTeams[props.keyTeam].TeamSerialNum
        game.GameSerialNum = gamesList[props.indexGame].GameSerialNum

        // let game = { 
        //     NumOfTeams: numOfTeamsState,
        //     NumOfPlayersInTeam: numOfPlayersInTeam,
        //     GameLocation: gameLocation,
        //     GameDate: gameDate.toLocaleDateString(),
        //     GameTime: gameTime.toLocaleTimeString(),
        //     LastRegistrationDate: lastRegistrationDate.toLocaleDateString(),
        //     LastRegistrationTime: lastRegistrationTime.toLocaleTimeString(),
        //     TeamSerialNum: myTeams[props.keyTeam].TeamSerialNum,
        //     GameSerialNum: gamesList[props.indexGame].GameSerialNum
        // }
        EditGameDetailes(game);
        props.setShowEditGame_Modal(false)
    }
    return (

        <Modal animationType="slide"
            transparent={true} visible={props.showEditGame_Modal}
            onRequestClose={() => props.setShowEditGame_Modal(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modal_View}>

                    <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
                        <View style={{ margin: 20 }}>
                            <NumOfTeamsAndPlayers
                                numOfTeamsState={numOfTeamsState}
                                setTeams={setNumOfTeamsState}
                                numOfPlayersInTeam={numOfPlayersInTeam}
                                setPlayers={setNumOfPlayersInTeam}
                            />

                            <DateAndTime edit={editOrNew} setEdit={(change) => setEditOrNew(change)} gameDate={gameDate} gameTime={gameTime} lastRegistrationDate={lastRegistrationDate} lastRegistrationTime={lastRegistrationTime} liftState={liftState} />

                            {/* Location */}
                            <View style={styles.location_View}>
                                <TouchableOpacity onPress={() => setModalVisible(true)} >
                                    <LocationFeather name="map-pin" size={40} color="white" style={{ marginLeft: 10 }} />
                                </TouchableOpacity>
                                <Text style={appCss.inputLabel}>Game Location:</Text>
                            </View>
                            {modalVisible && <Modal_LocationMap modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} location={(loc) => getLocation(loc)} />}
                            <Text style={[appCss.inputLabel, { textAlign: 'center', color: 'orange' }]}> {gameLocation}</Text>

                            <View style={styles.btns_View}>
                                <Pressable style={styles.modal_Closebtn} onPress={() => props.setShowEditGame_Modal(false)} >
                                    <Text style={appCss.inputLabel}>Close</Text>
                                </Pressable>
                                <Pressable style={styles.modal_Closebtn} onPress={() => Approve()} >
                                    <Text style={appCss.inputLabel}>Approve</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </Modal >
    )
}
