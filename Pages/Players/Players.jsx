import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity, Image } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { ListItem, Avatar } from 'react-native-elements';
import { MaterialCommunityIcons as Podium, Feather as Filter } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function Players({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [playerChoosen, setPlayerChoosen] = useState("");
    const [powerRate, setPowerRate] = useState(null)
    const [defenceRate, setDefenceRate] = useState(null)
    const [attackRate, setAttackRate] = useState(null)
    const [selectRate, setSelectedRate] = useState("")
    const [sliderValue, setSliderValue] = useState(0)
    const { state: { searchedPlayers }, SearchPlayer } = useContext(TeamContext);

    const SearchPlayers = () => {
        var firstName = "";
        var lastName = "";
        var checkName = fullName.split(' ');
        if (checkName.length === 1) {
            firstName = fullName;
            lastName = null;
        }
        else if (checkName.length >= 2) {
            firstName = fullName.split(' ').slice(0, -1).join(' ');
            lastName = fullName.split(' ').slice(-1).join(' ');
        }
        const player = {
            FirstName: firstName,
            LastName: lastName
        }
        SearchPlayer(player)
    }

    const Reset = () => {
        const player = {
            FirstName: null,
            LastName: null
        }
        setSliderValue(0)
        setPowerRate(null)
        setAttackRate(null)
        setDefenceRate(null)
        setSelectedRate("")
        setPlayerChoosen("")
        SearchPlayer(player)
    }
    const SetRating = () => {
        if (selectRate == "Attack")
            setAttackRate(sliderValue)
        else if (selectRate == "Defence")
            setDefenceRate(sliderValue)
        else if (selectRate == "Power")
            setPowerRate(sliderValue)
    }

const Finish=()=>{
    if (powerRate!=0 && defenceRate!=0 && attackRate!=0) {
        console.log("Power: "+powerRate +" ,Defence: "+defenceRate+" ,Attack: "+attackRate)
        console.log(playerChoosen)
    }
    else
    alert("Please fill in all types of rank")
}
    const searchedPlayerList = searchedPlayers.map((p, key) => {
        return <ListItem key={key} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setPlayerChoosen(p.Email)} >
                <Podium name="podium-gold" size={24} color={playerChoosen == p.Email ? "#c92e5d" : "grey"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('StackNav_MyTeams', { screen: 'CardPlayer', params: { p } })} >
                <Image style={appCss.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>
    })

    return (
        <View>
            <Text style={[appCss.title, appCss.space]}>Players</Text>
            <View style={styles.searchRow}>
                <TouchableOpacity style={{ padding: 20}} onPress={() => console.log("filterWindow")}>
                    <Filter name="filter" size={28} color="white"/>
                </TouchableOpacity>
                <Pressable style={styles.Btn} onPress={() => SearchPlayers()} >
                    <Text style={appCss.inputLabel}>Search</Text>
                </Pressable>
                <TextInput style={styles.input} onChangeText={setFullName} placeholder="Search" value={fullName} />
            </View>
            {searchedPlayers.length == 0 ? null :
                <View style={{padding: 5}}>
                    <Text style={[appCss.inputLabel, { padding: 10 }]}>Search Results:</Text>
                    <ScrollView style={styles.playerList_scrollView}>
                        {searchedPlayerList}
                        <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                            <Pressable style={[styles.Btn]} onPress={() => Reset()} >
                                <Text style={appCss.inputLabel}>Reset</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        {playerChoosen == "" ? null :
                            <View>
                                <View style={appCss.rates_View}>
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
                                    style={{ width: 300, height: 30 }}
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
                                        <Text style={[appCss.inputLabel, { paddingTop: 10 }]}>{selectRate} Rating: {sliderValue}</Text>
                                    </View></View>}
                            </View>
                        }
                    </View>
                </View >
            }
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    footer: {
        alignItems: 'center'
    },
    input: {
        height: 42,
        margin: 12,
        borderWidth: 1,
        alignSelf: 'center',
        width: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingRight: 10,
        padding: 10
    },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    Btn: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
    playerList_scrollView: {
        height: 300,
        backgroundColor: "#D9D9D9",
        borderRadius: 15,
    },
});
