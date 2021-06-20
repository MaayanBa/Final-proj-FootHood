import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, Image as ImageCourt, View, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Octicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Modal_FilterMap from '../FindGame/Modal_FilterMap';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';

export default function GameList(props) {
    const { state: { gamesPlayerNotRegistered },GetGamesPlayerNotRegistered } = useContext(GameContext)
    const { state: { token } } = useContext(AuthContext);
    const { state: { joinRequests }, AddNewJoinRequests, GetJoinRequests } = useContext(TeamContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [filterLocationName, setFilterLocationName] = useState("");
    const [filterLocationCord, setFilterLocationCord] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            GetGamesPlayerNotRegistered(token.Email)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [props.navigation]);

    const [filterDistance, setFilterDistance] = useState(0)

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
                    </View>
                </View>
            </View>
        }
    });
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={[appCss.title, appCss.space]}>Find Game</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={[appCss.btnTouch, { width: '40%', }]} onPress={() => setModalVisible(true)}>
                    <Text style={appCss.txtBtnTouch}>Filter</Text>
                </TouchableOpacity>
                {modalVisible && <Modal_FilterMap modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} location={(loc) => getLocation(loc)} distance={(radius) => getDistance(radius)} locationCord={(data) => getLocationCord(data)} />}
                <TouchableOpacity style={[appCss.btnTouch, { width: '40%' }, { flexDirection: "row", backgroundColor: "#FE5C5C", justifyContent: 'space-around' }]} onPress={() => console.log("hot games btn")}>
                    <Octicons name="flame" size={24} color="black" />
                    <Text style={appCss.txtBtnTouch}>Hot Games</Text>
                    <Octicons name="flame" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {filterDistance == 0 || counter == 0 ? null : <View style={{ paddingBottom: 10 }, { paddingTop: 10 }}><Text style={appCss.inputLabel}>Result For Games {filterDistance} KM Around {filterLocationName}:</Text></View>}
            <ScrollView style={styles.games_scrollView}>
                {gameCards}
            </ScrollView>

            {filterDistance > 0 && counter == 0 ? <View><Text style={styles.noResultsTxt}>No Results Found!{"\n"} Please Try Again</Text></View> : null}
            <View style={[{ flexDirection: "row" }]}>
                {filterDistance == 0 ? null : <TouchableOpacity style={[appCss.btnTouch, { width: '45%' }]} onPress={() => ResetSearch()}>
                    <Text style={appCss.txtBtnTouch}>Reset Search</Text>
                </TouchableOpacity>}
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end', flexDirection: "row", marginBottom: 20,paddingTop:70 }}>
                <ImageCourt source={require('../../assets/Court.png')} style={styles.court_img} />
                <TouchableOpacity style={[appCss.btnTouch, { width: Dimensions.get('window').width - 180, backgroundColor: '#03C04A' }]} onPress={() => navToPitch()}>
                    <Text style={appCss.txtBtnTouch}>Courts Around You</Text>
                </TouchableOpacity>
                <ImageCourt source={require('../../assets/Court.png')} style={styles.court_img} />
            </View>
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
    court_img: {
        //marginBottom: 90,
        height: 45,
        width: 45,
        //alignSelf: 'flex-end',
        marginHorizontal: 20
    },
    games_scrollView: {
        height: 340
      },
});
