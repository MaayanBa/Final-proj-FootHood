import React, { useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import Carousel from 'react-native-anchor-carousel';
import AppCss from '../../../CSS/AppCss';

const { width } = Dimensions.get('window');

const appCss = AppCss;
const styles = StyleSheet.create({
  carousel_Container: {
    height: 200,
    flexDirection:'row-reverse'
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


export default function GameTeamsCard() {
  const carouselRef = useRef(null);
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
    {
      title: "Team 4",
      players: "check",
      color: "black",
    },
  ]


  const renderItem = ({ item, index }) => {
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
    <View style={styles.carousel_Container}>
      <Carousel style={styles.carousel}
        data={carouselItems}
        renderItem={renderItem}
        initialIndex={0}
        itemWidth={200}
        containerWidth={width - 20}
        //separatorWidth={0}
        ref={carouselRef}
        loop={false}
      //pagingEnable={false}
      //minScrollDistance={20}
      />
    </View>
  );
}

