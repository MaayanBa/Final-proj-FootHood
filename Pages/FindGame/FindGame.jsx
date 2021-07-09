import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, Image as ImageCourt, View, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Octicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Modal_FilterMap from '../FindGame/Modal_FilterMap';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as JarvisContext } from '../../Contexts/JarvisContext';
import Modal_GamePlayers from '../FindGame/Modal_GamePlayers';
import TextTickerRow from '../Main/TextTickerRow';
import Modal_Alert from '../Modal_Alert';

export default function GameList(props) {
    const { state: { gamesPlayerNotRegistered }, GetGamesPlayerNotRegistered } = useContext(GameContext)
    const { state: { hotGames }, Jarvis_GetHotGames } = useContext(JarvisContext)
    const { state: { token } } = useContext(AuthContext);
    const { state: { joinRequests }, AddNewJoinRequests, GetJoinRequests } = useContext(TeamContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [choosenGame, setChoosenGame] = useState(null);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [modalPlayersVisible, setModalPlayersVisible] = useState(false);
    const [filterLocationName, setFilterLocationName] = useState("");
    const [filterDistance, setFilterDistance] = useState(0)
    const [filterLocationCord, setFilterLocationCord] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            GetGamesPlayerNotRegistered(token.Email)
            Jarvis_GetHotGames(token.Email)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [props.navigation]);


    const getLocation = (loc) => {
        setFilterLocationName(loc);
    }
    const getLocationCord = (data) => {
        setFilterLocationCord(data);
    }

    const getDistance = (radius) => {
        setFilterDistance(radius);
    }

    const Alert = (message) => {
        setAlertText(message)
        setAlertModalVisible(true)
    }

    const ResetSearch = () => {
        setFilterDistance(0)
        setFilterLocationName("")
        setFilterLocationCord({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        });
    }

    const sliceTime = (time) => {
        return time.slice(0, -3);
    }

    const convertDate = (date) => {
        return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }

    const navToPitch = () => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=%D7%9E%D7%92%D7%A8%D7%A9+%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C'); //ניווט לכל המגרשי ספורט
    }

    const sendJoinRequest = (gameSerialNum) => {
        AddNewJoinRequests(token.Email, gameSerialNum)
    }
    const openPlayerModal = (gameSerialNum) => {
        setModalPlayersVisible(true)
        setChoosenGame(gameSerialNum)
    }
    let counter = 0;
    let gameCards = gamesPlayerNotRegistered.map((g, key) => {
        if (filterDistance > 0) {
            if ((filterLocationCord.latitude >= g.GameLatitude - (filterDistance * 0.01) && filterLocationCord.latitude <= g.GameLatitude + (filterDistance * 0.01))
                && (filterLocationCord.longitude >= g.GameLongitude - (filterDistance * 0.01) && filterLocationCord.longitude <= g.GameLongitude + (filterDistance * 0.01))) {
                counter++;
                return <View key={key} style={styles.GameInformation_Touch}>
                    <View style={styles.gameInformation_View}>
                        <View style={styles.gameInformation_View_R}>
                            <View>
                                <Text style={styles.txtStyle}>Time: {sliceTime(g.GameTime)}</Text>
                                <Text style={styles.txtStyle}>Avarage age: {g.AvgPlayerAge}</Text>
                            </View>
                            <View style={styles.gameInformation_View_R_Down}>
                                <TouchableOpacity style={[appCss.blue_btn, { paddingTop: 5 }]} onPress={() => sendJoinRequest(g.GameSerialNum)}>
                                    <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center', paddingBottom: 5 }]}>Join</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.gameInformation_View_L}>
                            <Text style={styles.txtStyle}>Date: {convertDate(new Date(g.GameDate))}</Text>
                            <Text style={styles.txtStyle}>Number of Players: {g.NumOfPlayersInTeam}</Text>
                            <Text style={styles.txtStyle}>Location: {g.GameLocation}</Text>
                            <TouchableOpacity style={[appCss.blue_btn, { paddingTop: 5 }]} onPress={() => openPlayerModal(g.GameSerialNum)}>
                                <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center', paddingBottom: 5 }]}>Game Players</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        }
        else {
            return <View key={key} style={styles.GameInformation_Touch}>
                <View style={styles.gameInformation_View}>
                    <View style={styles.gameInformation_View_R}>
                        <View>
                            <Text style={styles.txtStyle}>Time: {sliceTime(g.GameTime)}</Text>
                            <Text style={styles.txtStyle}>Avarage age: {g.AvgPlayerAge}</Text>
                        </View>
                        <View style={styles.gameInformation_View_R_Down}>
                            <TouchableOpacity style={[appCss.blue_btn, { paddingTop: 5 }]} onPress={() => sendJoinRequest(g.GameSerialNum)}>
                                <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center', paddingBottom: 5 }]}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.gameInformation_View_L}>
                        <Text style={styles.txtStyle}>Date: {convertDate(new Date(g.GameDate))}</Text>
                        <Text style={styles.txtStyle}>Number of Players: {g.NumOfPlayersInTeam}</Text>
                        <Text style={styles.txtStyle}>Location: {g.GameLocation}</Text>
                        <TouchableOpacity style={[appCss.blue_btn, { paddingTop: 5 }]} onPress={() => openPlayerModal(g.GameSerialNum)}>
                            <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center', paddingBottom: 5 }]}>Game Players</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }
    });
    return (
        <View style={{ alignItems: 'center' }}>
            {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
            <Text style={[appCss.title, { marginTop: 60 }]}>Find Game</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={[appCss.btnTouch, { width: '40%', }]} onPress={() => setModalVisible(true)}>
                    <Text style={appCss.txtBtnTouch}>Filter</Text>
                </TouchableOpacity>
                {modalPlayersVisible && <Modal_GamePlayers modalPlayersVisible={modalPlayersVisible} setModalPlayersVisible={() => setModalPlayersVisible(!modalPlayersVisible)} gameSerialNum={choosenGame} navigation={props.navigation} />}
                {modalVisible && <Modal_FilterMap modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} location={(loc) => getLocation(loc)} distance={(radius) => getDistance(radius)} locationCord={(data) => getLocationCord(data)} />}
                <TouchableOpacity style={[appCss.btnTouch, { width: '40%' }, { flexDirection: "row", backgroundColor: "#FE5C5C", justifyContent: 'space-around' }]} onPress={() => hotGames.length == 0 ? Alert("You do not have Hot Games right now") : props.navigation.navigate('HotGames')}>
                    <Octicons name="flame" size={24} color="black" />
                    <Text style={appCss.txtBtnTouch}>Hot Games</Text>
                    <Octicons name="flame" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {filterDistance == 0 || counter == 0 ? null : <View style={{ paddingBottom: 5 }, { paddingTop: 5 }}><Text style={appCss.inputLabel}>Result For Games {filterDistance} KM Around {filterLocationName}:</Text></View>}
            {filterDistance > 0 && counter == 0 ? <View><Text style={appCss.noResultsTxt}>No Results Found!{"\n"} Please Try Again</Text></View> : null}
            <ScrollView style={styles.games_scrollView}>
                {gamesPlayerNotRegistered.length == 0 ? <View><Text style={appCss.noResultsTxt}>There Are No Games Available!</Text></View> : gameCards}
            </ScrollView>

            <View style={[{ flexDirection: "row" }]}>
                {filterDistance == 0 ? null : <TouchableOpacity style={[appCss.btnTouch, { marginTop: 0, width: '45%' }]} onPress={() => ResetSearch()}>
                    <Text style={appCss.txtBtnTouch}>Reset Search</Text>
                </TouchableOpacity>}
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end', flexDirection: "row", marginBottom: 74 }}>
                <TouchableOpacity style={[appCss.btnTouch, { marginTop: 5, width: Dimensions.get('window').width - 70, backgroundColor: '#03C04A', flexDirection: 'row', justifyContent: 'center' }]} onPress={() => navToPitch()}>
                    <ImageCourt source={require('../../assets/Court.png')} style={styles.court_img} />
                    <Text style={appCss.txtBtnTouch}>Courts Around You</Text>
                    <ImageCourt source={require('../../assets/Court.png')} style={styles.court_img} />
                </TouchableOpacity>
            </View>
            <TextTickerRow navigation={props.navigation} />
        </View>
    );
}

const appCss = AppCss;
const styles = StyleSheet.create({
    gameTitle_View: {
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    gameInformation_View: {
        backgroundColor: '#D9D9D9',
        padding: 20,
        width: Dimensions.get('window').width - 40,
        flexDirection: "row",
        justifyContent: 'space-between',
        borderRadius: 20,
        marginTop: 10
    },
    txtStyle: {
        paddingBottom: 20,
        fontWeight: "bold",
    },
    header_txt: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: "bold",
    },
    gameInformation_View_R: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    gameInformation_View_R_Down: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    court_img: {
        //marginBottom: 90,
        height: 35,
        width: 35,
        //alignSelf: 'flex-end',
        marginHorizontal: 20
    },
    games_scrollView: {
        height: 390,
    },
});
