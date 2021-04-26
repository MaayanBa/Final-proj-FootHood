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
const appCss = AppCss;
const equipmentList = [
  { id: 0, title: 'Water', checked: true },
  { id: 1, title: 'Ball', checked: true },
  { id: 2, title: 'First Aid Kit', checked: false },
  { id: 3, title: 'Snacks', checked: false },
  { id: 4, title: 'Air Pump', checked: false },
];

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

export default function CreateNewGame() {
  const [equipmentList_state, setEquipmentList_state] = useState([...equipmentList])
  const [renderCB, setRenderCB] = useState(true);

  useEffect(() => {
    setRenderCB(true);
  }, [renderCB])

  const onChecked = (id) => {
    setRenderCB(false);
    let data = equipmentList_state;
    //console.log(data[id].checked)
    data[id].checked === true ? data[id].checked = false : data[id].checked = true;
    setEquipmentList_state(data);
    //setRenderCB(true);
  }

  let itemBoxes = equipmentList_state.map((item) => {
    return (<View>
      <CheckBox checked={item.checked} title={item.title} onPress={() => onChecked(item.id)} />
      <TouchableOpacity key={item.id} style={styles.checkBoxes} >
        <Text style={[styles.textStyle, { alignSelf: 'center' }]}>{item.title}</Text>
      </TouchableOpacity>
      
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[appCss.container, styles.container_extra]}>
          {/* Header */}
          <View style={styles.headerView}>
            <Text style={appCss.title}>Create New Game</Text>
          </View>

          {/* number of teams and players each team */}
          <NumOfTeamsAndPlayers />

          {/* Location */}
          <Modal_LocationMap />

          {/* Date and Time */}
          <DateAndTime />

          {/* Equipment required */}
          <View style={styles.checkBox_View}>
            <Text style={appCss.inputLabel}>Equipment List:</Text>
            {/* {itemBoxesOld} */}
            {itemBoxes}
          </View>

          {/* btn Create Game */}
          {renderCB && <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("Btn Create New Game")} style={[appCss.btnTouch, { width: "80%" }]}>
            <Text style={appCss.txtBtnTouch}>Create New Game</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
