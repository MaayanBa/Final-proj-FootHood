import React, { useEffect, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Modal_PlayerBringsEquipment from './Modal_PlayerBringsEquipment';
import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';
import { Context as GameContext } from '../../../Contexts/GameContext';
import EquipmentList from './EquipmentList';

export default function EquipmentWindow(props) {
  const { GetItemsAssignForGame } = useContext(EquipmentContext);
  const { state: { gamesList }} = useContext(GameContext);

  useEffect(() => {
    GetItemsAssignForGame(gamesList[props.index].GameSerialNum)
  }, [])

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