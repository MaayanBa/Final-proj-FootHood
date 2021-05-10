import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity,
  StatusBar, ImageBackground, Image
} from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import AppCss from '../../CSS/AppCss';
import { Context as AuthContext } from '../../Contexts/AuthContext'
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
  const { state: { token } } = useContext(AuthContext)
  const { team, teamPlayers } = props.route.params;
  const { LeaveTeam } = useContext(TeamContext);
  const [user, setUser] = useState(token)


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

  const ExitTeam = () => {
    console.log('Leave Team')
    let playerInTeam = {
      TeamSerialNum: team.TeamSerialNum,
      EmailPlayer: user.Email
    }
    console.log(playerInTeam)
    LeaveTeam(playerInTeam);
    props.navigation.navigate('MyTeams')
  }

  return (
    <SafeAreaView style={[appCss.container, styles.container_extra]} >

      {/* ImageBackGround With Buttons */}
      <ImageBackground style={styles.imgBG} source={{ uri: team.TeamPicture }}>
        <Text style={appCss.title}>{team.TeamName}</Text>
        <View style={styles.options_View}>
          <Modal_RulesAndLaws team={team} />
          {team.EmailManager !== user.Email ? null :
            <Modal_AddPlayers props={props} team={team} />
          }
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
