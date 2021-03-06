import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Avatar } from 'react-native-elements';
import { Context as GameContext } from '../../Contexts/GameContext'


export default function TodaysGame() {
    const { state: { todaysGame }, } = useContext(GameContext);
    const [bring, setBring] = useState("")
    const [game, setGame] = useState(null)
    const [players, setPlayers] = useState([])
    const oneDay = 1000*60*60*24;
    const today = new Date();
    
    useEffect(() => {
        if (todaysGame !== null && typeof todaysGame == "object") {
            setBring(todaysGame.Bring)
            setGame(todaysGame.Game)
            setPlayers(todaysGame.Players)
        }
    }, [todaysGame])

    const showPlayers = players.map((p, i) => {
        return <Avatar key={i} rounded source={{ uri: p.PlayerPicture }} />
    });

    const convertDate = (date) => {
        return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }

    const sliceTime = (time) => {
        return time.slice(0, -3);
    }

    return (
        <>
            <View style={styles.container}>
                {todaysGame != null && typeof todaysGame == "object" ?
                    <View>
                        {
                            new Date(todaysGame.Game.GameDate).toLocaleDateString() == new Date().toLocaleDateString() ?
                                <Text style={[appCss.title, { paddingTop: 20 }]}>Todays Game</Text> :
                                <Text style={[appCss.title, { paddingTop: 20 }]}>Next Game</Text>
                        }
                        <View style={styles.card}>
                            <View style={styles.details}>
                                <View style={styles.detailsRight}>
                                    <Text style={styles.detailText}><Image source={require('../../assets/Bring.png')} style={styles.ImageStyle} /> Bring: {todaysGame.Bring}</Text>
                                    <Text style={styles.detailText}><Image source={require('../../assets/VS.png')} style={styles.ImageStyle} /> Teams: {todaysGame.Game.NumOfTeams}</Text>
                                </View>
                                <View style={styles.detailsLeft}>
                                    <Text style={styles.detailText}><Image source={require('../../assets/MapPin.png')} style={styles.ImageStyle} /> Location: {todaysGame.Game.GameLocation}</Text>
                                    <Text style={styles.detailText}><Image source={require('../../assets/Calander.png')} style={styles.ImageStyle} /> Date: {convertDate(new Date(todaysGame.Game.GameDate))}</Text>
                                    <Text style={styles.detailText}><Image source={require('../../assets/Watch.png')} style={styles.ImageStyle} /> Time: {sliceTime(todaysGame.Game.GameTime)}</Text>
                                </View>
                            </View>
                            {Math.round(Math.abs((new Date(todaysGame.Game.GameDate) - today) / oneDay)) <=1 ?
                                <View>
                                    <View style={styles.border} />
                                    <View style={styles.playersView}>
                                        <Text style={[styles.detailText, { alignSelf: 'center', marginVertical: 5 }]}>Your Group:</Text>
                                        <View style={styles.players}>
                                            {showPlayers}
                                        </View>
                                    </View>
                                </View> :
                                <Text style={{ alignSelf: 'center', color: '#FFBA80' }}> Your group will show only 24 hours before game</Text>}
                        </View>
                    </View> : null
                }
            </View>
        </>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(250, 252, 252, 0.4)',
        justifyContent: 'space-around',
        borderRadius: 30,
        width: Dimensions.get('window').width - 60,
        height: 180,
        margin: 15,
        padding: 5,
        // opacity:0.8
    },
    details: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        right: 5,

    },
    border: {
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderBottomEndRadius: 100,
        borderBottomStartRadius: 100,
        width: Dimensions.get('window').width - 150,
        paddingVertical: 10
    },
    detailText: {
        fontWeight: 'bold',
        padding: 2,

    },
    detailsRight: {
        right: 5
    },
    playersView: {
        paddingHorizontal: 10,

    },
    players: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ImageStyle: {
        width: 20,
        height: 20
    }
});

