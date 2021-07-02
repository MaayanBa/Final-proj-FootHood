import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity,
  StatusBar, ImageBackground, Image, Alert
} from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import Modal_RulesAndLaws from './Components/Modal_RulesAndLaws';
import Modal_AddPlayers from './Components/Modal_AddPlayers';
import NotificationActions from '../../Services/NotificationActions';


export default function TeamDetailsPage(props) {
  const { key } = props.route.params;
  const { state: { myTeams, teamPlayers }, setTeamPlayers, LeaveTeam, GetTeamDetails, RemoveFromTeam } = useContext(TeamContext);
  const { state: { players } } = useContext(PlayerContext);
  const { state: { token } } = useContext(AuthContext)
  const [user, setUser] = useState(token)
  const [forceState, setForceState] = useState(false);
  const [newKey, setNewKey] = useState(key);
  // const [pushedLeave, setPushedLeave] = useState(false);

  const RemovePlayer = async (p) => {
    let playerInTeam = {
      TeamSerialNum: myTeams[newKey].TeamSerialNum,
      EmailPlayer: p.Email
    }
    await RemoveFromTeam(playerInTeam)
    await GetTeamDetails(token.Email);
    // setForceState(!forceState);

  }

  useEffect(() => {
    ForceState()
  }, [myTeams])

  const RemoveBtn = (p) =>
    Alert.alert(
      "Remove Player",
      "Do you want to remove " + p.FirstName + " " + p.LastName + " From the team? ",
      [
        {
          text: "OK",
          onPress: () => RemovePlayer(p),
          style: "ok"
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

      ]
    );

  const ForceState = async () => {
    setTeamPlayers(myTeams[newKey], players);
    setForceState(!forceState);
  }

  const ExitTeam = async () => {

    if (myTeams.length > 1)
      myTeams.length - 1 == newKey ? setNewKey(newKey - 1) : null


    let playerInTeam = {
      TeamSerialNum: myTeams[newKey].TeamSerialNum,
      EmailPlayer: user.Email
    }

    props.navigation.navigate('MyTeams');
    props.navigation.navigate('Main');

    await LeaveTeam(playerInTeam)
    await props.navigation.navigate('Main');



    alert("You have left the team successfully");

    // props.navigation.goBack();
    // props.navigation.goBack();
    // //GetTeamDetails(token.Email);
    // props.navigation.goBack();
  }

  return (
    <SafeAreaView style={[appCss.container, styles.container_extra]} >
      <NotificationActions navigation={props.navigation} />
      {console.log(myTeams[newKey])}
      {/* ImageBackGround With Buttons */}
      <ImageBackground style={styles.imgBG} source={{ uri: myTeams[newKey].TeamPicture }}>
        <Text style={appCss.title}>{myTeams[newKey].TeamName}</Text>
        <View style={styles.options_View}>
          <Modal_RulesAndLaws team={myTeams[newKey]} />
          {myTeams[newKey].EmailManager !== user.Email ? null :
            <Modal_AddPlayers props={props} teamKey={newKey} setForceState={() => ForceState()} />
          }
        </View>
      </ImageBackground>

      {/* Player List */}
      <View style={styles.playerList_View}>
        <Text style={styles.teamPlayers_Text}>Team Players:</Text>
        <ScrollView>
          {/* {playerList} */}
          {
            teamPlayers.map((p, i) => (
              <View key={i}>
                <ListItem style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CardPlayer', { p })} >
                    <Image style={[appCss.playerCardIcon_Btn, { left: 5 }]} source={require('../../assets/PlayerCardIcon.png')} />
                  </TouchableOpacity>
                  {user.Email !== myTeams[newKey].EmailManager ? null :
                    p.Email !== myTeams[newKey].EmailManager ?
                      <TouchableOpacity style={[appCss.x_TouchIcon, {}]} activeOpacity={0.8} onPress={() => RemoveBtn(p)} >
                        <Image style={appCss.xIcon} source={require('../../assets/X.png')} />
                      </TouchableOpacity> : null
                  }

                  <ListItem.Content style={{ alignItems: 'flex-end' }} >
                    <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
                  </ListItem.Content>
                  <Avatar rounded source={{ uri: p.PlayerPicture }} />
                </ListItem>
              </View>))
          }
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