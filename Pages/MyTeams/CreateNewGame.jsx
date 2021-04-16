import React, { useState, useEffect } from 'react'
import {
  StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, View, Text,
  StatusBar, Modal, Dimensions, Pressable
} from 'react-native';
// import { Formik } from "formik";
// import * as yup from 'yup';
import {
  Feather as Minus,
  Feather as Plus,
  Feather as LocationFeather,
  Feather as CheckSquare,
  Feather as EmptySquare,
} from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import { Checkbox } from 'react-native-paper';
import DateAndTime from './Components/DateAndTime';
//import { CheckBox } from 'react-native-elements'
import AppCss from '../../CSS/AppCss';

const appCss = AppCss;
const equipmentList = [
  { id: 0, title: 'Water', checked: true },
  { id: 1, title: 'Ball', checked: true },
  { id: 2, title: 'First Aid Kit', checked: false },
  { id: 3, title: 'Snacks', checked: false },
  { id: 4, title: 'Air Pump', checked: false },
];

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: "100%",
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
  },
  headerView: {
    paddingTop: 40,
    alignItems: 'center',
  },
  plusAndMinus_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35
  },
  plusAndMinus_Btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    alignSelf: 'center'

  },
  plusAndMinus_Numbers: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 24,
  },
  txt_View: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  txt_Label: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 16,
  },
  location_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35
  },
  modal_View: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '90%',
    width: '90%',

  },
  modal_Txt: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: 'black'
  },
  map_Container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map_BtnClose: {
    backgroundColor: "#2196F3",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,

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
  const [numOfTeamsState, setnumOfTeamsState] = useState(2);
  const [numOfPlayersInTeam, setnumOfPlayersInTeam] = useState(2)
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 32.342668849189536,
    longitude: 34.91228681110108,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });
  const [destination, setDestination] = useState(null)
  const [equipmentList_state, setEquipmentList_state] = useState([...equipmentList])
  const [renderCB, setRenderCB] = useState(true);

  const modalLocationMap = <Modal animationType="slide"
    transparent={true} visible={modalVisible}
    onRequestClose={() => {
      alert("You have closed the map.");
      setModalVisible(!modalVisible);
    }}
  >
    {/* <View style={styles.centeredView}> */}
    <View style={styles.modal_View}>
      <Text style={styles.modal_Txt}>Choose Location:</Text>
      <View style={styles.map_Container}>
        <MapView
          onPress={(pos) => { console.log(pos.nativeEvent.coordinate); }}
          style={{ flex: 1, width: Dimensions.get('window').width - 70, height: '70%' }}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}
        >
          <Marker draggable
            coordinate={region}
            onDragEnd={(e) => setDestination({ destination: e.nativeEvent.coordinate })}
          />
        </MapView>
      </View>
      {/* <Text style={styles.modalText}>Map Here</Text> */}
      <Pressable
        style={styles.map_BtnClose}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={appCss.inputLabel}>Close Map</Text>
      </Pressable>
    </View>
    {/* </View> */}
  </Modal>

  const ChangeNum_state = (change, state) => {
    let num = 0;
    state === 'numOfTeamsState' ? num = numOfTeamsState : num = numOfPlayersInTeam;

    if (change === 'minus') {
      num > 2 ?
        state === 'numOfTeamsState' ? setnumOfTeamsState(num - 1) : setnumOfPlayersInTeam(num - 1)
        :
        alert('The Minimum number of Teams is 2')
    }
    else if (change === 'plus') {
      state === 'numOfTeamsState' ?
        num < 10 ? setnumOfTeamsState(num + 1) : alert('The Maximum number of Teams is 10')
        :
        num < 11 ? setnumOfPlayersInTeam(num + 1) : alert('The Maximum Players in each Team is 11')

    }
  }

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

  // let itemBoxesOld = equipmentList_state.map((item) => {
  //   return (
  //     <TouchableOpacity key={item.id} style={styles.checkBoxes} >
  //       <Checkbox status={item.checked} onPress={() => onChecked(item.id)} />
  //       <Text style={[styles.textStyle, { alignSelf: 'center' }]}>{item.title}</Text>
  //     </TouchableOpacity>
  //   );
  // });

  const itemBoxes = () => {
    return equipmentList_state.map((item) => {
      return (
        <TouchableOpacity key={item.id} style={styles.checkBoxes} onPress={() => onChecked(item.id)} >
          {item.checked ?
            <CheckSquare size={30} name="check-square" /> :
            <EmptySquare size={30} name="square" />}
          <Text style={[appCss.inputLabel, { alignSelf: 'center' }]}>{item.title}</Text>
        </TouchableOpacity>
      )
    })
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerView}>
            <Text style={appCss.title}>Create New Game</Text>
          </View>

          {/* number of teams */}
          <View style={styles.plusAndMinus_View}>
            <View style={styles.plusAndMinus_Btns}>
              <TouchableOpacity onPress={() => ChangeNum_state('plus', 'numOfTeamsState')}>
                <Plus name="plus" size={35} color="white" />
              </TouchableOpacity>
              <Text style={styles.plusAndMinus_Numbers}>{numOfTeamsState}</Text>
              <TouchableOpacity onPress={() => ChangeNum_state('minus', 'numOfTeamsState')}>
                <Minus name="minus" size={35} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.txt_View}>
              <Text style={styles.txt_Label}>Number Of Teams:</Text>
            </View>
          </View>

          {/* number of player each team */}
          <View style={styles.plusAndMinus_View}>
            <View style={styles.plusAndMinus_Btns}>
              <TouchableOpacity onPress={() => ChangeNum_state('plus', 'numOfPlayersInTeam')}>
                <Plus name="plus" size={35} color="white" />
              </TouchableOpacity>
              <Text style={styles.plusAndMinus_Numbers}>{numOfPlayersInTeam}</Text>

              <TouchableOpacity onPress={() => ChangeNum_state('minus', 'numOfPlayersInTeam')}>
                <Minus name="minus" size={35} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.txt_View}>
              <Text style={styles.txt_Label}>Players In Teams:</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.location_View}>
            <TouchableOpacity onPress={() => setModalVisible(true)} >
              <LocationFeather name="map-pin" size={40} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <Text style={styles.txt_Label}>Game Location:</Text>
            {modalLocationMap}
          </View>

          {/* Date and Time */}
          <DateAndTime />

          {/* Equipment required */}
          <View style={styles.checkBox_View}>
            <Text style={styles.txt_Label}>Equipment List:</Text>
            {/* {itemBoxesOld} */}
            {renderCB && itemBoxes()}
          </View>



          {/* btn Create Game */}
          {renderCB && <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("Btn Create New Game")} style={[appCss.btnTouch,{width:"80%"}]}>
            <Text style={appCss.txtBtnTouch}>Create New Game</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
    </SafeAreaView>

    /* </Formik>  
</ScrollView > 
</SafeAreaView > */
  )
}
