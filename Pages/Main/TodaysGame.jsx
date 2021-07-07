import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Header from './Header';
import AppCss from '../../CSS/AppCss';
import { Avatar } from 'react-native-elements';


import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as TeamContext } from '../../Contexts/TeamContext'
import { Context as GameContext } from '../../Contexts/GameContext'
import { Context as PlayerContext } from '../../Contexts/PlayerContext'
import * as Notifications from 'expo-notifications';
import NotificationActions from '../../Services/NotificationActions';


export default function TodaysGame() {
    const { state: { token } } = useContext(AuthContext)
    const { state: { todaysGame }, } = useContext(GameContext);
    const [bring, setBring] = useState("")
    const [game, setGame] = useState(null)
    const [players, setPlayers] = useState([])

    useEffect(() => {
        if (todaysGame != null) {
            setBring(todaysGame.Bring)
            setGame(todaysGame.Game)
            setPlayers(todaysGame.Players)
        }
    }, [todaysGame])
    const showPlayers = players.map((p, i) => {
        return <Avatar key={i} rounded source={{ uri: p.PlayerPicture }} />
    });
    return (
        <>
            <View style={styles.container}>
                {todaysGame !== null ?
                    <View>{
                        new Date(todaysGame.Game.GameDate).toLocaleDateString() == new Date().toLocaleDateString() ?
                            <Text style={[appCss.title, { paddingTop: 20 }]}>Todays Game</Text> :
                            <Text style={[appCss.title, { paddingTop: 20 }]}>Next Game</Text>
                    }
                        <View style={styles.card}>
                            <View style={styles.details}>
                                <View style={styles.detailsRight}>
                                    <Text style={styles.detailText}>Bring: {todaysGame.Bring}</Text>
                                    <Text style={styles.detailText}>Teams: {todaysGame.Game.NumOfTeams}</Text>
                                </View>
                                <View style={styles.detailsLeft}>
                                    <Text style={styles.detailText}>Location: {todaysGame.Game.GameLocation}</Text>
                                    <Text style={styles.detailText}>Time: {todaysGame.Game.GameTime}</Text>
                                </View>
                            </View>
                            {/* {todaysGame.Players.length > 1 ? */}
                            {/* <View> */}
                            <View style={styles.border} />
                            <View style={styles.playersView}>
                                <Text style={styles.detailText}>Your Group:</Text>
                                <View style={styles.players}>
                                    {showPlayers}
                                </View>
                            </View>
                            {/* </View>  */}
                            {/* :
                            <Text style={{ alignSelf: 'center', color: 'red' }}> Your group will opend only 24 hours before game</Text>
                        } */}
                        </View>
                    </View> : null
                }
            </View>
        </>
    )
}


const appCss = AppCss;
const styles = StyleSheet.create({
    container:{
        
    },
    card: {
        backgroundColor: 'rgba(250, 252, 252, 0.4)',
        justifyContent: 'space-around',
        borderRadius: 30,
        width: Dimensions.get('window').width - 60,
        height: 150,
        margin: 10,
        padding: 5,
        // opacity:0.8
    },
    details: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        left: 10,

    },
    border: {
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderBottomEndRadius: 100,
        borderBottomStartRadius: 100,
        width: Dimensions.get('window').width - 150,
    },
    detailText: {
        fontWeight: 'bold',
        padding: 2
    },
    playersView: {
        paddingHorizontal: 10,

    },
    players: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
