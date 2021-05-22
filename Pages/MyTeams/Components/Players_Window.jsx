import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Avatar, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';

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

export default function Players_Window(props) {
  const { state: { playersPerGame }, GetPlayers4Game } = useContext(GameContext);
  const { state: { players } } = useContext(PlayerContext);

  useEffect(() => {
    GetPlayers4Game(props.game.GameSerialNum,players);
  }, [])



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
      <TouchableOpacity>
        <View style={styles.txtGame}>
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ color: 'red', paddingTop: 30 }}>Find new players!</Animatable.Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

