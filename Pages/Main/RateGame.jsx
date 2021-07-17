import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, ActivityIndicator, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { Avatar } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import Modal_Alert from '../Modal_Alert';

export default function RateGame(props) {
    const { GameSerialNum } = props.route.params;
    const { state: { token } } = useContext(AuthContext)
    const { state: { playersPerGame }, GetPlayers4Game } = useContext(GameContext);
    const { state: { players }, RankPlayerAfterGame } = useContext(PlayerContext);
    const [playerChoosen, setPlayerChoosen] = useState("");
    const [selectRate, setSelectedRate] = useState("")
    const [powerRate, setPowerRate] = useState(null)
    const [defenceRate, setDefenceRate] = useState(null)
    const [attackRate, setAttackRate] = useState(null)
    const [sliderValue, setSliderValue] = useState(0)
    const [playersToRate, setPlayersToRate] = useState([])
    const [playerRateName, setPlayerRateName] = useState('')
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetPlayers4Game(GameSerialNum, players);
        setTimeout(() => {
            setLoading(false);
        }, 3100);
    }, [props.navigation]);

    useEffect(() => {
        if (playersPerGame !== []) {
            var arr = shuffle(playersPerGame)
            let newArr = arr.filter((item) => item.Email !== token.Email);
            setPlayersToRate(newArr)
            setPlayersToRate([newArr[0], newArr[1], newArr[2]])

            if (newArr[0] !== undefined)
                setPlayersToRate([newArr[0]])
            if (newArr[1] !== undefined)
                setPlayersToRate([...playersToRate, newArr[1]])
            if (newArr[2] !== undefined)
                setPlayersToRate([...playersToRate, newArr[2]])
        }
    }, [playersPerGame])


    const SetRating = () => {
        if (selectRate == "Attack")
            setAttackRate(sliderValue)
        else if (selectRate == "Defence")
            setDefenceRate(sliderValue)
        else if (selectRate == "Power")
            setPowerRate(sliderValue)
    }

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

    const SetPlayer = (p) => {
        setPlayerChoosen(p.Email)
        setPlayerRateName(p.FirstName + ' ' + p.LastName)
    }

    const Finish = () => {
        if (powerRate > 0 && defenceRate > 0 && attackRate > 0) {
            if (powerRate === 100 && defenceRate === 100 && attackRate === 100) {
                Alert("No one is perfect except Messi and Ronaldo =)\nPlease rate more detailed the values")
            }
            else {
                RankPlayerAfterGame(playerChoosen, token.Email, powerRate, attackRate, defenceRate, GameSerialNum)
                const temp = playersToRate.filter((item) => item.Email !== playerChoosen);
                setPlayersToRate(temp)

                setPlayerChoosen("")
                setPowerRate(null)
                setAttackRate(null)
                setDefenceRate(null)
                setSelectedRate("")
            }
        }
        else
            Alert("Please fill in all types of rank")
    }

    const Alert = (message) => {
        setAlertText(message)
        setAlertModalVisible(true)
    }

    return (
        <View style={{ alignItems: 'center' }}>
            {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
            <Text style={[appCss.title, appCss.space]}>Rate Game Players</Text>
            <Text style={[appCss.inputLabel, { marginTop: 30, justifyContent: 'center' }]}>We hope that you enjoyed the game!{"\n\n"} Please rate your game friends</Text>
            <Text style={[appCss.inputLabel, { marginTop: 30, marginBottom: 30 }]}>Choose Player To Rank:</Text>
            {loading ? <View style={styles.loading}>
                <ActivityIndicator size={80} color="#0000ff" style={{ alignItems: 'center' }} />
            </View>
                :
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {playersToRate.length === 0 ? <Text style={[appCss.noResultsTxt, { textAlign: 'center' }]}>You Have Rated All The Players!{"\n"}See You Next Game!</Text>
                        :
                        playersToRate.map((p, key) => {
                            return <View key={key} style={playerChoosen == p.Email ? { padding: 20 } : { padding: 20, opacity: 0.5 }}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => SetPlayer(p)}>
                                    <Avatar size="large" rounded source={{ uri: p.PlayerPicture }} />
                                    <Text style={[appCss.inputLabel, { alignSelf: 'center', paddingTop: 20 }]}>{p.FirstName}</Text>
                                    <Text style={[appCss.inputLabel, { alignSelf: 'center' }]}>{p.LastName}</Text>
                                </TouchableOpacity>
                            </View>
                        })
                    }
                </View>}
            {playerChoosen == "" ? null :
                <View>
                    <Text style={[appCss.inputLabel, { alignSelf: 'center', marginTop: 30, marginBottom: 30 }]}>Choosen Player: {playerRateName}</Text>
                    <View style={[appCss.rates_View, { paddingBottom: 10 }]}>
                        <TouchableOpacity onPress={() => setSelectedRate("Attack")} style={selectRate == "Attack" ? [appCss.rate, { backgroundColor: 'orange', paddingBottom: 10, marginRight: 10 }] : [appCss.rate, { paddingBottom: 10, marginRight: 10 }]}>
                            <Text>Attack</Text>
                            {attackRate !== null ? <Text>{attackRate}</Text> : null}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedRate("Defence")} style={selectRate == "Defence" ? [appCss.rate, { backgroundColor: 'orange', paddingBottom: 10 }] : [appCss.rate, { paddingBottom: 10 }]}>
                            <Text>Defence</Text>
                            {defenceRate !== null ? <Text>{defenceRate}</Text> : null}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedRate("Power")} style={selectRate == "Power" ? [appCss.rate, { backgroundColor: 'orange', paddingBottom: 10, marginLeft: 10 }] : [appCss.rate, { paddingBottom: 10, marginLeft: 10 }]}>
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
                            <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => Finish()} >
                                <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Finish</Text>
                            </Pressable>
                            <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => SetRating()} >
                                <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Set</Text>
                            </Pressable>
                            <Text style={[appCss.inputLabel, { paddingTop: 10, alignSelf: 'center' }]}>{props.selectRate} Rating: {sliderValue}</Text>
                        </View>
                    </View>}
                </View>
            }
            {playersToRate.length == 0 ? <TouchableOpacity style={[appCss.btnTouch, { width: '40%', }]} onPress={() => props.navigation.navigate('Main')}>
                <Text style={appCss.txtBtnTouch}>Go Back</Text>
            </TouchableOpacity> : null}
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
    loading: {
        marginTop: 200
    },
    smallCard: {
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        height: 100,
        width: 100,
        marginRight: 10,
        backgroundColor: 'orange'
    },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10
    },
});
