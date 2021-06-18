import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, Image, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Modal_FilterMap from '../FindGame/Modal_FilterMap';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';

export default function GameList(props) {
    const { state: { gamesPlayerNotRegistered } } = useContext(GameContext)
    const { state: { token } } = useContext(AuthContext);
    const { state: { joinRequests },AddNewJoinRequests, GetJoinRequests } = useContext(TeamContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [filterLocationName, setFilterLocationName] = useState("");
    const [filterLocationCord, setFilterLocationCord] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [filterDistance, setFilterDistance] = useState(0)
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    const getLocation = (loc) => {
        setFilterLocationName(loc);
    }
    const getLocationCord = (data) => {
        setFilterLocationCord(data);
    }

    const getDistance = (radius) => {
        setFilterDistance(radius);
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

    let counter = 0;

    let gameCards = gamesPlayerNotRegistered.map((g, key) => {
        // GetJoinRequests(g.GameSerialNum)
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
                                {/* {token.Email == joinRequests.EmailPlayer && g.GameSerialNum == joinRequests.GameSerialNum ?
                                    <TouchableOpacity style={appCss.grey_btn} onPress={() => alert("You already requested to join this game! Please wait for the manager to accept your request")}>
                                        <Text style={[styles.txtStyle, { color: 'black', alignItems: 'center' }]}>Pending</Text>
                                    </TouchableOpacity> 
                                    : */}
                                     <TouchableOpacity style={appCss.blue_btn} onPress={() => sendJoinRequest(g.GameSerialNum)}>
                                        <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center' }]}>Join</Text>
                                    </TouchableOpacity>
                                    {/* } */}
                            </View>
                        </View>
                        <View style={styles.gameInformation_View_L}>
                            <Text style={styles.txtStyle}>Date: {convertDate(new Date(g.GameDate))}</Text>
                            <Text style={styles.txtStyle}>Number of Players: {g.NumOfPlayersInTeam}</Text>
                            <Text style={styles.txtStyle}>Location: {g.GameLocation}</Text>
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
                            <TouchableOpacity style={appCss.blue_btn} onPress={() => sendJoinRequest(g.GameSerialNum)}>
                                <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center' }]}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.gameInformation_View_L}>
                        <Text style={styles.txtStyle}>Date: {convertDate(new Date(g.GameDate))}</Text>
                        <Text style={styles.txtStyle}>Number of Players: {g.NumOfPlayersInTeam}</Text>
                        <Text style={styles.txtStyle}>Location: {g.GameLocation}</Text>
                    </View>
                </View>
            </View>
        }
    });

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={[appCss.container, { alignItems: 'center' }]}>
                    <Text style={[appCss.title, appCss.space]}>Find Game</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[appCss.btnTouch, { width: '40%' }]} onPress={() => setModalVisible(true)}>
                            <Text style={appCss.txtBtnTouch}>Filter</Text>
                        </TouchableOpacity>
                        {modalVisible && <Modal_FilterMap modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} location={(loc) => getLocation(loc)} distance={(radius) => getDistance(radius)} locationCord={(data) => getLocationCord(data)} />}
                        <TouchableOpacity style={[appCss.btnTouch, { width: '40%' }, { flexDirection: "row" }, { backgroundColor: "red" }]} onPress={() => console.log("hot games btn")}>
                            <Octicons name="flame" size={24} color="black" />
                            <Text style={appCss.txtBtnTouch}>Hot Games</Text>
                            <Octicons name="flame" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[appCss.btnTouch, { width: '85%' }, { flexDirection: "row" },]} onPress={() => navToPitch()}>
                        <MaterialCommunityIcons name="soccer-field" size={24} color="black" />
                        <Text style={appCss.txtBtnTouch}>Courts around your area</Text>
                        <MaterialCommunityIcons name="soccer-field" size={24} color="black" />
                    </TouchableOpacity>
                    {filterDistance == 0 || counter == 0 ? null : <View style={{ paddingBottom: 10 }, { paddingTop: 10 }}><Text style={appCss.inputLabel}>Result For Games {filterDistance} KM Around {filterLocationName}:</Text></View>}
                    {gameCards}
                    {filterDistance > 0 && counter == 0 ? <View><Text style={styles.noResultsTxt}>No Results Found!{"\n"} Please Try Again</Text></View> : null}
                    <View style={[{ flexDirection: "row" }]}>
                        {filterDistance == 0 ? null : <TouchableOpacity style={[appCss.btnTouch, { width: '45%' }]} onPress={() => ResetSearch()}>
                            <Text style={appCss.txtBtnTouch}>Reset Search</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const appCss = AppCss;

const styles = StyleSheet.create({
    GameInformation_Touch: {
        backgroundColor: '#D9D9D9',
        width: '90%',
        borderRadius: 20,
        marginTop: 10
    },
    gameTitle_View: {
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    gameInformation_View: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txtStyle: {
        paddingBottom: 20,
        fontWeight: "bold",
    },
    noResultsTxt: {
        paddingTop: 40,
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        alignItems: 'center'
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

});
