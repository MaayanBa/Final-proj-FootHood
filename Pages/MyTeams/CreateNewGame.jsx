import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, View, Text } from 'react-native';
import DateAndTime from './Components/DateAndTime';
import { CheckBox } from 'react-native-elements'
import AppCss from '../../CSS/AppCss';
import NumOfTeamsAndPlayers from './Components/NumOfTeamsAndPlayers';
import Modal_LocationMap from './Components/Modal_LocationMap';
import { Context as GameContext } from '../../Contexts/GameContext'
import { Feather as LocationFeather } from '@expo/vector-icons';

const equipmentList = [
  { id: 0, title: 'Water', checked: false },
  { id: 1, title: 'Ball', checked: false },
  { id: 2, title: 'First Aid Kit', checked: false },
  { id: 3, title: 'Snacks', checked: false },
  { id: 4, title: 'Air Pump', checked: false },
];

export default function CreateNewGame(props) {
  const { team } = props.route.params;
  const { CreatNewGame, GetGamesList } = useContext(GameContext);
  const [equipmentList_state, setEquipmentList_state] = useState([...equipmentList])
  const [renderCB, setRenderCB] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [numOfTeamsState, setNumOfTeamsState] = useState(2);
  const [numOfPlayersInTeam, setNumOfPlayersInTeam] = useState(2);
  const [gameLocation, setGameLocation] = useState(null);
  const [gameDate, setGameDate] = useState(null);
  const [gameTime, setGameTime] = useState(null);
  const [lastRegistrationDate, setLastRegistrationDate] = useState(null);
  const [lastRegistrationTime, setLastRegistrationTime] = useState(null);
  const [selectedEquipments, setSelectedEquipments] = useState(null);
  const [edit, setEdit] = useState(false);
  const [locationCord, setLocationCord] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    setRenderCB(true);
  }, [renderCB])

  const onChecked = (id) => {
    setRenderCB(false);
    let allEquipments = equipmentList_state;
    let selected = [];
    allEquipments[id].checked === true ? allEquipments[id].checked = false : allEquipments[id].checked = true;

    allEquipments.map(x => {
      if (x.checked)
        selected.push(x);
    })
    setSelectedEquipments(selected);
  }

  let itemBoxes = equipmentList_state.map((item, index) => {
    return (<View key={index}>
      <CheckBox
        checked={item.checked}
        containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
        wrapperStyle={{ flexDirection: 'row-reverse' }}
        textStyle={{ color: 'white' }}
        title={item.title}
        onPress={() => onChecked(item.id)} />
    </View>
    );
  });

  const liftState = (dateGame, gameTime, dateRegistration, registrationTime) => {
    setGameDate(dateGame);
    setGameTime(gameTime);
    setLastRegistrationDate(dateRegistration)
    setLastRegistrationTime(registrationTime)
  }
  const send2Context = async () => {
    if (gameLocation != null) {
      let equipments = [];
      if (selectedEquipments != null)
        selectedEquipments.map(e => {
          equipments.push({ EquipmentName: e.title })
        })
      let game = {
        NumOfTeams: numOfTeamsState,
        NumOfPlayersInTeam: numOfPlayersInTeam,
        GameLocation: gameLocation,
        GameDate: gameTime.toLocaleDateString(),
        GameTime: gameTime.toLocaleTimeString(),
        LastRegistrationDate: lastRegistrationTime.toLocaleDateString(),
        LastRegistrationTime: lastRegistrationTime.toLocaleTimeString(),
        TeamSerialNum: team.TeamSerialNum,
        equipmentsInGame: equipments,
        GameLatitude: locationCord.lat,
        GameLongitude: locationCord.lng,
      }
      await CreatNewGame(game, equipments);
      await GetGamesList(team.TeamSerialNum)
      //props.navigation.goBack();
    }
    else {
      alert("one or more of the field is missing")
    }
  }

  const getLocation = (loc) => {
    setGameLocation(loc);
  }

  const getLocationCord = (region) => {
    setLocationCord(region);
  }

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[appCss.container, styles.container_extra]}>
          {/* Header */}
          <View style={styles.headerView}>
            <Text style={appCss.title}>Create New Game</Text>
          </View>

          {/* number of teams and players each team */}
          <NumOfTeamsAndPlayers
            numOfTeamsState={numOfTeamsState}
            setTeams={setNumOfTeamsState}
            numOfPlayersInTeam={numOfPlayersInTeam}
            setPlayers={setNumOfPlayersInTeam}
          />

          {/* Location */}
          <View style={styles.location_View}>
            <TouchableOpacity onPress={() => setModalVisible(true)} >
              <LocationFeather name="map-pin" size={40} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <Text style={appCss.inputLabel}>Game Location:</Text>
          </View>
          {modalVisible && <Modal_LocationMap modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} location={(loc) => getLocation(loc)} locationCord={(data) => getLocationCord(data)} />}
          <Text style={[appCss.inputLabel, { textAlign: 'center', color: 'orange' }]}> {gameLocation}</Text>

          {/* Date and Time */}
          <DateAndTime liftState={liftState} edit={edit} setEdit={setEdit} />

          {/* Equipment required */}
          <View style={styles.checkBox_View}>
            <Text style={appCss.inputLabel}>Equipment List:</Text>
            {/* {itemBoxesOld} */}
            {itemBoxes}
          </View>

          {/* btn Create Game */}
          {renderCB && <TouchableOpacity activeOpacity={0.8} onPress={() => send2Context()} style={[appCss.btnTouch, { width: "80%" }]}>
            <Text style={appCss.txtBtnTouch}>Create New Game</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const appCss = AppCss;
const styles = StyleSheet.create({
  container_extra: {
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
  },
  headerView: {
    paddingTop: 40,
    alignItems: 'center',
  },
  txt_View: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  checkBox_View: {
    paddingTop: 30
  },
  checkBoxes: {
    paddingTop: 15,
    flexDirection: 'row-reverse',
    marginLeft: 50
  },
  location_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35
  },
})
