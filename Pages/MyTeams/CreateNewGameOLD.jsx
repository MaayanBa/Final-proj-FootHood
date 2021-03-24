import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Button, 
  TextInput, View, TouchableOpacity, 
  ScrollView, SafeAreaView, StatusBar, 
  Platform, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { Formik, Field, Form } from "formik";
import { Checkbox } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';



const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    padding: 40,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    padding: 20
  },
  createGameButton: {
    alignItems: 'center',
    width: '10',
    padding: 70
  },
  textboxes: {
    alignItems: 'center',
  },
  inputLabel: {
    alignItems: "flex-start",
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const equipmentList = [
  { id: 1, title: 'Water' },
  { id: 2, title: 'Ball' },
  { id: 3, title: 'First Aid Kit' },
  { id: 4, title: 'Snacks' },
  { id: 5, title: 'Air Pump' },
];

const newGameValidationSchema = yup.object().shape({
  numberOfTeams: yup
    .string()
    .required('Number of Teams is Required'),
  numbOfPlayersInTeam: yup
    .number().positive().integer()
    .required('Number Of Players is Required'),
})

export default function CreateNewGame() {
  // const [items, setItems] = useState(equipmentList);
  const [checked, setChecked] = useState({});
  const [date, setDate] = useState(new Date(1598051730000));
  const [date2, setDate2] = useState(new Date(1598051730000));
  const [tzOffsetInMinutes, setTzOffsetInMinutes] = useState(0);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [mode2, setMode2] = useState('date');
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 32.342668849189536,
    longitude: 34.91228681110108,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangelastDate = (event, selectedDate) => {
    setTzOffsetInMinutes(0);
    const lastDate = selectedDate || date;
    setShow2(Platform.OS === 'ios');
    setDate2(lastDate);
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };
  const showDatepicker2 = () => {
    showMode2('date');
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const showTimepicker2 = () => {
    showMode2('time');
  };

  let itemBoxes = equipmentList.map((item) => {
    const isChecked = checked[item.id];
    return (
      <View style={styles.checkboxes}>
        <Checkbox
          key={item.id}
          label={item.title}
          checked={isChecked === true}
          onPress={() => setChecked({ ...checked, [item.id]: !isChecked })}
        />
      </View>
    );
  });

  const CreateGame = (values) => {
    // console.log(region);
    const selectedCheckBoxes = checkboxes.find((cb) => cb.checked === true);
    values.gameDate = date;
    values.lastRegisterDate = date2;
    values.gameLocation = region;
    console.log(values)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text h4>Create New Game</Text>
          </View>
          <Formik
            validationSchema={newGameValidationSchema}
            initialValues={{
              numberOfTeams: '',
              numbOfPlayersInTeam: '',
              gameLocation: [],
              gameDate: '',
              lastRegisterDate: '',
              items: [],
            }}
            onSubmit={(values) => CreateGame(values)
            }
          >
            {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
              <>
                <View>
                  <Text style={styles.inputLabel}>Number Of Teams:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="numberOfTeams"
                      placeholder="Number Of Teams"
                      onChangeText={handleChange('numberOfTeams')}
                      value={values.numberOfTeams}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
                {errors.numberOfTeams &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{errors.numberOfTeams}</Text>
                }
                <View>
                  <Text style={styles.inputLabel}>Number Of Players In A Team:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="numbOfPlayersInTeam"
                      placeholder="Number Of Players"
                      onChangeText={handleChange('numbOfPlayersInTeam')}
                      value={values.numbOfPlayersInTeam}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
                {errors.numbOfPlayersInTeam &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{errors.numbOfPlayersInTeam}</Text>
                }
                <View>
                  <Text style={styles.inputLabel}>Game Location:</Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Feather name="map-pin" size={40} color="black" />
                  </TouchableOpacity>
                </View>



                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("You have closed the map.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Choose Location:</Text>
                        <View style={styles.mapContainer}>
                          <MapView
                            onPress={(pos) => { console.log(pos.nativeEvent.coordinate); }}
                            style={{ flex: 1, width: Dimensions.get('window').width - 30, height: '90%' }}
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
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Close Map</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </View>


                <Text style={styles.inputLabel}>Game Date and Time:</Text>
                <View style={styles.dateTime}>
                  <View>
                    <Text style={styles.inputLabel}>Date:</Text>
                    <View style={styles.datePicker}>
                      <TouchableOpacity onPress={() => showDatepicker()}>
                        <Feather name="calendar" size={40} color="black" />
                        {/* <Image source={require("../../assets/Calander.png")} style={styles.calanderStyle} /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.inputLabel}>Time:</Text>
                    <TouchableOpacity onPress={() => showTimepicker()}>
                      <Feather name="clock" size={40} color="black" />
                      {/* <Image source={require("../../assets/Calander.png")} style={styles.calanderStyle} /> */}
                    </TouchableOpacity>
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
                </View>
               
               
               
                <Text style={styles.inputLabel}>Last Registration Date and Time:</Text>
                <View style={styles.dateTime}>
                  <View>
                    <Text style={styles.inputLabel}>Date:</Text>
                    <View style={styles.datePicker}>
                      <TouchableOpacity onPress={() => showDatepicker2()}>
                        <Feather name="calendar" size={40} color="black" />
                        {/* <Image source={require("../../assets/Calander.png")} style={styles.calanderStyle} /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.inputLabel}>Time:</Text>
                    <TouchableOpacity onPress={() => showTimepicker2()}>
                      <Feather name="clock" size={40} color="black" />
                      {/* <Image source={require("../../assets/Calander.png")} style={styles.calanderStyle} /> */}
                    </TouchableOpacity>
                  </View>
                  {show2 && (
                    <DateTimePicker
                      testID="datePicker"
                      value={date2}
                      timeZoneOffsetInMinutes={tzOffsetInMinutes}
                      mode={mode2}
                      is24Hour={true}
                      display="default"
                      onChange={onChangelastDate}
                    />
                  )}
                </View>
                
                
                
                
                <View>
                  <Text>Equipment List:</Text>
                  {itemBoxes}
                </View>
                <Button
                  onPress={handleSubmit}
                  title="Create New Game"
                  disabled={!isValid}
                  style={styles.createGameButton}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
