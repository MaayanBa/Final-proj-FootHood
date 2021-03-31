import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Button, TextInput, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform, Image,Text } from 'react-native';
//import { Text } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { Formik, Field, Form, useField, FieldAttributes, FieldArray } from "formik";
import * as yup from 'yup';
import { Foundation, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import StarRating from 'react-native-star-rating';
import DropDownPicker from 'react-native-dropdown-picker';


const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    padding: 40,
  },
  // signUpContainer: {
  //     width: '80%',
  //     backgroundColor: 'white',
  //     padding: 10,
  // },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    padding: 20

  },
  // textInput: {
  //     height: 40,
  //     width: '100%',
  //     margin: 10,
  //     backgroundColor: 'white',
  //     borderColor: 'gray',
  //     borderWidth: StyleSheet.hairlineWidth,
  //     borderRadius: 10,
  // },
  gender: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10

  },
  signupButton: {
    alignItems: 'center',
    width: '10',
    padding: 50
  },
  textboxes: {
    alignItems: 'center',
  },
  inputLabel: {
    alignItems: "flex-start",
  },
  role: {
    padding: 20,
  },
  datePicker: {
    //alignItems: "flex-start",
    //padding: 5
  },
  starStamina: {
    padding: 20,
    justifyContent: 'flex-start',
    // flexDirection: 'row-reverse'
    
  },
  prefferedLeg: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10
  },
  radioButtonStyle:{
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  ImageStyle: {
    //padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    //resizeMode: 'stretch',
    //alignItems: 'center',
  },
  sectionStyle: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  calanderStyle: {
    margin: 5,
    height: 100,
    width: 100,
  }
})


const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  phoneNumber: yup
    .string()
    .min(10, ({ min }) => `Phone number must be at least ${min} characters`)
    .required('Phone number is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})


export default function Register(props) {
  const [imageUri, setimageUri] = useState(null);
  const [gender, setGender] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [staminaStars, setStaminaStars] = useState(4);
  const [prefferedRole, setPrefferedRole] = useState('midfield');
  const [strongLeg, setStrongLeg] = React.useState('right');



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const checkGender = (gender) => {
    if (gender == 'male') {
      setGender('Male');
    }
    else
      setGender('Female');
  }


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
  const SignUp = (values) => {
    values.playerGender = gender;
    values.prefferedLeg = strongLeg;
    values.image = imageUri;
    values.dateOfBirth = date;
    values.stamina = staminaStars;
    values.role = prefferedRole;
    console.log(values)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text h1>Register</Text>
          </View>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              password: '',
              playerGender: '',
              city: '',
              dateOfBirth: '',
              image: '',
              height: '',
              prefferedLeg: '',
              stamina: '',
              role: ''
            }}
            onSubmit={(values) => SignUp(values)
            }
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Full Name:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="fullName"
                      placeholder="Full Name"
                      onChangeText={handleChange('fullName')}
                      value={values.fullName}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Email:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="email"
                      placeholder="Email Address"
                      onChangeText={handleChange('email')}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                <View style={styles.formGroup}>
                  {errors.email &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                  }
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Phone Number:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChangeText={handleChange('phoneNumber')}
                      value={values.phoneNumber}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
                <View style={styles.formGroup}>
                  {errors.phoneNumber &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>
                  }
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Password:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="password"
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      value={values.password}
                      secureTextEntry
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  {errors.password &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                  }
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Confirm Password:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="passwordConfirmation"
                      placeholder="Password Confirmation"
                      onChangeText={handleChange('passwordConfirmation')}
                      value={values.passwordConfirmation}
                      secureTextEntry
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  {errors.passwordConfirmation &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.passwordConfirmation}</Text>
                  }
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Gender: {gender} </Text>
                  <View style={styles.gender}>
                    <TouchableOpacity onPress={() => checkGender('male')}>
                      <Foundation name="male-symbol" size={40} color="#32CD32" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => checkGender('female')}>
                      <Foundation name="female-symbol" size={40} color="pink" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>City:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="city"
                      placeholder="City"
                      onChangeText={handleChange('city')}
                      value={values.city}
                    />
                  </View>
                </View>
                <View style={styles.formGroup,{flexDirection: "row-reverse",justifyContent:'space-between'}}>
                  <Text style={styles.inputLabel}>Date Of Birth:</Text>
                  <View style={styles.datePicker}>
                    <TouchableOpacity onPress={() => showDatepicker()}>
                      <Image source={require("../../assets/Calander.png")} style={styles.calanderStyle} />
                    </TouchableOpacity>
                    {/* <Button onPress={showDatepicker} title="Date of Birth" /> */}
                  </View>

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>

                <View style={styles.formGroup,{flexDirection: "row-reverse",justifyContent:'space-between'}}>
                  <Text style={styles.inputLabel}>Player Picture:</Text>
                  <TouchableOpacity onPress={() => btnOpenGalery()}>
                    <Feather name="image" size={60} color="white" style={{margin: 6,}}/>
                  </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Height:</Text>
                  <View style={styles.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                    <TextInput
                      name="height"
                      placeholder="Height"
                      onChangeText={handleChange('height')}
                      value={values.height}
                      
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Preffered Role:</Text>
                  <View style={styles.role}>
                    <DropDownPicker
                      items={[
                        { label: 'GoalKeeper', value: 'goalKeeper' },
                        { label: 'Defence', value: 'defence' },
                        { label: 'Midfield', value: 'midfield' },
                        { label: 'Attack', value: 'attack' },
                      ]}
                      defaultValue={prefferedRole}
                      containerStyle={{ height: 30, width:300 }}
                      //placeholder="Choose Preffered Role"
                      style={{ backgroundColor: '#fafafa'}}
                      itemStyle={{
                        justifyContent: 'flex-end',
                      }}
                      dropDownStyle={{ backgroundColor: '#fafafa' }}
                      onChangeItem={item => setPrefferedRole(item.value)}
                    />
                  </View>
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Current Fitness:</Text>
                  <View style={styles.starStamina}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={staminaStars}
                      selectedStar={(rating) => setStaminaStars(rating)}
                      fullStarColor={'gold'}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Strong Leg:</Text>
                  <View style={styles.prefferedLeg}>
                    <RadioButton.Group  onValueChange={newValue => setStrongLeg(newValue)} value={strongLeg}>
                      <Text>Right</Text>
                      <RadioButton value="right" />
                      <Text>Left</Text>
                      <RadioButton value="left" />
                    </RadioButton.Group>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Button
                    onPress={handleSubmit}
                    title="Sign Up"
                    disabled={!isValid}
                    style={styles.signupButton}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}