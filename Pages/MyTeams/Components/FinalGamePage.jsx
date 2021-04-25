import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, Text, StyleSheet, View, Animated, TouchableOpacity, StatusBar, Image, Dimensions
} from "react-native";
import { Context as TeamContext } from '../../../Contexts/TeamContext';
import AppCss from '../../../CSS/AppCss';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

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
  equipment_Window: {
    backgroundColor: '#D9D9D9',
    padding: 25,
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 70,
    justifyContent: 'flex-end',
  },
  equipment_Title: {
    alignSelf: 'center'
  },
  txtGame: {
    alignSelf: 'center',
    fontWeight: "bold",
    marginBottom: 5,
  },
  waze_Icon: {
    width: 50,
    height: 30,
    tintColor: 'white',
  },
  carousel_Container: {
    height: 200,
  },
  carousel: {
    flex: 1,
  },
  group: {
    borderWidth: 2,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player_ListTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22
  },
})


export default function FinalGamePage() {

  const carouselRef = useRef(null);

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
  const carouselItems = [
    {
      title: "Team 1",
      players: "Benel,Maayan",
      color: "crimson",
    },
    {
      title: "Team 2",
      players: "Daniel,Guy",
      color: "lightblue",
    },
    {
      title: "Team 3",
      players: "Nala,Lucky",
      color: "green",
    },
  ]

  let equipmentList = players.map((p, key) => {
    return <View key={key}>
      <Text>{p.equipment + "-" + p.playerName}</Text>
    </View>
  })

  renderItem = ({ item, index }) => {
    let changingColor = item.color;
    return (
      <TouchableOpacity
        style={[styles.group, { backgroundColor: changingColor }]}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        <Text style={styles.player_ListTitle}>{item.title}</Text>
        <Text style={appCss.inputLabel}>{item.players}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.labels}>
            <Text style={[appCss.inputLabel, { paddingBottom: 20 }]}> Game Time: 14:00 </Text>
            <Text style={[appCss.inputLabel, { paddingBottom: 20 }]}>Game Date: 07/11/2021 </Text>
          </View>
          <View style={styles.labels}>
            <TouchableOpacity onPress={console.log("Navigate")}>
              <Image source={require('../../../assets/Waze.png')} resizeMode="contain" style={styles.waze_Icon} />
            </TouchableOpacity>
            <Text style={[appCss.inputLabel, { paddingBottom: 80 }]}>Location: Ruppin </Text>
          </View>

          <View style={styles.carousel_Container}>
            <Carousel style={styles.carousel}
              data={carouselItems}
              renderItem={renderItem}
              itemWidth={200}
              containerWidth={width - 20}
              separatorWidth={0}
              ref={carouselRef}
            //pagingEnable={false}
            //minScrollDistance={20}
            />
          </View>

          <View style={styles.equipment_Window}>
            <View style={styles.equipment_Title}>
              <Text style={styles.txtGame}>Equipment List:</Text>
            </View>
            {equipmentList}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

