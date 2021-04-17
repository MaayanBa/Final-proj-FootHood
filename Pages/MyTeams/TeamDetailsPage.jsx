import React, { useState, useContext } from 'react';
import {StyleSheet, View,SafeAreaView, ScrollView, TouchableOpacity,
  StatusBar, ImageBackground,Image
} from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {Context as TeamContext} from '../../Contexts/TeamContext';
import AppCss from '../../CSS/AppCss';
import Modal_RulesAndLaws from './Components/Modal_RulesAndLaws';
import Modal_AddPlayers from './Components/Modal_AddPlayers';

const appCss = AppCss;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  playerCardIcon_Btn: {
    width: 35,
    height: 35
  }
})

export default function TeamDetailsPage({route}) {
  const {team} = route.params;
  const { LeaveTeam } = useContext(TeamContext);

  // const team =
  // {
  //   TeamName: "Barca",
  //   TeamPicture: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
  //   teamManager: "Benel",
  //   numberOfPlayers: 10,
  //   PlayersList: [
  //     { EmailPlayer: "Lionel Messi", PlayerImg: "https://assets.laliga.com/squad/2020/t178/p19054/2048x2048/p19054_t178_2020_1_002_000.jpg" },
  //     { EmailPlayer: "Cristiano Ronaldo", PlayerImg: "https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg" },
  //     { EmailPlayer: "Neymar Jr.", PlayerImg: "https://sportshub.cbsistatic.com/i/r/2020/12/13/2106d28e-ef9a-4813-9c9e-ba468026d2e3/thumbnail/640x360/3cfd012b2f428aa2f4cf7ef9cd4b5d64/neymar-1.png" },
  //     { EmailPlayer: "Bruno Fernandes", PlayerImg: "http://therepublikofmancunia.com/wp-content/uploads/2020/06/NINTCHDBPICT000565411429-1440x684.jpg" },
  //     { EmailPlayer: "Eran Levi", PlayerImg: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2018/10/09/15390673413277_b.jpg" },
  //     { EmailPlayer: "Lionel Messi", PlayerImg: "https://assets.laliga.com/squad/2020/t178/p19054/2048x2048/p19054_t178_2020_1_002_000.jpg" },
  //     { EmailPlayer: "Cristiano Ronaldo", PlayerImg: "https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg" },
  //     { EmailPlayer: "Neymar Jr.", PlayerImg: "https://sportshub.cbsistatic.com/i/r/2020/12/13/2106d28e-ef9a-4813-9c9e-ba468026d2e3/thumbnail/640x360/3cfd012b2f428aa2f4cf7ef9cd4b5d64/neymar-1.png" },
  //     { EmailPlayer: "Bruno Fernandes", PlayerImg: "http://therepublikofmancunia.com/wp-content/uploads/2020/06/NINTCHDBPICT000565411429-1440x684.jpg" },
  //     { EmailPlayer: "Eran Levi", PlayerImg: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2018/10/09/15390673413277_b.jpg" }

  //   ],
  //   rulesAndLaws: "Hello And welcome to FootHood First Game. The rules are- Each team has 5 players and the team who wins is the team who reaches 2 goals. The game time is 8 min. If needed there is a 2 min extra time."
  // }

  const playerList = team.PlayersList.map((p, i) => (
    <ListItem key={i} bottomDivider>
      <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("player Card")} >
        <Image style={styles.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
      </TouchableOpacity>
      <ListItem.Content style={{ alignItems: 'flex-end' }} >
        <ListItem.Title>{p.EmailPlayer}</ListItem.Title>
      </ListItem.Content>
      <Avatar rounded source={{ uri: p.PlayerImg }} />
    </ListItem>
  ))

  const ExitTeam = () => { 
    console.log('Leave Team')
    let playerInTeam = {
      TeamSerialNum: team.TeamSerialNum,
      EmailPlayer: team.EmailManager 
    }
    //LeaveTeam(playerInTeam);
   }

  return (
    <SafeAreaView style={styles.container} >

      {/* ImageBackGround With Buttons */}
      <ImageBackground style={styles.imgBG} source={{ uri: team.TeamPicture }}>
        <Text style={appCss.title}>{team.TeamName}</Text>
        <View style={styles.options_View}>
          <Modal_RulesAndLaws team={team}/>
          <Modal_AddPlayers team={team}/>
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
