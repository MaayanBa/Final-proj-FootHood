import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { ListItem, Avatar } from 'react-native-elements';
import { MaterialCommunityIcons as Podium, Feather as Filter } from '@expo/vector-icons';
import ModalRankPlayer from './ModalRankPlayer'
import ModalFilterPlayer from './ModalFilterPlayer'

export default function Players({ navigation }) {
    const { state: { searchedPlayers }, SearchPlayer, SetSearchPlayer } = useContext(TeamContext);
    const { state: { players }, GetPlayers, } = useContext(PlayerContext);
    const [fullName, setFullName] = useState("");
    const [playerChoosen, setPlayerChoosen] = useState("");
    const [powerRate, setPowerRate] = useState(null)
    const [defenceRate, setDefenceRate] = useState(null)
    const [attackRate, setAttackRate] = useState(null)
    const [allPlayers, setAllPlayers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [selectRate, setSelectedRate] = useState("")
    const [openModalFilter, setOpenModalFilter] = useState(false)
    const [filterResults, setFilterResults] = useState(null)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            SetSearchPlayer();
            setPlayerChoosen("")
            var arr = shuffle(players)
            setAllPlayers(arr)
        });
        return () => unsubscribe();
    }, [navigation]);

    const getFilterResults = (filter) => {
        setFilterResults(filter);
        console.log("Filter Results==========")
        console.log(filter)
    }

    const SearchPlayers = () => {
        setFilterResults(null)
        if (fullName !== "") {
            var firstName = "";
            var lastName = "";
            var checkName = fullName.split(' ');
            if (checkName.length === 1) {
                console.log("checkName" + checkName);
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
        } else {
            alert("Please Enter Name")
        }

    }
    const Reset = () => {
        setFilterResults(null)
        const player = {
            FirstName: null,
            LastName: null
        }
        setPowerRate(null)
        setAttackRate(null)
        setDefenceRate(null)
        setSelectedRate("")
        setPlayerChoosen("")
        SearchPlayer(player)
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

    const searchedPlayerList = searchedPlayers.length === 0 ? allPlayers.map((p, key) => {
        return <ListItem key={key} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                setPlayerChoosen(p)
                setOpenModal(true)
                setPowerRate(null)
                setAttackRate(null)
                setDefenceRate(null)
            }} >
                <Podium name="podium-gold" size={24} color={playerChoosen.Email == p.Email ? "#c92e5d" : "grey"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('StackNav_MyTeams', { screen: 'CardPlayer', params: { p } })} >
                <Image style={appCss.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
            </TouchableOpacity>
            <ListItem.Content style={{ alignItems: 'flex-end' }} >
                <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
            </ListItem.Content>
            <Avatar rounded source={{ uri: p.PlayerPicture }} />
        </ListItem>
    }) : searchedPlayers.map((p, key) => {
        return <ListItem key={key} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                setPlayerChoosen(p)
                setOpenModal(true)
                setPowerRate(null)
                setAttackRate(null)
                setDefenceRate(null)
            }} >
                <Podium name="podium-gold" size={24} color={playerChoosen.Email == p.Email ? "#c92e5d" : "grey"} />
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

    let counter = 0
    const filteredPlayerList = allPlayers.map((p, key) => {
        if (filterResults != null) {
            let playerAge = new Date().getFullYear() - new Date(p.DateOfBirth).getFullYear()
            if (filterResults.distanceRadius == 0 && filterResults.playerLoc.latitude == 0 && filterResults.playerLoc.longitude == 0) {
                if (filterResults.gender == p.Gender && (filterResults.minAge <= playerAge && filterResults.maxAge >= playerAge) && (filterResults.minRank <= p.OverallRating && filterResults.maxRank >= p.OverallRating)) {
                    counter++;
                    return <ListItem key={key} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            setPlayerChoosen(p)
                            setOpenModal(true)
                            setPowerRate(null)
                            setAttackRate(null)
                            setDefenceRate(null)
                        }} >
                            <Podium name="podium-gold" size={24} color={playerChoosen.Email == p.Email ? "#c92e5d" : "grey"} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('StackNav_MyTeams', { screen: 'CardPlayer', params: { p } })} >
                            <Image style={appCss.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
                        </TouchableOpacity>
                        <ListItem.Content style={{ alignItems: 'flex-end' }} >
                            <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
                        </ListItem.Content>
                        <Avatar rounded source={{ uri: p.PlayerPicture }} />
                    </ListItem>
                }
            }
            else {
                if (filterResults.gender == p.Gender && (filterResults.minAge <= playerAge && filterResults.maxAge >= playerAge) && (filterResults.minRank <= p.OverallRating && filterResults.maxRank >= p.OverallRating)
                    && (filterResults.playerLoc.lat >= p.LatitudeHomeCity - (filterResults.distanceRadius * 0.01) && filterResults.playerLoc.lat <= p.LatitudeHomeCity + (filterResults.distanceRadius * 0.01))
                    && (filterResults.playerLoc.lng >= p.LongitudeHomeCity - (filterResults.distanceRadius * 0.01) && filterResults.playerLoc.lng <= p.LongitudeHomeCity + (filterResults.distanceRadius * 0.01))) {
                    counter++;
                    return <ListItem key={key} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            setPlayerChoosen(p)
                            setOpenModal(true)
                            setPowerRate(null)
                            setAttackRate(null)
                            setDefenceRate(null)
                        }} >
                            <Podium name="podium-gold" size={24} color={playerChoosen.Email == p.Email ? "#c92e5d" : "grey"} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('StackNav_MyTeams', { screen: 'CardPlayer', params: { p } })} >
                            <Image style={appCss.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
                        </TouchableOpacity>
                        <ListItem.Content style={{ alignItems: 'flex-end' }} >
                            <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
                        </ListItem.Content>
                        <Avatar rounded source={{ uri: p.PlayerPicture }} />
                    </ListItem>
                }
            }
        }
    })

    return (
        <View>
            {openModalFilter ? <ModalFilterPlayer setOpenModalFilter={setOpenModalFilter} filterResults={(filter) => getFilterResults(filter)} /> : null}
            <Text style={[appCss.title, appCss.space]}>Players</Text>
            <View style={styles.searchRow}>
                <TouchableOpacity style={{ padding: 20 }} onPress={() => setOpenModalFilter(true)}>
                    <Filter name="filter" size={28} color="white" />
                </TouchableOpacity>
                <Pressable style={styles.Btn} onPress={() => { SearchPlayers(); setFullName(""); }} >
                    <Text style={appCss.inputLabel}>Search</Text>
                </Pressable>
                <TextInput style={styles.input} onChangeText={(text) => setFullName(text)} placeholder="Search" value={fullName} />
            </View>
            <View style={{ padding: 5 }}>
                <Text style={[appCss.inputLabel, { padding: 10 }]}>Search Results:</Text>
                {counter == 0 && filterResults != null ? <View><Text style={[{ alignSelf: 'center' }, appCss.noResultsTxt]}>No Results Found!{"\n"} Please Try Again</Text></View> : null}
                <ScrollView style={styles.playerList_scrollView}>
                    {filterResults == null ? searchedPlayerList : filteredPlayerList}
                </ScrollView>
                {openModal ?
                    <ModalRankPlayer
                        setOpenModal={setOpenModal}
                        powerRate={powerRate} setPowerRate={setPowerRate}
                        attackRate={attackRate} setAttackRate={setAttackRate}
                        defenceRate={defenceRate} setDefenceRate={setDefenceRate}
                        selectRate={selectRate} setSelectedRate={setSelectedRate}
                        playerChoosen={playerChoosen} setPlayerChoosen={setPlayerChoosen} />
                    : null}
                {searchedPlayers.length == 0 ? null :
                    <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                        <Pressable style={[styles.Btn]} onPress={() => Reset()} >
                            <Text style={appCss.inputLabel}>Reset</Text>
                        </Pressable>
                    </View>}
                {counter == 0 ? null :
                    <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                        <Pressable style={[styles.Btn]} onPress={() => Reset()} >
                            <Text style={appCss.inputLabel}>Reset</Text>
                        </Pressable>
                    </View>}
            </View >
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
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
        height: 460,
    },
});
