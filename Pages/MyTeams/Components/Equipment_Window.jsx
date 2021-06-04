import React, { useRef, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Animated, TouchableOpacity,ScrollView } from "react-native";
import Modal_PlayerBringsEquipment from './Modal_PlayerBringsEquipment';
import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';

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

export default function EquipmentWindow(props) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { state: { gameEquipments }, GetItemsAssignForGame } = useContext(EquipmentContext);
  const { state: { players } } = useContext(PlayerContext)
  const { state: { playersPerGame }, GetPlayers4Game } = useContext(GameContext);


  useEffect(() => {
    GetItemsAssignForGame(props.game.GameSerialNum)
    GetPlayers4Game(props.game.GameSerialNum, players)
  }, [])

  useEffect(() => {
    GetItemsAssignForGame(props.game.GameSerialNum)
  }, [gameEquipments])

  let equipmentList = () => gameEquipments.map((g, key) => {
    // let player = playersPerGame.find(x => x.Email == g.EmailPlayer);
    // console.log(player.FirstName)
    // if (player !== undefined) {
    return <View key={key}>
      <Text>
        {/* {g.BringItems + "-" + player.FirstName + " " + player.LastName} */}
        {g.BringItems}
      </Text>
    </View>
    // }
  })

  return (
    <View style={styles.playersAndEquipment_Window}>
      <View style={styles.playersAndEquipment_Title}>
        <Text style={styles.txtGame}>Equipment List:</Text>
      </View>
      <ScrollView>
        {gameEquipments == "No items were assigned yet" ? <Text>There are no equipments for this game</Text> : equipmentList()}
      </ScrollView>
      <Modal_PlayerBringsEquipment game={props.game} manager={props.manager} equipments={props.equipments} />
    </View>
  );
}

