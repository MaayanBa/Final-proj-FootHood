import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, Image, View, StatusBar, TouchableOpacity } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as GameContext } from '../../Contexts/GameContext';


const appCss = AppCss;

const styles = StyleSheet.create({
    GameInformation_Touch: {
        backgroundColor: '#D9D9D9',
        width: '90%',
        borderRadius: 30,
        marginTop: 30
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

})

const game = [
    {
        teamName: "",
        gameName: "Game 1",
        location: "Sammy Ofer stadium",
        date: "4/4/21",
        time: "17:00",
        ageRange: "20-25",
        numberOfPlayers: 10,
    },
    {
        teamName: "",
        gameName: "Game 2",
        location: "Blumfield",
        date: "11/4/21",
        time: "17:07",
        ageRange: "17-27",
        numberOfPlayers: 17,
    }
]

export default function GameList(props) {
    const { state: { gamesList }, GetGamesList } = useContext(GameContext);
    const {team} = props.route.params;

    useEffect(() => {
        GetGamesList(team.TeamSerialNum)
    }, [])

// const GetGameDate=(date)=>{
//     console.log(date.getFullYear())
//     var gameDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     return gameDate;
// }

    let gameCards = gamesList.map((game, key) => {
        return <TouchableOpacity key={key} style={styles.GameInformation_Touch} onPress={() =>  props.navigation.navigate('GamePage', { game })}>
            <View style={styles.card}>
                {/* <View style={styles.gameTitle_View}>
                    <Text style={styles.header_txt}>{g.gameName}</Text>
                </View> */}
                <View style={styles.gameInformation_View}>
                    <View style={styles.gameInformation_View_R}>
                        <View>
                            <Text style={styles.txtStyle}>Time: {game.GameTime}</Text>
                            <Text style={styles.txtStyle}>Age range: {game.AvgPlayerAge}</Text>
                        </View>
                        <View style={styles.gameInformation_View_R_Down}>
                            <TouchableOpacity style={appCss.blue_btn} onPress={()=> console.log("btn enter game")}>
                                <Text style={[styles.txtStyle,{color: 'white', alignItems:'center'}]}>ENTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.gameInformation_View_L}>
                        <Text style={styles.txtStyle}>Date: {game.GameDate}</Text>
                        <Text style={styles.txtStyle}>Number of Players: {game.NumOfPlayersInTeam}</Text>
                        <Text style={styles.txtStyle}>Location: {game.GameLocation}</Text>
                        <TouchableOpacity >
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
        <View style={[appCss.container,{alignItems: 'center',paddingTop:30}]}>
            {gameCards}
        </View>
    );
}