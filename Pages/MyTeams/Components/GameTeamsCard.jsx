import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppCss from '../../../CSS/AppCss';

const { width: screenWidth } = Dimensions.get('window')

const appCss = AppCss;
const styles = StyleSheet.create({
  carousel_Container: {
    flex: 1,
  },
  group: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10
  },
  player_ListTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: 'center',
    paddingTop: 30
  },
})

export default function GameTeamsCard(props) {
  const [cards, setCards] = useState([])
  const [activeSlide,setActiveSlide] = useState(0);

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
      <TouchableOpacity style={styles.group} onPress={() => console.log("")}>
        <ImageBackground style={{ width: 350, height: 400 }} source={item} >
          <Text style={styles.player_ListTitle}>{"item.title"}</Text>
          <Text style={appCss.inputLabel}>{item.players}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.carousel_Container}>
      <Carousel layout={'default'}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={cards}
        renderItem={renderItem}
        loop={true}
        onSnapToItem={(index) => setActiveSlide(index) }
      />

     <Pagination
      dotsLength={cards.length}
      activeDotIndex={activeSlide}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
    </View>
  );
}

