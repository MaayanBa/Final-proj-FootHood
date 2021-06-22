import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { ListItem, Avatar } from 'react-native-elements';
import { MaterialCommunityIcons as Podium, Feather as Filter } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';
import ModalRankPlayer from './ModalRankPlayer'

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SetSearchPlayer();
      setPlayerChoosen("")
      var arr = shuffle(players)
      setAllPlayers(arr)
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => unsubscribe();
  }, [navigation]);


  const SearchPlayers = () => {
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
      alert("Please enter name")
    }

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
      <TouchableOpacity activeOpacity={0.8} onPress={() => { setPlayerChoosen(p); setOpenModal(true) }} >
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
      <TouchableOpacity activeOpacity={0.8} onPress={() => { setPlayerChoosen(p); setOpenModal(true) }} >
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={[appCss.title, appCss.space]}>Players</Text>
          <View style={styles.searchRow}>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => console.log("filterWindow")}>
              <Filter name="filter" size={28} color="white" />
            </TouchableOpacity>
            <Pressable style={styles.Btn} onPress={() => { SearchPlayers(); setFullName(""); }} >
              <Text style={appCss.inputLabel}>Search</Text>
            </Pressable>
            <TextInput style={styles.input} onChangeText={(text) => setFullName(text)} placeholder="Search" value={fullName} />
          </View>

          <View style={{ padding: 5 }}>
            <Text style={[appCss.inputLabel, { padding: 10 }]}>Search Results:</Text>
            <ScrollView style={styles.playerList_scrollView}>
              {searchedPlayerList}
            </ScrollView>
            {openModal ?
              <ModalRankPlayer
                setOpenModal={setOpenModal}
                powerRate={powerRate} setPowerRate={setPowerRate}
                attackRate={attackRate} setAttackRate={setAttackRate}
                defenceRate={defenceRate} setDefenceRate={setDefenceRate}
                selectRate={selectRate} setSelectedRate={setSelectedRate}
                playerChoosen={playerChoosen} setPlayerChoosen={setPlayerChoosen}/>
              : null}
            {searchedPlayers.length == 0 ? null :

              <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                <Pressable style={[styles.Btn]} onPress={() => Reset()} >
                  <Text style={appCss.inputLabel}>Reset</Text>
                </Pressable>
              </View>
            }
         
          </View >
        </View>
      </ScrollView>
    </SafeAreaView>
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
    // height: 300,
    // backgroundColor: "#D9D9D9",
    // borderRadius: 15,
  },
});
