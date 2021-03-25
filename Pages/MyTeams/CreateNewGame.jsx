import React, { useState } from 'react'
import {
  StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, View, Text,
  StatusBar, Modal, Dimensions,
  Pressable, Image
} from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import {
  Feather as Minus,
  Feather as Plus,
  Feather as LocationFeather
} from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: "100%",
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
  },
  // safeArea: {
  //   //flex: 1,
  //   width: '100%',
  //   height: 420,
  // },

  headerView: {
    paddingTop: 40,
    alignItems: 'center',
    //height:'25%'
    //padding: 
  },
  txtHeader: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignItems: 'center',
    //padding: 40,
    color: 'white',
    fontSize: 40,
  },
  pickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35
  },
  btns_PlusAndMinus_View: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    alignSelf: 'center'

  },
  txt_NumOfTeamsState: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 30,
  },
  txtView: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  txtLabel: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 25,
  },
  locationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35
  },
  modalView: {
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
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnClose: {
    backgroundColor: "#2196F3",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  dateTime_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:25
  },
  imgCalander: {
    width: 60,
    height: 60
  }

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
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date(1598051730000));
  const [tzOffsetInMinutes, setTzOffsetInMinutes] = useState(0);


  const ChangeNum_state = (change, state) => {
    let num = 0;
    if (state === 'numOfTeamsState')
      num = numOfTeamsState;
    else
      num = numOfPlayersInTeam;

    if (change === 'minus') {
      if (num > 2) {
        if (state === 'numOfTeamsState')
          setnumOfTeamsState(num - 1)
        else
          setnumOfPlayersInTeam(num - 1)
      }
      else
        alert('Minmum of Team is 2')
    }
    else if (change === 'plus') {
      if (state === 'numOfTeamsState') {
        if (num < 10)
          setnumOfTeamsState(num + 1)
        else
          alert('The Maximum of Team is 10')
      }
      else {
        if (num < 11)
          setnumOfPlayersInTeam(num + 1)
        else
          alert('The Maximum Players each Team is 11')
      }
    }

  }

  const modalLocationMap = <Modal animationType="slide"
    transparent={true} visible={modalVisible}
    onRequestClose={() => {
      alert("You have closed the map.");
      setModalVisible(!modalVisible);
    }}
  >
    {/* <View style={styles.centeredView}> */}
    <View style={styles.modalView}>
      <Text style={styles.modal_Txt}>Choose Location:</Text>
      <View style={styles.mapContainer}>
        <MapView
          onPress={(pos) => { console.log(pos.nativeEvent.coordinate); }}
          style={{ flex: 1, width: Dimensions.get('window').width - 70, height: '70%' }}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}
        >
          <Marker draggable
            coordinate={region}
            onDragEnd={(e) => this.setRegion({ region: e.nativeEvent.coordinate })}
          />
        </MapView>
      </View>
      {/* <Text style={styles.modalText}>Map Here</Text> */}
      <Pressable
        style={styles.btnClose}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.textStyle}>Close Map</Text>
      </Pressable>
    </View>
    {/* </View> */}
  </Modal>

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };


  return (

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerView}>
        <Text style={styles.txtHeader}>Create New Game</Text>
      </View>

      {/* number of teams */}
      <View style={styles.pickerView}>
        <View style={styles.btns_PlusAndMinus_View}>
          <TouchableOpacity onPress={() => ChangeNum_state('plus', 'numOfTeamsState')}>
            <Plus name="plus" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.txt_NumOfTeamsState}>{numOfTeamsState}</Text>
          <TouchableOpacity onPress={() => ChangeNum_state('minus', 'numOfTeamsState')}>
            <Minus name="minus" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.txtView}>
          <Text style={styles.txtLabel}>Number Of Teams:</Text>
        </View>
      </View>

      {/* number of player each team */}
      <View style={styles.pickerView}>
        <View style={styles.btns_PlusAndMinus_View}>
          <TouchableOpacity onPress={() => ChangeNum_state('plus', 'numOfPlayersInTeam')}>
            <Plus name="plus" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.txt_NumOfTeamsState}>{numOfPlayersInTeam}</Text>

          <TouchableOpacity onPress={() => ChangeNum_state('minus', 'numOfPlayersInTeam')}>
            <Minus name="minus" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.txtView}>
          <Text style={styles.txtLabel}>Players In Teams:</Text>
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationView}>
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <LocationFeather name="map-pin" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.txtLabel}>Game Location:</Text>
        {modalLocationMap}
      </View>

      {/* Date and Time */}
      <View style={styles.dateTime_View}>
        <TouchableOpacity onPress={() => showMode('date')}>
          <Image style={styles.imgCalander} source={require('../../assets/Calander.png')} />
        </TouchableOpacity>
        <Text style={styles.txtLabel}>Game Date and Time:</Text>

      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          timeZoneOffsetInMinutes={tzOffsetInMinutes}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      {/* Last date for registration */}
      <View style={styles.dateTime_View}>
        <TouchableOpacity onPress={() => showMode('time')}>
          <Image style={styles.imgCalander} source={require('../../assets/Calander.png')} />
        </TouchableOpacity>
        <Text style={styles.txtLabel}>Last Time Regestration:</Text>

      </View>
      {/* Equipment required */}

      {/* btn Create Game */}


      {/* <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CreateNewGame')} style={styles.btnTouch}>
                <Text style={styles.txtBtnTouch}>Create New Game</Text>
            </TouchableOpacity> */}
    </View>

    /* </Formik>  
</ScrollView > 
</SafeAreaView > */
  )
}
