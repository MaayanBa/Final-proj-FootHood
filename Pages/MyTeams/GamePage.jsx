import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, Text, StyleSheet, View, TouchableOpacity, StatusBar, Image, LogBox
} from "react-native";
import { Entypo as Pencil } from '@expo/vector-icons';
import AppCss from '../../CSS/AppCss';
import Modal_JoinRequests from './Components/Modal_JoinRequests';
import Modal_WaitingList from './Components/Modal_WaitingList';
import Equipment_Window from './Components/Equipment_Window';
import Players_Window from './Components/Players_Window';
import GameTeamsCard from './Components/GameTeamsCard';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { Context as EquipmentContext } from '../../Contexts/EquipmentContext';
import Modal_EditGame from './Components/Modal_EditGame';
import NotificationActions from '../../Services/NotificationActions';
import Modal_PlayerBringsEquipment from './Components/Modal_PlayerBringsEquipment';
import Modal_Alert from '../Modal_Alert';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export default function GamePage(props) {
  //index = GameKey || keyTeam = keyTeam
  const { index, keyTeam } = props.route.params;
  const [registered, setRegistered] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false);
  const [totalPlayer, setTotalPlayers] = useState(0);
  const { state: { myTeams } } = useContext(TeamContext);
  const { state: { token } } = useContext(AuthContext)
  const { state: { players } } = useContext(PlayerContext)
  const [user, setUser] = useState(token)
  const { state: { gamesList, playersPerGame, waitList }, RegisterGame, GetPlayers4Game, GetPlayersDivied2Groups, LeaveGame, GetAmountRegisteredPlayersEachGame, GetPlayerWaiting } = useContext(GameContext);
  const [showEditGame_Modal, setShowEditGame_Modal] = useState(false)
  const {GetAllEquipments} = useContext(EquipmentContext);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertText, setAlertText] = useState('');

  const gameDate = new Date(gamesList[index].GameDate);
  // const gameDate = new Date(); //Need to enter here game date
  const oneDay = 60 * 60 * 24 * 1000 //This give us 24 hours parmeter

  const Alert=(message)=>{
    setAlertText(message)
    setAlertModalVisible(true)
  }

  useEffect(() => {
    var totalNumPlayers = gamesList[index].NumOfTeams * gamesList[index].NumOfPlayersInTeam
    setTotalPlayers(totalNumPlayers)
    GetPlayerWaiting(gamesList[index].GameSerialNum, players)
    let isRegistered = playersPerGame.find(p => p.Email == user.Email);
    let waiting = waitList.find(p => p.Email == user.Email);
    if (isRegistered !== undefined) {
      setRegistered(true);
    }
    else {
      setRegistered(false);
      if (waiting !== undefined)
        setIsWaiting(true);
      else
        setIsWaiting(false)
    }
  }, [playersPerGame])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetPlayers4Game(gamesList[index].GameSerialNum, players)
      GetPlayersDivied2Groups(gamesList[index].GameSerialNum);
      GetAllEquipments(gamesList[index].GameSerialNum)
    });
    return () => unsubscribe();
  }, [props.navigation]);

  const JoinGame = async () => {
    let needsToWait;
    if (totalPlayer > playersPerGame.length) {
      needsToWait = false
    }
    else {
      needsToWait = true
    }
    let addPlayer2Game = {
      GameSerialNum: gamesList[index].GameSerialNum,
      EmailPlayer: user.Email,
      TeamSerialNum: myTeams[keyTeam].TeamSerialNum,
    }
    await RegisterGame(addPlayer2Game, needsToWait)
    if (needsToWait) {
      Alert("The Game Is Full! You Have Been Added To The Waiting List")
    }
    else{
      Alert("You have joined the game successfuly")
    }
    await GetPlayers4Game(gamesList[index].GameSerialNum, players)
    await GetPlayersDivied2Groups(gamesList[index].GameSerialNum);
    await GetAmountRegisteredPlayersEachGame(myTeams[keyTeam].TeamSerialNum)
    if (isWaiting == false) {
      setIsWaiting(true)
    }
  }

  const LeaveGameFunction = async () => {
    await LeaveGame(user.Email, gamesList[index].GameSerialNum)
    Alert("You have Left the game successfuly")
    await GetPlayers4Game(gamesList[index].GameSerialNum, players)
    await GetPlayersDivied2Groups(gamesList[index].GameSerialNum);
    await GetAmountRegisteredPlayersEachGame(myTeams[keyTeam].TeamSerialNum)
    if (isWaiting) {
      setIsWaiting(false)
    }
  }

  const showDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;//Builds up togther the date and time
  };

  return (
    <SafeAreaView>
      <NotificationActions navigation={props.navigation} />
      {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {myTeams[keyTeam].EmailManager !== user.Email ? null : <Modal_JoinRequests navigation={props.navigation} game={gamesList[index]} />}

            {/* Waiting List */}
            {myTeams[keyTeam].EmailManager !== user.Email ? null : <Modal_WaitingList navigation={props.navigation} game={gamesList[index]} />}
          </View>
          {/* Players Window Or Teams Cards*/}
          {(new Date() <= gameDate - oneDay) ?
            <Players_Window game={gamesList[index]} indexGame={index} keyTeam={keyTeam} />
            :
            <GameTeamsCard game={gamesList[index]} index={index} keyTeam={keyTeam} />}

          {/* Equipment Window */}
          <Equipment_Window keyTeam={keyTeam} index={index} />

          <View style={{ paddingTop: 20 }}>
            {(new Date() <= gameDate - oneDay) ? <Text style={appCss.inputLabel}>Last Registration Date: {showDate(new Date(gamesList[index].LastRegistrationDate))}</Text> : null}
            <TouchableOpacity activeOpacity={0.8} onPress={() => (registered || isWaiting) ? LeaveGameFunction() : JoinGame()} style={[appCss.btnTouch, styles.btnTouch_Extra]}>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
              <Text style={[appCss.txtBtnTouch, { padding: 5 }]}>{(registered || isWaiting) ? "Leave" : "Join"}</Text>
              <Image source={require('../../assets/ball.png')} resizeMode="contain" style={styles.imgBall} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
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

