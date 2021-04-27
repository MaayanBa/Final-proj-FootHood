import React, { useState, useContext, useRef } from 'react';
import {
  SafeAreaView, ScrollView, Text, StyleSheet, View, Animated, TouchableOpacity, StatusBar, Image
} from "react-native";
import { Entypo as Pencil } from '@expo/vector-icons';
// import { Context as TeamContext } from '../../Contexts/TeamContext';
import AppCss from '../../CSS/AppCss';
import * as Animatable from 'react-native-animatable';
import Modal_JoinRequests from '../MyTeams/Components/Modal_JoinRequests';
import Equipment_Window from '../MyTeams/Components/Equipment_Window';
import Players_Window from '../MyTeams/Components/Players_Window';
import GameTeamsCard from './Components/GameTeamsCard';

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
  imgBall: {
    width: 50,
    height: 30,
  },
  btnTouch_Extra: {
    flexDirection: 'row',
    width: '60%',
  },
})

export default function GamePage(props) {
  const {game} = props.route.params;

  const gameDate = new Date("2021-04-29T20:00:00Z"); //Need to enter here game date
  const oneDay = 60 * 60 * 24 * 1000 //This give us 24 hours parmeter

  const JoinGame = () => {
    console.log("Join Game Button")
  }

  const showDate = (date) => {
    return `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()}`;//Builds up togther the date and time
};

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.labels}>
            <TouchableOpacity onPress={console.log("Edit")}>
              <Pencil name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[appCss.inputLabel, { paddingBottom: 20 }]}>Game Date: {game.GameDate} </Text>
          </View>

          {/* Join Requests */}
          <Modal_JoinRequests />

          {/* Players Window Or Teams Cards*/}
          {(new Date() <= gameDate - oneDay) ? <Players_Window game={game}/> : <GameTeamsCard game={game}/>}

          {/* Equipment Window */}
          <Equipment_Window game={game}/>

          <View style={{ paddingTop: 20 }}>
            {(new Date() <= gameDate - oneDay) ? <Animatable.Text animation="pulse" easing="ease-out"
              iterationCount="infinite" style={appCss.inputLabel}>Last Registration Date: {game.LastRegistrationDate}</Animatable.Text>
              : null}
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
