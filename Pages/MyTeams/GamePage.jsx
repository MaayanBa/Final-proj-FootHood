import React, { useState, useContext, useEffect, useRef } from 'react';
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
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { Context as EquipmentContext } from '../../Contexts/EquipmentContext';
import Modal_EditGame from './Components/Modal_EditGame';


export default function GamePage(props) {
  //index = GameKey || keyTeam = keyTeam
  const { index, keyTeam } = props.route.params;
  const [registered, setRegistered] = useState(false)
  const { state: { myTeams } } = useContext(TeamContext);
  const { state: { token } } = useContext(AuthContext)
  const { state: { players } } = useContext(PlayerContext)
  const [user, setUser] = useState(token)
  const { state: { gamesList, playersPerGame, registeredTo }, RegisterGame, GetPlayers4Game, GetPlayersDivied2Groups,LeaveGame } = useContext(GameContext);
  const [showEditGame_Modal, setShowEditGame_Modal] = useState(false)
  const { state: { equipments }, GetAllEquipments } = useContext(EquipmentContext);
  //const gameDate = new Date("2021-05-29T20:00:00Z"); //Need to enter here game date
  const gameDate = new Date(); //Need to enter here game date
  const oneDay = 60 * 60 * 24 * 1000 //This give us 24 hours parmeter

  useEffect(() => {
    // console.log(playersPerGame)
    let isRegistered = playersPerGame.find(p => p.Email == user.Email);
    if (isRegistered !== undefined)
      setRegistered(true);
    else
      setRegistered(false);
  }, [playersPerGame])

  useEffect(() => {
    GetPlayers4Game(gamesList[index].GameSerialNum, players)
    GetPlayersDivied2Groups(gamesList[index].GameSerialNum);
    GetAllEquipments(gamesList[index].GameSerialNum)
  }, [])

  const JoinGame = async() => {
    let addPlayer2Game = {
      GameSerialNum: gamesList[index].GameSerialNum,
      EmailPlayer: user.Email,
      TeamSerialNum: myTeams[keyTeam].TeamSerialNum,
    }
    await RegisterGame(addPlayer2Game)
    await GetPlayers4Game(gamesList[index].GameSerialNum, players)
    await GetPlayersDivied2Groups(gamesList[index].GameSerialNum);

  }
  const LeaveGameFunction =async () => {
    await LeaveGame(user.Email,gamesList[index].GameSerialNum)
    await GetPlayers4Game(gamesList[index].GameSerialNum, players)
    await GetPlayersDivied2Groups(gamesList[index].GameSerialNum);

  }
  const showDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;//Builds up togther the date and time
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.labels}>
            {myTeams[keyTeam].EmailManager !== user.Email ? null :
              <View>
                <TouchableOpacity onPress={() => setShowEditGame_Modal(!showEditGame_Modal)}>
                  <Pencil name="pencil" size={24} color="black" />
                </TouchableOpacity>
                {showEditGame_Modal ? <Modal_EditGame game={gamesList[index]} indexGame={index} keyTeam={keyTeam} showEditGame_Modal={showEditGame_Modal} setShowEditGame_Modal={() => setShowEditGame_Modal()} /> : null}
              </View>

            }
            <Text style={[appCss.inputLabel, { paddingBottom: 30 }]}>Game Date: {showDate(new Date(gamesList[index].GameDate))} </Text>
          </View>

          {/* Join Requests */}
          {myTeams[keyTeam].EmailManager !== user.Email ? null : <Modal_JoinRequests game={gamesList[index]} />}

          {/* Players Window Or Teams Cards*/}
          {(new Date() <= gameDate - oneDay) ? <Players_Window game={gamesList[index]} /> : <GameTeamsCard game={gamesList[index]} index={index}/>}

          {/* Equipment Window */}
          <Equipment_Window game={gamesList[index]} manager={myTeams[keyTeam].EmailManager} equipments={equipments}/>

          <View style={{ paddingTop: 20 }}>
            {(new Date() <= gameDate - oneDay) ? <Text style={appCss.inputLabel}>Last Registration Date: {showDate(new Date(gamesList[index].LastRegistrationDate))}</Text> : null}

            <TouchableOpacity activeOpacity={0.8} onPress={() => registered ? LeaveGameFunction() : JoinGame()} style={[appCss.btnTouch, styles.btnTouch_Extra]}>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
              <Text style={[appCss.txtBtnTouch, { padding: 5 }]}>{registered ? "Leave" : "Join"}</Text>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


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

