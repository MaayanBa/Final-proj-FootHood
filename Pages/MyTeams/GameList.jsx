import React from 'react'
import { Text, Button, StyleSheet, Image, View, StatusBar, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width: '100%',
        paddingTop: 80,
        alignItems: 'center',
    },
    gameInformation: {
        backgroundColor: '#D9D9D9',
        padding: 15,
        width: '90%',
        borderRadius: 30,
    },
    gameInformation_Up: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    gameInformation_players: {
        fontSize: 10,
        fontWeight: "bold",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10
    },
    gameInformation_Up_Title: {
        justifyContent: 'flex-start',
        width: 350
    },
    txtGame: {
        alignSelf: 'center',
        paddingBottom: 20,
        fontWeight: "bold",
    },
    txtGame_Name: {
        alignSelf: 'center',
        fontSize: 80,
        fontWeight: "bold",
    },
    wazeIcon: {
        width: 50,
        height: 30,
        tintColor: 'white'
    },
    card: {
        flex: 0.5,
        justifyContent: 'space-evenly',
    },
    enterButton: {
        alignItems: 'center',
        width: '50',
        padding: 500,
        paddingBottom: 300,
        color: 'black'
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
    let gameCards = game.map((g, key) => {
        return <TouchableOpacity key={key} style={styles.GameInformation} onPress={() => console.log(game.groupPhoto)}>
            <View style={styles.card}>
                <View style={styles.gameInformation_Up_Title}>
                    <Text style={styles.txtGame}>{g.gameName}</Text>
                </View>
                <View style={styles.gameInformation_players}>
                    <View>
                        <Text>Date: {g.date}</Text>
                        <Text>Number of Players: {g.numberOfPlayers}</Text>
                        <Text>Location: {g.location}</Text>
                        <TouchableOpacity>
                            <Text>Take me there<Image source={require('../../assets/Waze.png')} resizeMode="contain" style={styles.wazeIcon} /></Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>Time: {g.time}</Text>
                        <Text>Age range: {g.ageRange}</Text>
                        <Button style={styles.enterButton}
                            title="ENTER"
                            onPress={() => alert('Enter button pressed')}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    });
    return (
        <View style={styles.container}>
            {gameCards}
        </View>


    );
}