import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Feather as CheckSquare, Feather as EmptySquare, } from '@expo/vector-icons';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import { Checkbox } from 'react-native-paper';
import DateAndTime from './Components/DateAndTime';
import { CheckBox } from 'react-native-elements'
import AppCss from '../../CSS/AppCss';
import NumOfTeamsAndPlayers from './Components/NumOfTeamsAndPlayers';
import Modal_LocationMap from './Components/Modal_LocationMap';
import {Context as GameContext} from '../../Contexts/GameContext'

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
})
const equipmentList = [
  { id: 0, title: 'Water', checked: true },
  { id: 1, title: 'Ball', checked: true },
  { id: 2, title: 'First Aid Kit', checked: false },
  { id: 3, title: 'Snacks', checked: false },
  { id: 4, title: 'Air Pump', checked: false },
];

export default function CreateNewGame() {
  const {CreatNewGame} = useContext(GameContext);
  const [equipmentList_state, setEquipmentList_state] = useState([...equipmentList])
  const [renderCB, setRenderCB] = useState(true);
  
  const [numOfTeamsState, setNumOfTeamsState] = useState(2);
  const [numOfPlayersInTeam, setNumOfPlayersInTeam] = useState(2);
  const [gameDate, setGameDate] = useState(null);
  const [gameTime, setGameTime] = useState(null);
  const [lastRegistrationDate, setLastRegistrationDate] = useState(null);
  const [lastRegistrationTime, setLastRegistrationTime] = useState(null);
  const [selectedEquipments, setSelectedEquipments] = useState(null);

  useEffect(() => {
    setRenderCB(true);
  }, [renderCB])

  const onChecked = (id) => {
    setRenderCB(false);
    let allEquipments = equipmentList_state;
    let selected = [];
    //console.log(data[id].checked)
    allEquipments[id].checked === true ? allEquipments[id].checked = false : allEquipments[id].checked = true;

    allEquipments.map(x => {
      if (x.checked)
        selected.push(x);
    })
    //setEquipmentList_state(allEquipments);
    console.log(selected)
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

  // const itemBoxes = () => {
  //   return equipmentList_state.map((item) => {
  //     return (
  //       <TouchableOpacity key={item.id} style={styles.checkBoxes} onPress={() => onChecked(item.id)} >
  //         {item.checked ?
  //           <CheckSquare size={30} name="check-square" /> :
  //           <EmptySquare size={30} name="square" />}
  //         <Text style={[appCss.inputLabel, { alignSelf: 'center' }]}>{item.title}</Text>
  //       </TouchableOpacity>
  //     )
  //   })
  // }

  const liftState = (dateGame, gameTime, dateRegistration, registrationTime) => {
    setGameDate(dateGame);
    setGameTime(gameTime);
    setLastRegistrationDate(dateRegistration)
    setLastRegistrationTime(registrationTime)
    // console.log("dateGame=" + gameDate )
    // console.log("gameTime= "+gameTime)
    // console.log("dateRegistration = " + lastRegistrationDate )
    // console.log("registrationTime = " +lastRegistrationTime)
  }
const send2Context=()=>{
  let newGame={
    game:{
      NumOfTeams:numOfTeamsState,
      NumOfPlayersInTeam:numOfPlayersInTeam,
      GameLocation:"location",
      GameDate:gameDate,
      GameTime:gameTime,
      LastRegistrationDate:lastRegistrationDate,
      LastRegistrationTime:lastRegistrationTime
    },
    // equipments:{
    //   EquipmentSerialNum:
    //   EquipmentName:
    // }
      
    
  }
  //CreatNewGame()
}
  return (
    <SafeAreaView>
      <ScrollView>
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
          <Modal_LocationMap />

          {/* Date and Time */}
          <DateAndTime liftState={liftState} />


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
