import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, FlatList, ImageBackground, Image } from "react-native";
import Carousel from 'react-native-anchor-carousel';
import AppCss from '../../../CSS/AppCss';
//import { FlatListSlider } from 'react-native-flatlist-slider';

const { width } = Dimensions.get('window');

const appCss = AppCss;
const styles = StyleSheet.create({
  carousel_Container: {
    //height: 200,
    flex: 1,
    writingDirection:'ltr'
  },
  carousel: {
    //flex: 1,
  },
  group: {
    // borderWidth: 2,
    // height: 200,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10
  },
  player_ListTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22
  },
})


export default function GameTeamsCard(props) {
  const [randomNum, setRandomNum] = useState(null)
  const [cards, setCards] = useState([])
  const carouselRef = useRef(null);
  const imageCards = [
    require('../../../assets/Cards/Orange.png'),
    require('../../../assets/Cards/Blue.png'),
    require('../../../assets/Cards/Silver.png'),
    require('../../../assets/Cards/Red.png'),
    require('../../../assets/Cards/Green.png'),
    require('../../../assets/Cards/Sky.png'),
    require('../../../assets/Cards/Yellow.png'),
    require('../../../assets/Cards/Gray.png'),
    require('../../../assets/Cards/Pink.png'),
    require('../../../assets/Cards/Purple.png')
  ];

  useEffect(() => {
    let num = props.game.NumOfTeams;
    let arrCards = []
    for (let index = 0; index < num; index++)
      arrCards.push(imageCards[index])
    setCards(arrCards)
  }, [])


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.group} onPress={() => console.log(index)}>
        <ImageBackground style={{ width: 150, height: 300 }} source={item} >

          <Text style={styles.player_ListTitle}>{item.title}</Text>
          <Text style={appCss.inputLabel}>{item.players}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.carousel_Container}>
      {/* <Carousel style={styles.carousel}
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
      /> */}
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        horizontal
      />

    </View>
  );
}

