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
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Context as GameContext } from '../../Contexts/GameContext'



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
  const {game,key} = props.route.params;
  const [registered, setRegistered] = useState(false)
  const { state: { myTeams} } = useContext(TeamContext);
  const { state: { token } } = useContext(AuthContext)
  const [user, setUser] = useState(token)
  const { state: { gamesList }, RegisterGame } = useContext(GameContext);


  const gameDate = new Date("2021-05-29T20:00:00Z"); //Need to enter here game date
  const oneDay = 60 * 60 * 24 * 1000 //This give us 24 hours parmeter

  const JoinGame = () => {
    console.log(myTeams[key].TeamSerialNum)
    console.log("Join Game Button")
    let gameSerialNum = game.GameSerialNum
    console.log(gameSerialNum)
    console.log(user.Email)
    let addPlayer2Game = {
      GameSerialNum: gameSerialNum,
      EmailPlayer: user.Email,
      TeamSerialNum: myTeams[key].TeamSerialNum,
    }
    RegisterGame(addPlayer2Game)
    setRegistered(true)
    alert("You have joined the game successfuly")
    // console.log(new Date(game.GameDate))
    // console.log(new Date()-0)
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
            <Text style={[appCss.inputLabel, { paddingBottom: 20 }]}>Game Date: {showDate(new Date(game.GameDate))} </Text>
          </View>

          {/* Join Requests */}
          <Modal_JoinRequests />

          {/* Players Window Or Teams Cards*/}
          {(new Date() <= gameDate - oneDay) ? <Players_Window game={game}/> : <GameTeamsCard game={game}/>}

          {/* Equipment Window */}
          <Equipment_Window game={game}/>

          <View style={{ paddingTop: 20 }}>
            {(new Date() <= gameDate - oneDay) ? <Animatable.Text animation="pulse" easing="ease-out"
              iterationCount="infinite" style={appCss.inputLabel}>Last Registration Date: {showDate(new Date(game.LastRegistrationDate))}</Animatable.Text>
              : null}
            {registered?
            <TouchableOpacity activeOpacity={0.8} onPress={()=>LeaveGame()} style={[appCss.btnTouch, styles.btnTouch_Extra]}>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
              <Text style={[appCss.txtBtnTouch, { padding: 5 }]}>Leave</Text>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
            </TouchableOpacity>
            : <TouchableOpacity activeOpacity={0.8} onPress={()=>JoinGame()} style={[appCss.btnTouch, styles.btnTouch_Extra]}>
            <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
            <Text style={[appCss.txtBtnTouch, { padding: 5 }]}>Join</Text>
            <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
          </TouchableOpacity>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
