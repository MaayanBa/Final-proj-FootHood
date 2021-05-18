import React from 'react'
import { Text, StyleSheet, Image, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';


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
    header_txt: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: "bold",
    },
    waze_Icon: {
        width: 50,
        height: 30,
        tintColor: 'black',
        alignSelf: 'flex-end'

    },
    gameInformation_View_R: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    gameInformation_View_R_Down: {
        flexDirection: 'column',
        alignItems: 'center'
    },

});

const game = [
    {
        teamName: "",
        gameName: "Game 1",
        location: "Sammy Ofer",
        date: "20/6/21",
        time: "17:00",
        ageRange: "20-25",
        numberOfPlayers: 10,
    },
    {
        teamName: "",
        gameName: "Game 2",
        location: "Blumfield",
        date: "11/7/21",
        time: "17:07",
        ageRange: "17-27",
        numberOfPlayers: 17,
    }
]

export default function GameList(props) {
   
    const navToPitch = () => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=%D7%9E%D7%92%D7%A8%D7%A9+%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C'); //ניווט לכל המגרשי ספורט
    }

    let gameCards = game.map((g, key) => {
        return <TouchableOpacity key={key} style={styles.GameInformation_Touch} onPress={() => console.log(game.groupPhoto)}>
            <View style={styles.card}>
                <View style={styles.gameTitle_View}>
                    <Text style={styles.header_txt}>{g.gameName}</Text>
                </View>
                <View style={styles.gameInformation_View}>
                    <View style={styles.gameInformation_View_R}>
                        <View>
                            <Text style={styles.txtStyle}>Time: {g.time}</Text>
                            <Text style={styles.txtStyle}>Age range: {g.ageRange}</Text>
                        </View>
                        <View style={styles.gameInformation_View_R_Down}>
                            <TouchableOpacity style={appCss.blue_btn} onPress={() => console.log("btn enter game")}>
                                <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center' }]}>ENTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.gameInformation_View_L}>
                        <Text style={styles.txtStyle}>Date: {g.date}</Text>
                        <Text style={styles.txtStyle}>Number of Players: {g.numberOfPlayers}</Text>
                        <Text style={styles.txtStyle}>Location: {g.location}</Text>
                        <TouchableOpacity onPress={() => console.log("waze btn")}>
                            <Text style={styles.txtStyle}>Take me there
                            <Image source={require('../../assets/Waze.png')} resizeMode="contain" style={styles.waze_Icon} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    });
    return (
        <ScrollView>
            <View style={[appCss.container, { alignItems: 'center' }]}>
                <Text style={[appCss.title, appCss.space]}>Find Game</Text>
                <TouchableOpacity style={[appCss.btnTouch, { width: '20%' }]} onPress={() => console.log("map btn")}>
                    <Text style={appCss.txtBtnTouch}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[appCss.btnTouch, { width: '40%' }, { flexDirection: "row" }, { backgroundColor: "red" }]} onPress={() => console.log("hot games btn")}>
                    <Octicons name="flame" size={24} color="black" />
                    <Text style={appCss.txtBtnTouch}>Hot Games</Text>
                    <Octicons name="flame" size={24} color="black" />
                </TouchableOpacity>
                {gameCards}
                <TouchableOpacity style={[appCss.btnTouch, { width: '85%' }, { flexDirection: "row" },]} onPress={() =>navToPitch()}>
                    <MaterialCommunityIcons name="soccer-field" size={24} color="black" />
                    <Text style={appCss.txtBtnTouch}>Courts around your area</Text>
                    <MaterialCommunityIcons name="soccer-field" size={24} color="black" />
                </TouchableOpacity>
                <View style={[{ flexDirection: "row" }]}>
                    <TouchableOpacity style={[appCss.btnTouch, { width: '45%' }]} onPress={() => console.log("reduce results btn")}>
                        <Text style={appCss.txtBtnTouch}>Show More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}