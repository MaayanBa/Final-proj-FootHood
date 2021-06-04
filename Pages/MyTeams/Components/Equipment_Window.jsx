import React, { useRef, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Animated, TouchableOpacity, ScrollView } from "react-native";
import Modal_PlayerBringsEquipment from './Modal_PlayerBringsEquipment';
import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import EquipmentList from './EquipmentList';


export default function EquipmentWindow(props) {
  const index = props.index;
  const keyTeam = props.keyTeam;
  // const scrollX = useRef(new Animated.Value(0)).current;
  const { state: { gameEquipments }, GetItemsAssignForGame } = useContext(EquipmentContext);
  const { state: { players } } = useContext(PlayerContext)
  const { state: { gamesList, playersPerGame }, GetPlayers4Game } = useContext(GameContext);


  useEffect(() => {
    GetItemsAssignForGame(gamesList[index].GameSerialNum)
    GetPlayers4Game(gamesList[index].GameSerialNum, players)
  }, [])

  // useEffect(() => {
  //   GetItemsAssignForGame(gamesList[index].GameSerialNum)
  // }, [gameEquipments])


  return (
    <View style={styles.playersAndEquipment_Window}>
      <View style={styles.playersAndEquipment_Title}>
        <Text style={styles.txtGame}>Equipment List:</Text>
      </View>
      <ScrollView>
        <EquipmentList />
      </ScrollView>
      <Modal_PlayerBringsEquipment index={props.index} keyTeam={props.keyTeam} />
    </View>
  );
}

const styles = StyleSheet.create({
  playersAndEquipment_Window: {
    backgroundColor: 'white',
    height: 200,
    padding: 25,
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 25,
  },
  playersAndEquipment_Title: {
    alignSelf: 'center'
  },
  txtGame: {
    alignSelf: 'center',
    fontWeight: "bold",
    marginBottom: 5,
  },
})