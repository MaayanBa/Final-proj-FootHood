import React, { useState, useContext } from 'react';
import {
  StyleSheet, TextInput,
  View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar,
  Image, LogBox
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik } from "formik";
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';
//import {navigate} from '../../Navigations/navigationRef'
import AppCss from '../../CSS/AppCss';
import Modal_AddPlayers from './Components/Modal_AddPlayers';
import Modal_Alert from '../Modal_Alert';

//Fix YellowBox Error
LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e.']);

const newTeamValidationSchema = yup.object().shape({
  teamName: yup
    .string()
    .required('Team Name is Required'),
})

const footballRules = "‣A match consists of two 45 minutes halves with a 15 minute rest period in between.\n‣Each team can have a minimum off 11 players (including 1 goalkeeper who is the only player allowed to handle the ball within the 18 yard box) and a minimum of 7 players are needed to constitute a match.\n‣The field must be made of either artificial or natural grass. The size of pitches is allowed to vary but must be within 100-130 yards long and 50-100 yards wide. The pitch must also be marked with a rectangular shape around the outside showing out of bounds, two six yard boxes, two 18 yard boxes and a centre circle. A spot for a penalty placed 12 yards out of both goals and centre circle must also be visible.\n‣The ball must have a circumference of 58-61cm and be of a circular shape.\n‣Each team can name up to 7 substitute players. Substitutions can be made at any time of the match with each team being able to make a maximum of 3 substitutions per side. In the event of all three substitutes being made and a player having to leave the field for injury the team will be forced to play without a replacement for that player.\n‣If the game needs to head to extra time as a result of both teams being level in a match then 30 minutes will be added in the form of two 15 minute halves after the allotted 90 minutes.\n‣If teams are still level after extra time then a penalty shootout must take place.\n‣The whole ball must cross the goal line for it to constitute as a goal.\n‣For fouls committed a player could receive either a yellow or red card depending on the severity of the foul; this comes down to the referee’s discretion. The yellow is a warning and a red card is a dismissal of that player. Two yellow cards will equal one red. Once a player is sent off then they cannot be replaced.\n‣If a ball goes out of play off an opponent in either of the side lines then it is given as a throw in. If it goes out of play off an attacking player on the base line then it is a goal kick. If it comes off a defending player it is a corner kick.\n\nEnjoy! ";
const streetFootballRules = "‣Teams- Street team can have between 4-8 player including the goalkeeper depending on the pitch size. Which teams play first? The first 2 team that all their players have arrived at the game.\n‣Who is the goalkeeper? You decided between you, or do a lottery, and the chosen player must stand in goal for all the game no matter how many goals he conceded. The player can stand in goal? In his turn to stand, he will wait outside or unless someone from his team volunteers to replace him in goal. The team can change the goalkeeper anytime if needed- even before or during penalty shootout. If a player is exhausted and want to go in goal he can do so, but he still has to be the goalkeeper in his turn.\n‣Kickoff- A player of one of the teams kick the ball from the center of the pitch upwards, and you only allowed to touch the ball once it hits the floor for the first time.\n‣Match Time- Street Football match can be between 5-10 minutes, depends on the number of teams. If extra time is need, 2 minutes will be added on.\n‣If the game ends in a draw, the winner will be decided through a penalty shootout. Each team takes one penalty, and if there is a draw, the time that was longer on the pitch are off.\n‣Final Attack- ONLY ENDS AFTER THE BALL GOES BEHIND THE GOAL FOR A GOAL KICK. If after a whole minute the ball is still in the game, the attack will end with any case the ball is out of play (behind the goal and sides of the pitch). If 2 minutes are over, the game is finished no matter where the ball is. There is a gentleman agreement between teams not to kick the ball out on purpose.\n‣Substitution- If a player is injured during the game, the team can pick a player in the same level to replace him.\n‣Out- Throw ins are taken only with hand/leg, you cannot score directly from a throw in. The opposition players should stand at least 2 steps away from the throw in.\n‣Handball- Any ball kicked on the player while is hand are close to the body, does not count as a handball. If there is a doubt, the player who touch the ball decides if it’s a handball or not. A goalkeeper can not catch a ball passed by his on players with his hands. In that case the other team gets 2-tap free kick. If a goal is prevented on purpose using the hands (not including the goalkeeper) a goal is given automatically.\n‣Foul- You ask for one? You get one! The fouled player should declare foul 3 seconds maximum after the foul has been committed. Screaming and moaning without asking for a foul, is unacceptable.\n‣Free Kick- The wall must stand 3 steps away from the free kick. The 3 steps are measured by the length of the legs of the player who takes the free kick. You can not stand behind the ball if you are not the free-kick taker. If the goalkeeper needs time to arrange his wall, he should ask for it, else anything is acceptable.\n‣The ball is out of the pitch- if the ball is behind the goal, it’s the responsibility of the goalkeeper on that side to get the ball. If the ball is booted far away it’s the responsibility of the kicking player to get back the ball- even if it hits someone on the way. When the opponent player goes to get the ball, there is a need to wait until he fully returns to the pitch in order to restart the game.\n\nEnjoy! ";



export default function CreateNewTeam(props) {
  const { state: { token } } = useContext(AuthContext);
  const { CreateNewTeam } = useContext(TeamContext);
  const [emailManager, setEmailManager] = useState(token.Email)
  const [privateOrPublic, setPrivateOrPublic] = useState('public');
  const [TeamImageUri, setimageUri] = useState(null);
  const [addPlayer, setAddPlayer] = useState(false)
  const [autoRules, setAutoRules] = useState('')
  const [addedPlayers, setAddedPlayers] = useState([])
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertText, setAlertText] = useState('');

  const btnOpenGalery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
    });

    if (!result.cancelled) {
      console.log(result.uri);
      setimageUri(result.uri);
    }
  };

  const Alert = (message) => {
    setAlertText(message)
    setAlertModalVisible(true)
}

  const CreateTeam = async (values) => {
    if (TeamImageUri !== null) {
      let priOpub = false; //private or public 
      privateOrPublic === 'public' ? priOpub = false : null;
      let newTeam = {
        TeamName: values.teamName,
        TeamPicture: TeamImageUri,
        IsPrivate: priOpub,
        RulesAndLaws: autoRules,
        EmailManager: emailManager,
        PlayersList: addedPlayers
      }
      await CreateNewTeam(newTeam);
      props.navigation.navigate('MyTeams')
    }
    else {
      Alert("You must to choose a picture")
    }

  }
  return (
    <SafeAreaView>
      <ScrollView>
      {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
        <View style={[styles.container, { padding: 20, paddingTop: 60 }]}>
          <Text style={[appCss.title, { paddingBottom: 20 }]}>Create A New Team</Text>
          <Formik
            validationSchema={newTeamValidationSchema}
            initialValues={{
              teamName: '',
              isPrivate: '',
              rulesAndLaws: '',
              addPlayers: '',
              TeamPicture: '',
            }}
            onSubmit={(values) => CreateTeam(values)}
          >
            {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
              <>
                <Text style={appCss.inputLabel}>Team Picture:</Text>
                {TeamImageUri == null ?
                  <TouchableOpacity onPress={() => btnOpenGalery()} style={styles.imageButton}>
                    <Feather name="image" size={100} color="white" />
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={() => btnOpenGalery()} style={styles.imageButton}>
                    <Avatar.Image size={100} source={{ uri: TeamImageUri }} />
                  </TouchableOpacity>
                }

                <Text style={appCss.inputLabel}>Team Name:</Text>
                <View style={appCss.sectionStyle}>
                  <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                  <TextInput
                    name="teamName"
                    placeholder="Team Name"
                    onChangeText={handleChange('teamName')}
                    value={values.teamName}
                  />

                </View>
                {errors.teamName &&
                  <Text style={{ fontSize: 12, color: 'red', alignSelf: 'center' }}>{errors.teamName}</Text>
                }

                <Text style={appCss.inputLabel}>Private Or Public?</Text>
                <View style={styles.privateOrPublic}>
                  <TouchableOpacity>
                    <Text style={appCss.inputLabel}>Public</Text>
                    <RadioButton
                      label="First item"
                      value="public"
                      status={privateOrPublic === 'public' ? 'checked' : 'unchecked'}
                      onPress={() => setPrivateOrPublic('public')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={appCss.inputLabel}>Private</Text>
                    <RadioButton
                      value="private"
                      status={privateOrPublic === 'private' ? 'checked' : 'unchecked'}
                      onPress={() => setPrivateOrPublic('private')}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={appCss.inputLabel}>Teams Rules And Laws:</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={[appCss.btnTouch, { marginTop: 10, width: '40%' }]} onPress={() => setAutoRules(streetFootballRules)}>
                    <Text style={appCss.txtBtnTouch}>Street Rules</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[appCss.btnTouch, { marginTop: 10, width: '40%', }]} onPress={() => setAutoRules(footballRules)}>
                    <Text style={appCss.txtBtnTouch}>Football Rules</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rulesSectionStyle}>
                  <TextInput
                    name="rulesAndLaws"
                    placeholder="Enter here the rules and laws of the team"
                    multiline={true}
                    onChangeText={setAutoRules}
                    value={autoRules}
                    style={[styles.textInput, { padding: 10 }]}
                  />
                </View>

                <Modal_AddPlayers props={props} addedPlayers={addedPlayers} setAddedPlayers={setAddedPlayers} />

                <TouchableOpacity activeOpacity={0.8} disabled={!isValid} onPress={handleSubmit} style={[appCss.btnTouch, { width: '60%' }]}>
                  <Text style={appCss.txtBtnTouch}>Create New Team</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const appCss = AppCss;
const styles = StyleSheet.create({
  imageButton: {
    alignItems: 'center'
  },
  formGroup: {
    padding: 5,
  },
  createTeamButton: {
    alignItems: 'center',
    width: '10',
    padding: 70
  },
  textboxes: {
    alignItems: 'center',
  },
  textInput: {
    padding: 2
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  rulesSectionStyle: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  privateOrPublic: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 2
  },
  addPlayersBtns: {
    flexDirection: "row-reverse",
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
  },
})
