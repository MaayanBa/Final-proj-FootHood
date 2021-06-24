import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Avatar, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import { getLocation, geocodeLocationByName } from '../../../Services/location-service';

export default function Players_Window(props) {
  const { state: { gamesList,playersPerGame }, GetPlayers4Game,GetGamesList,Jarvis_FindPlayers4Game } = useContext(GameContext);
  const { state: { players } } = useContext(PlayerContext);
  const { state: { myTeams } } = useContext(TeamContext);
  const [findPlayersActivated, setFindPlayersActivated] = useState(gamesList[props.indexGame].FindPlayersActive);
  const [region, setRegion] = useState(null)
  useEffect(() => {
    GetPlayers4Game(gamesList[props.indexGame].GameSerialNum, players);
    //checkIfJarvisActiveted();
    // console.log(props.game.GameLocation)

    geocodeLocationByName(gamesList[props.indexGame].GameLocation).then(
      (data) => {
        if (data === undefined || data === null) {
          alert("there is a problem with the location cordinats")
        }
        else {
          setRegion({
            latitude: data.lat,
            longitude: data.lng,
          });
        }
      }
    )

  }, [])

  // const checkIfJarvisActiveted = () =>{
  // }
  const activeFindPlayers = async () => {
    if (region != null) {
      await Jarvis_FindPlayers4Game(gamesList[props.indexGame].TeamSerialNum,gamesList[props.indexGame].GameSerialNum,gamesList[props.indexGame].AvgPlayerAge, gamesList[props.indexGame].AvgPlayerRating, region)
      setFindPlayersActivated(true);
      GetGamesList(myTeams[props.keyTeam].TeamSerialNum)

    }
    else
      alert("Something went wrong please go to Home page and try again")
  }

  const registeredPlayers = playersPerGame.map((p, key) => {
    return <ListItem key={key} style={styles.playerInGameList}>
      <ListItem.Content style={{ alignItems: 'flex-end' }} >
        <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
      </ListItem.Content>
      <Avatar rounded source={{ uri: p.PlayerPicture }} />
    </ListItem>
  })

  return (
    <View style={styles.playersAndEquipment_Window}>
      <View style={styles.playersAndEquipment_Title}>
        <Text style={styles.txtGame}>Registerd players :</Text>
      </View>
      <ScrollView style={styles.playerList_scrollView}>
        {registeredPlayers}
      </ScrollView>
      <View style={styles.txtGame}>
        {!findPlayersActivated ?
          <TouchableOpacity onPress={() => activeFindPlayers()}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ color: 'red', paddingTop: 30 }}>Find new players!</Animatable.Text>
          </TouchableOpacity>
          : <Text style={[styles.txtGame, { color: "#D9D9D9", paddingTop: 30 }]}> Jarvis Is Looking For New Players </Text>}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  playersAndEquipment_Window: {
    backgroundColor: 'white',
    padding: 25,
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 15
  },
  playersAndEquipment_Title: {
    alignSelf: 'center'
  },
  txtGame: {
    alignSelf: 'center',
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  playerList_scrollView: {
    width: '100%',
    height: 200
  },
  playerInGameList: {
    backgroundColor: '#D9D9D9',

  }
})