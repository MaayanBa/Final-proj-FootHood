import React  from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  playersAndEquipment_Window: {
    backgroundColor: '#D9D9D9',
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
})

export default function Players_Window() {
  const players =
    [
      {
        playerName: "Daniel",
        equipment: "Ball"
      },
      {
        playerName: "Maayan",
        equipment: "Water"

      },
      {
        playerName: "Benel",
        equipment: "First Aid Kit"
      },
    ]
    let registeredPlayers = players.map((p, key) => {
      return <View key={key}>
        <Text>{p.playerName}</Text>
      </View>
    })
  return (
    <View style={styles.playersAndEquipment_Window}>
      <View style={styles.playersAndEquipment_Title}>
        <Text style={styles.txtGame}>Registerd players :</Text>
      </View>
      <View style={styles.labels}>
        {registeredPlayers}
      </View>
      <TouchableOpacity>
        <View style={styles.txtGame}>
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ color: 'red', paddingTop: 30 }}>Find another players</Animatable.Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

