import React, { useState, useContext, useRef } from 'react';
import {
  SafeAreaView, ScrollView, Text, StyleSheet, View, Animated, TouchableOpacity, StatusBar, Image
} from "react-native";
import { Entypo as Pencil } from '@expo/vector-icons';
import { } from '@expo/vector-icons';

import { Context as TeamContext } from '../../Contexts/TeamContext';
import AppCss from '../../CSS/AppCss';
import * as Animatable from 'react-native-animatable';
import Modal_JoinRequests from './Components/Modal_JoinRequests';

const appCss = AppCss;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "lightblue",
    paddingHorizontal: 135,
    paddingVertical: 60,
    borderRadius: 100,
    justifyContent: "space-between"
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  labels: {
    flexDirection: "row",
    justifyContent: 'flex-end',
  },
  title: {
    alignItems: 'center',
    padding: 40,
    color: 'black',
    fontSize: 30,
    paddingBottom: 50
  },
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
  imgBall: {
    width: 50,
    height: 30,
  },
  btnTouch_Extra: {
    flexDirection: 'row',
    width: '60%',
  },
  waze_Icon: {
    width: 50,
    height: 30,
    tintColor: 'white',
  },
})

export default function GamePage() {
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
  const equipment =
    [
      {
        equipment: "Ball, Water, First-Aid"
      }
    ];

  let registeredPlayers = players.map((p, key) => {
    return <View key={key}>
      <Text>{p.playerName + ","}</Text>
    </View>
  })

  let equipmentList = players.map((p, key) => {
    return <View key={key}>
      <Text>{p.equipment + "-" + p.playerName}</Text>
    </View>
  })

  const JoinGame = () => {
    console.log("Join Game Button")
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.labels}>
            <Text style={[appCss.inputLabel, { paddingBottom: 20 }]}> Game Time: 14:00</Text>
            <Text style={[appCss.inputLabel, { paddingBottom: 20 }]}>Game Date: 07/11/2021 </Text>
          </View>
          <View style={styles.labels}>
            <TouchableOpacity onPress={console.log("Navigate")}>
              <Image source={require('../../assets/Waze.png')} resizeMode="contain" style={styles.waze_Icon} />
            </TouchableOpacity>
            <Text style={[appCss.inputLabel, { paddingBottom: 20 }]}>Location: Ruppin </Text>
          </View>
          <Modal_JoinRequests />
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
          <View style={styles.playersAndEquipment_Window}>
            <View style={styles.playersAndEquipment_Title}>
              <Text style={styles.txtGame}>Equipment List:</Text>
            </View>
            {equipmentList}
            <TouchableOpacity onPress={console.log("Edit")} style={{ alignItems: 'flex-start' }}>
              <Pencil name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 30 }}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={appCss.inputLabel}>Last Registration Date: 10/11/21</Animatable.Text>
            <TouchableOpacity activeOpacity={0.8} onPress={JoinGame()} style={[appCss.btnTouch, styles.btnTouch_Extra]}>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
              <Text style={[appCss.txtBtnTouch, { padding: 5 }]}>Join/Leave</Text>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

