import React, { useRef,useEffect } from 'react';
import { Text, StyleSheet, View, Animated, TouchableOpacity} from "react-native";
import Modal_PlayerBringsEquipment from './Modal_PlayerBringsEquipment';

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

export default function EquipmentWindow(props) {
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
    useEffect(() => {
      // console.log(props.game)
    }, [])
    
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
      <Modal_PlayerBringsEquipment game={props.game}/>
    </View>
  );
}

