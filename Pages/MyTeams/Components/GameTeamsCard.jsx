import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppCss from '../../../CSS/AppCss';
import { Avatar } from 'react-native-elements';
import { Context as GameContext } from '../../../Contexts/GameContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { MaterialCommunityIcons as Podium } from '@expo/vector-icons';


export default function GameTeamsCard(props) {
  const [cards, setCards] = useState([])
  const [activeSlide, setActiveSlide] = useState(0);
  const { state: { playersPerGame, playersPerGroups }, GetPlayers4Game, GetPlayersDivied2Groups } = useContext(GameContext);
  const { state: { players } } = useContext(PlayerContext);

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
    //GetPlayers4Game(props.game.GameSerialNum, players);
    GetPlayersDivied2Groups(props.game.GameSerialNum);
    let num = props.game.NumOfTeams;
    let arrCards = []
    for (let index = 0; index < num; index++)
      arrCards.push(imageCards[index])
    setCards(arrCards)
  }, [])

  const renderItem = ({ item, index }) => {
    // let gameCards = gamesList.map((game, index) => {
    return (
      <TouchableOpacity style={styles.group} onPress={() => console.log("")}>
        <ImageBackground style={{ width: 380, height: 430 }} source={item} >
          <Text style={styles.player_ListTitle}>{"Team " + (index + 1)}</Text>
          <View style={styles.podiumIcon}>
            <Podium name="podium-gold" size={24} color="white" />
          </View>
          {/* if user is in game&& card index=game index */}
          {
            playersPerGroups.map((p, i) => {
              if (p.GroupNumber == index + 1) {
                let player = playersPerGame.find(x => x.Email == p.EmailPlayer);

                return <View key={i} style={styles.playerList}>
                  <Text style={styles.playerText}>{player.OverallRating}</Text>
                  <Text style={styles.playerText}>{player.FirstName + ' ' + player.LastName}</Text>
                  <Avatar rounded source={{ uri: player.PlayerPicture }} />
                </View>
              }
            })
          }
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
        //loop={true}
        onSnapToItem={(index) => setActiveSlide(index)}
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
    padding: 20,
    margin: 10,
  },
  playerList: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },
  player_ListTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: 'center',
    paddingTop: 30,
    paddingBottom: 20
  },
  podiumIcon: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    marginRight: 60,
  },
  playerText: {
    color: "white",
    fontWeight: "bold",
  },
})
