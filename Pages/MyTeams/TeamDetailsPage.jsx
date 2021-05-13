import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity,
  StatusBar, ImageBackground, Image
} from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import AppCss from '../../CSS/AppCss';
import Modal_RulesAndLaws from './Components/Modal_RulesAndLaws';
import Modal_AddPlayers from './Components/Modal_AddPlayers';

const appCss = AppCss;
const styles = StyleSheet.create({
  container_extra: {
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    padding: 20,
    marginTop: 10,
  },
  imgBG: {
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between'
  },
  options_View: {
    alignSelf: 'center',
    marginBottom: 10,
    width: 250
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 70
  },
  playerList_View: {
    marginTop: 10,
    height: '60%',
  },
  teamPlayers_Text: {
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
    color: 'white'
  },
  leaveTeam_Btn: {
    flexDirection: "row-reverse",
    margin: 15,
    justifyContent: 'flex-end',
  },
  leaveTeam_txt: {
    fontSize: 16,
    color: 'white'
  },
})


export default function TeamDetailsPage(props) {
  const { teamPlayers, key } = props.route.params;
  const { state: { myTeams }, LeaveTeam } = useContext(TeamContext);
  const [forceState, setForceState] = useState(false);

  useEffect(() => {
    //GetPlayers4Team(props.team.TeamSerialNum,myTeams);
    //console.log(props.navigation)
    props.navigation.addListener('focus', () => {
      console.log("FOCuS=======>")
    });

    //return unsubscribe;
  }, [])

  // const unsubscribe = props.navigation.addListener('tabPress', e => {
  //     // Prevent default action
  //     console.log("ndjksad")
  //     e.preventDefault();
  //   })


  const playerList = teamPlayers.map((p, i) => (
    <ListItem key={i} bottomDivider style={styles.rowPlayer_ItemList}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CardPlayer', { p })} >
        <Image style={appCss.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
      </TouchableOpacity>
      <ListItem.Content style={{ alignItems: 'flex-end' }} >
        <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
      </ListItem.Content>
      <Avatar rounded source={{ uri: p.PlayerPicture }} />
    </ListItem>
  ))

  const ForceState = () => {
    // myTeams.map(x => {
    //   if (x.TeamSerialNum === team.TeamSerialNum) {
    //     team = x;
    //   }
    // });
    // let tempArr = [];
    // team.PlayersList.forEach(p => {
    //     let player = players.find(x => x.Email === p.EmailPlayer)
    //     if (player !== null)
    //         tempArr.push(player);
    // });
    // teamPlayers = tempArr;

    // console.log("teamss====>")
    // console.log(team)
    // console.log("MYTEMSSSSSSSSSS=====>")
    // console.log(myTeams)

    console.log("state has changed")
    setForceState(!forceState);
  }
  const ExitTeam = () => {
    console.log('Leave Team')
    let playerInTeam = {
      TeamSerialNum: myTeams[key].TeamSerialNum,
      EmailPlayer: myTeams[key].EmailManager
    }
    //LeaveTeam(playerInTeam);
  }

  return (
    <SafeAreaView style={[appCss.container, styles.container_extra]} >

      {/* ImageBackGround With Buttons */}
      <ImageBackground style={styles.imgBG} source={{ uri: myTeams[key].TeamPicture }}>
        <Text style={appCss.title}>{myTeams[key].TeamName}</Text>
        <View style={styles.options_View}>
          <Modal_RulesAndLaws team={myTeams[key]} />
          <Modal_AddPlayers props={props} teamKey={key} setForceState={() => ForceState()} />
        </View>
      </ImageBackground>


      {/* Player List */}
      <View style={styles.playerList_View}>
        <Text style={styles.teamPlayers_Text}>Team Players:</Text>
        <ScrollView>
          {playerList}
        </ScrollView>
      </View>


      {/* Leave Team */}
      <TouchableOpacity style={styles.leaveTeam_Btn} onPress={() => ExitTeam()}>
        <Text style={styles.leaveTeam_txt}>Leave Team </Text>
        <Feather name="log-out" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
