import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Modal, Pressable, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { ListItem, Avatar } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import Modal_Alert from '../Modal_Alert';

export default function ModalRankPlayer(props) {
  const { state: { token } } = useContext(AuthContext)
  // const [selectRate, setSelectedRate] = useState("")
  const { RankPlayer } = useContext(PlayerContext);
  const [sliderValue, setSliderValue] = useState(0)
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  const Finish = () => {
    if (props.powerRate > 0 && props.defenceRate > 0 && props.attackRate > 0) {
      // console.log("Power: " + props.powerRate + " ,Defence: " + props.defenceRate + " ,Attack: " + props.attackRate)
      RankPlayer(props.playerChoosen.Email, token.Email, props.powerRate, props.defenceRate, props.attackRate)
      props.setPlayerChoosen("")
      props.setOpenModal(false)
    }
    else
    setAlertModalVisible(true)
  }

  const SetRating = () => {

    if (props.selectRate == "Attack")
      props.setAttackRate(sliderValue)
    else if (props.selectRate == "Defence")
      props.setDefenceRate(sliderValue)
    else if (props.selectRate == "Power")
      props.setPowerRate(sliderValue)
  }
  return (
    <Modal animationType="slide" transparent={true} visible={props.openModal}
      onRequestClose={() => props.setOpenModal(false)}>

      <View style={styles.centeredView}>
        {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={"Please fill in all types of rank"} />}
        <View style={styles.modal_View}>
          <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
            {props.playerChoosen == "" ? null :
              <View>
                <View style={{ marginVertical: 40, justifyContent: 'space-around', flexDirection: 'row-reverse' }}>
                  <Avatar size={100} rounded source={{ uri: props.playerChoosen.PlayerPicture }} />
                  <Text style={[appCss.inputLabel, { alignSelf: 'center', fontSize: 25 }]}>{props.playerChoosen.FirstName + ' ' + props.playerChoosen.LastName} </Text>
                </View>
                <View style={[appCss.rates_View, { paddingBottom: 10 }]}>
                  <TouchableOpacity onPress={() => props.setSelectedRate("Attack")} style={props.selectRate == "Attack" ? [appCss.rate, { backgroundColor: 'orange', paddingBottom: 10 }] : [appCss.rate, { paddingBottom: 10 }]}>
                    <Text>Attack</Text>
                    {props.attackRate !== null ? <Text>{props.attackRate}</Text> : null}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.setSelectedRate("Defence")} style={props.selectRate == "Defence" ? [appCss.rate, { backgroundColor: 'orange', paddingBottom: 10 }] : [appCss.rate, { paddingBottom: 10 }]}>
                    <Text>Defence</Text>
                    {props.defenceRate !== null ? <Text>{props.defenceRate}</Text> : null}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.setSelectedRate("Power")} style={props.selectRate == "Power" ? [appCss.rate, { backgroundColor: 'orange', paddingBottom: 10 }] : [appCss.rate, { paddingBottom: 10 }]}>
                    <Text>Power</Text>
                    {props.powerRate !== null ? <Text>{props.powerRate}</Text> : null}
                  </TouchableOpacity>
                </View>
                {props.selectRate == "" ? null : <View><Slider
                  step={1}
                  style={{ width: Dimensions.get('window').width - 60, height: 30, }}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  minimumValue={0}
                  maximumValue={100}
                  inverted={true}
                  onValueChange={value => setSliderValue(value)}
                />
                  <View style={styles.searchRow}>
                    <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => Finish()} >
                      <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Finish</Text>
                    </Pressable>
                    <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => SetRating()} >
                      <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Set</Text>
                    </Pressable>
                    <Text style={[appCss.inputLabel, { paddingTop: 10 }]}>{props.selectRate} Rating: {sliderValue}</Text>
                  </View>
                </View>}
              </View>
            }
          </ImageBackground>
        </View>
      </View>
    </Modal>

  )
}

const appCss = AppCss;
const styles = StyleSheet.create({
  // footer: {
  //   alignItems: 'center'
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    top: 30
    // marginBottom: 10
  },
  modal_View: {
    margin: 5,
    padding: 10,
    shadowColor: "#D9D9D9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 20,
    height: '55%',
    borderRadius: 30
  },
  input: {
    height: 42,
    margin: 12,
    borderWidth: 1,
    alignSelf: 'center',
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingRight: 10,
    padding: 10
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10
  },
  Btn: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
  },
  playerList_scrollView: {
    height: 300,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
  },
});