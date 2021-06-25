import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { Avatar } from 'react-native-elements';
import Slider from '@react-native-community/slider';

export default function RateGame(props) {
    const { index, keyTeam } = props.route.params;
    const { state: { myTeams } } = useContext(TeamContext);
    const { state: { gamesList, playersPerGame }, GetPlayers4Game } = useContext(GameContext);
    const { state: { players } } = useContext(PlayerContext);
    const [playerChoosen, setPlayerChoosen] = useState("");
    const [selectRate, setSelectedRate] = useState("")
    const [powerRate, setPowerRate] = useState(null)
    const [defenceRate, setDefenceRate] = useState(null)
    const [attackRate, setAttackRate] = useState(null)
    const [sliderValue, setSliderValue] = useState(0)
    const [playerToRate, setPlayerToRate] = useState([playersPerGame])

    useEffect(() => {
        GetPlayers4Game(gamesList[index].GameSerialNum, players);
        var arr = shuffle(playersPerGame)
        // setPlayerToRate([arr[0], arr[1], arr[2]])
    }, [])

    const SetRating = () => {
        if (selectRate == "Attack")
            setAttackRate(sliderValue)
        else if (selectRate == "Defence")
            setDefenceRate(sliderValue)
        else if (selectRate == "Power")
            setPowerRate(sliderValue)
    }

    const showDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;//Builds up togther the date and time
    };

    const shuffle = (array) => {
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const playerToRateView = playersPerGame.map((p, key) => {
        return <View key={key} style={styles.smallCard}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setPlayerChoosen(p.Email)} style={{paddingTop:10}} >
                <Avatar size="large" rounded source={{ uri: p.PlayerPicture }}/>                
                {/* {console.log(playerChoosen)} */}
            </TouchableOpacity>
        </View>
    })

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={[appCss.title, appCss.space]}>Rate Game Players</Text>
            <Text style={[appCss.inputLabel, { marginTop: 30 }]}>Game Date: {showDate(new Date(gamesList[index].GameDate))}</Text>
            <Text style={[appCss.inputLabel, { marginTop: 30, marginBottom: 30 }]}>Rank Your Team mates</Text>
            {playerToRateView}
            {playerChoosen == "" ? null :
                <View>
                    <View style={[appCss.rates_View, { paddingBottom: 10 }]}>
                        <TouchableOpacity onPress={() => setSelectedRate("Attack")} style={[appCss.rate, { paddingBottom: 10 }]}>
                            <Text>Attack</Text>
                            {attackRate !== null ? <Text>{attackRate}</Text> : null}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedRate("Defence")} style={[appCss.rate, { paddingBottom: 10 }]}>
                            <Text>Defence</Text>
                            {defenceRate !== null ? <Text>{defenceRate}</Text> : null}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedRate("Power")} style={[appCss.rate, { paddingBottom: 10 }]}>
                            <Text>Power</Text>
                            {powerRate !== null ? <Text>{powerRate}</Text> : null}
                        </TouchableOpacity>
                    </View>
                    {selectRate == "" ? null : <View><Slider
                        step={1}
                        style={{ width: Dimensions.get('window').width - 60, height: 30, }}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        minimumValue={0}
                        maximumValue={100}
                        inverted={true}
                        onValueChange={value => setSliderValue(value)}
                    />
                        <View style={styles.searchRow}>
                            <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => SetRating()} >
                                <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Set</Text>
                            </Pressable>
                            <Text style={[appCss.inputLabel, { paddingTop: 10, alignSelf: 'center' }]}>{props.selectRate} Rating: {sliderValue}</Text>
                        </View>
                    </View>}
                </View>
            }
        </View>
    );
}

const appCss = AppCss;
const styles = StyleSheet.create({
    Btn: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
    smallCard: {
        alignItems:'center',
        borderRadius:20,
        backgroundColor: 'white',
        height:150,
        width:120
    }
});
