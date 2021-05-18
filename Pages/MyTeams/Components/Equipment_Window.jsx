import React, { useRef } from 'react';
import { Text, StyleSheet, View, Animated, TouchableOpacity} from "react-native";
import { Entypo as Pencil } from '@expo/vector-icons';

const styles = StyleSheet.create({
  playersAndEquipment_Window: {
    backgroundColor: 'white',
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

export default function Players_Window() {
  const scrollX = useRef(new Animated.Value(0)).current;
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
  let equipmentList = players.map((p, key) => {
    return <View key={key}>
      <Text>{p.equipment + "-" + p.playerName}</Text>
    </View>
  })

  return (
    <View style={styles.playersAndEquipment_Window}>
      <View style={styles.playersAndEquipment_Title}>
        <Text style={styles.txtGame}>Equipment List:</Text>
      </View>
      {equipmentList}
      <TouchableOpacity onPress={console.log("Edit")} style={{ alignItems: 'flex-start' }}>
        <Pencil name="pencil" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

