import React, { useRef } from 'react';
import { Text, StyleSheet, View, Dimensions } from "react-native";
import AppCss from '../../../CSS/AppCss';
import Carousel from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window')

const appCss = AppCss;
const styles = StyleSheet.create({
  carousel_Container: {
    height: 250,
    flexDirection: 'row-reverse'
  },
  group: {
    borderWidth: 2,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player_ListTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    backgroundColor:'white'
  },
})


export default function GameTeamsCard() {
  const carouselRef = useRef(null);
  const carouselItems = [
    {
      title: "Team 1",
      players: "Benel,Maayan",
      color: "#90EE90",
    },
    {
      title: "Team 2",
      players: "Daniel,Guy",
      color: "#FF4500",
    },
    {
      title: "Team 3",
      players: "Nala,Lucky",
      color: "#9932CC",
    },
    {
      title: "Team 4",
      players: "check",
      color: "#7FFFD4",
    },
  ]

  const renderItem = ({ item, index }) => {
    let changingColor = item.color;
    return (
      <View style={[styles.group, { backgroundColor: changingColor }]}>
        <Text style={styles.player_ListTitle}>{item.title}</Text>
        <Text style={appCss.inputLabel}>{item.players}</Text>
      </View>
    );
  };

  return (
    <View style={styles.carousel_Container}>
      <Carousel layout={'default'}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={carouselItems}
        renderItem={renderItem}
        loop={true}
      />
    </View>
  );
}

