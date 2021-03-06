import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, View, Dimensions, TouchableOpacity, LogBox, ScrollView, SafeAreaView, StatusBar, Platform, Image, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik } from "formik";
import * as yup from 'yup';
import { Foundation, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import StarRating from 'react-native-star-rating';
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar } from 'react-native-paper';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import AppCss from '../../CSS/AppCss'
import { Context as CitiesContext } from '../../Contexts/CitiesContext';
import CitiesDropDown from '../MyTeams/Components/CitiesDropDown';
import { geocodeLocationByName } from '../../Services/location-service';
import Slider from '@react-native-community/slider';
import Modal_Alert from '../Modal_Alert';

LogBox.ignoreLogs([
  'TypeError: _reactNative.NativeModules.RNDatePickerAndroid.dismiss is not a function',
  'Warning: Cannot update a component from inside the function body of a different component.'
]);
export default function Register(props) {
  const { state: { token, userFromGoogle }, register } = useContext(AuthContext);
  const [imageUri, setimageUri] = useState(null);
  const [gender, setGender] = useState(null);
  const [date, setDate] = useState(new Date());
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [staminaStars, setStaminaStars] = useState(4);
  const [prefferedRole, setPrefferedRole] = useState('midfield');
  const [strongLeg, setStrongLeg] = React.useState('right');
  const [sliderValue, setSliderValue] = useState(0)
  const { GetListCities } = useContext(CitiesContext);
  const [cityLive, setCityLive] = useState(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    GetListCities();
  }, []);

  useEffect(() => {
    getCoordsFromName()
  }, [cityLive]);

  const GetCityFromUser = (c) => {
    setCityLive(c)
  }

  const getCoordsFromName = () => {
    cityLive !== null ?
      geocodeLocationByName(cityLive).then(
        (data) => {
          console.log("Data====>" + data);
          console.log(data);
          setRegion({
            latitude: data.lat,
            longitude: data.lng,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          });
        }
      ) : null
  }

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

  const displayPicture = () => {
    if (imageUri == null) {
      return (
        <TouchableOpacity onPress={() => btnOpenGalery()}>
          <Feather name="image" size={60} color="white" style={{ padding: 7 }} />
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity onPress={() => btnOpenGalery()}>
          <Avatar.Image size={64} source={{ uri: imageUri }} />
        </TouchableOpacity>
      );
    }
  }

  const printDate = () => {
    let today = new Date()
    if (`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}` === `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
      return null;
    else if (today.setHours(0, 0, 0, 0) < date.setHours(0, 0, 0, 0)) {
      setAlertModalVisible(true);
      setDate(new Date());
    }
    else
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const SignUp = (values) => {
    let player = {
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      Passcode: "",
      Gender: "",
      PlayerCity: "",
      DateOfBirth: "",
      PlayerPicture: "",
      Height: "",
      StrongLeg: "",
      Stamina: "",
      PreferredRole: "",
      LatitudeHomeCity: "",
      LongitudeHomeCity: "",
      DistanceOfInvites: "",
    }
    // console.log(userFromGoogle.givenName) 
    if (userFromGoogle === null) {
      player.FirstName = values.firstName;
      player.LastName = values.lastName;
      player.Email = values.email;
      player.Passcode = values.password
    } else {
      player.FirstName = userFromGoogle.givenName;
      player.LastName = userFromGoogle.familyName;
      player.Email = userFromGoogle.email;
      player.Passcode = userFromGoogle.id
    }

    player.Phone = values.phoneNumber
    player.Gender = gender
    player.PlayerCity = cityLive
    player.DateOfBirth = date
    player.PlayerPicture = imageUri
    player.Height = values.height
    player.StrongLeg = strongLeg
    player.Stamina = staminaStars
    player.PreferredRole = prefferedRole
    player.LatitudeHomeCity = region.latitude
    player.LongitudeHomeCity = region.longitude
    player.DistanceOfInvites = sliderValue

    register(player)

    // register(player, () => {
    //   props.navigation.navigate('TabNav')
    // });
    // console.log(values)
  }

  useEffect(() => {
    if (token !== null)
      props.navigation.navigate('TabNav')
  }, [token])

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar backgroundColor='transparent' barStyle="light-content" />
        <View style={appCss.container, { padding: 40 }}>
          <View style={styles.title_View}>
            <Text style={appCss.title}>Register</Text>
          </View>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              firstName: userFromGoogle !== null ? userFromGoogle.givenName : '',
              lastName: userFromGoogle !== null ? userFromGoogle.familyName : '',
              email: userFromGoogle !== null ? userFromGoogle.email : '',
              password: userFromGoogle !== null ? userFromGoogle.id : '',
              phoneNumber: '',
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
            {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>First Name:</Text>
                  <View style={appCss.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                    <TextInput
                      name="firstName"
                      placeholder={userFromGoogle !== null ? userFromGoogle.givenName : "First Name"}
                      onChangeText={handleChange('firstName')}
                      value={values.firstName}
                      editable={userFromGoogle !== null ? false : true}
                    />
                    {userFromGoogle !== null ?
                      <Image style={{ zIndex: 1, right: 100 }} source={require('../../assets/CheckMark.png')} style={appCss.soccerPlayer_img} />
                      : null}
                  </View>
                  {errors.firstName && touched.firstName ?
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.firstName}</Text> : null
                  }

                </View>
                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Last Name:</Text>
                  <View style={appCss.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                    <TextInput
                      name="lastName"
                      placeholder={userFromGoogle !== null ? userFromGoogle.familyName : "Last Name"}
                      onChangeText={handleChange('lastName')}
                      value={values.lastName}
                      editable={userFromGoogle !== null ? false : true}
                    />
                    {userFromGoogle !== null ?
                      <Image style={{ zIndex: 1, right: 100 }} source={require('../../assets/CheckMark.png')} style={appCss.soccerPlayer_img} />
                      : null}
                  </View>
                  {errors.lastName && touched.lastName ?
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</Text> : null
                  }
                </View>
                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Email:</Text>
                  <View style={appCss.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                    <TextInput
                      name="email"
                      placeholder={userFromGoogle !== null ? userFromGoogle.email : "Email Address"}
                      onChangeText={handleChange('email')}
                      value={values.email}
                      keyboardType="email-address"
                      editable={userFromGoogle !== null ? false : true}
                    />
                    {userFromGoogle !== null ?
                      <Image style={{ zIndex: 1, right: 100 }} source={require('../../assets/CheckMark.png')} style={appCss.soccerPlayer_img} />
                      : null}
                  </View>
                  {errors.email && touched.email ?
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text> : null
                  }
                </View>

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Password:</Text>
                  <View style={appCss.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                    <TextInput
                      name="password"
                      placeholder={userFromGoogle !== null ? '************' : "Password"}
                      style={[styles.textInputExtra, userFromGoogle !== null ? styles.blockInput : null]}
                      onChangeText={handleChange('password')}
                      value={values.password}
                      secureTextEntry
                      editable={userFromGoogle !== null ? false : true}
                    />
                    {userFromGoogle !== null ?
                      <Image style={{ zIndex: 1, right: 100 }} source={require('../../assets/CheckMark.png')} style={appCss.soccerPlayer_img} />
                      : null}
                  </View>

                  {errors.password && touched.password ?
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text> : null
                  }
                </View>
                {
                  userFromGoogle !== null ? null :
                    <View style={styles.formGroup}>
                      <Text style={appCss.inputLabel}>Confirm Password:</Text>
                      <View style={appCss.sectionStyle}>
                        <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                        <TextInput
                          name="passwordConfirmation"
                          placeholder="Password Confirmation"
                          onChangeText={handleChange('passwordConfirmation')}
                          value={values.passwordConfirmation}
                          secureTextEntry
                        />
                      </View>
                      {errors.passwordConfirmation && touched.passwordConfirmation ?
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.passwordConfirmation}</Text> : null
                      }
                    </View>
                }

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Phone Number:</Text>
                  <View style={appCss.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                    <TextInput
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChangeText={handleChange('phoneNumber')}
                      value={values.phoneNumber}
                      keyboardType="phone-pad"
                    />
                  </View>
                  {errors.phoneNumber && touched.phoneNumber ?
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text> : null
                  }
                </View>

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Gender: {gender} </Text>
                  <View style={styles.gender}>
                    <TouchableOpacity onPress={() => checkGender('male')}>
                      <Foundation name="male-symbol" size={40} color="#32CD32" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => checkGender('female')}>
                      <Foundation name="female-symbol" size={40} color="pink" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[styles.formGroup, { paddingBottom: 20 }]}>
                  <Text style={[appCss.inputLabel, { paddingBottom: 10 }]}>City:</Text>
                  <CitiesDropDown width={315} ChoosenCity={(city) => GetCityFromUser(city)} city={cityLive} />
                </View>

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Max Games Distance: {sliderValue} KM</Text>
                  <Slider
                    step={1}
                    style={{ width: Dimensions.get('window').width - 60, height: 30, padding: 40 }}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    minimumValue={0}
                    maximumValue={20}
                    inverted={true}
                    onValueChange={value => setSliderValue(value)}
                  />
                </View>

                <View style={[styles.formGroup, { flexDirection: "row-reverse", justifyContent: 'space-between' }]}>
                  <Text style={[appCss.inputLabel, { alignSelf: 'center' }]}>Date Of Birth: {printDate()}</Text>
                  <View style={styles.datePicker}>
                    <TouchableOpacity onPress={() => showDatepicker()}>
                      <Image source={require("../../assets/Calander.png")} style={styles.calanderStyle} />
                    </TouchableOpacity>
                    {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={"Please enter a valid date of birth"} />}
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

                <View style={styles.formGroup, { flexDirection: "row-reverse", justifyContent: 'space-between' }}>
                  <Text style={[appCss.inputLabel, { alignSelf: 'center' }]}>Player Picture:</Text>
                  {displayPicture()}
                </View>

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Height:</Text>
                  <View style={appCss.sectionStyle}>
                    <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                    <TextInput
                      name="height"
                      placeholder="Height"
                      onChangeText={handleChange('height')}
                      value={values.height}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Preffered Role:</Text>
                  <View style={styles.role}>
                    <DropDownPicker
                      items={[
                        { label: 'GoalKeeper', value: 'goalKeeper' },
                        { label: 'Defence', value: 'defence' },
                        { label: 'Midfield', value: 'midfield' },
                        { label: 'Attack', value: 'attack' },
                      ]}
                      defaultValue={prefferedRole}
                      containerStyle={{ height: 30, width: 200 }}
                      //placeholder="Choose Preffered Role"
                      style={{ backgroundColor: '#fafafa' }}
                      itemStyle={{
                        justifyContent: 'flex-end',
                      }}
                      dropDownStyle={{ backgroundColor: '#fafafa' }}
                      onChangeItem={item => setPrefferedRole(item.value)}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Current Fitness:</Text>
                  <View style={styles.starStamina}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      reversed={true}
                      rating={staminaStars}
                      selectedStar={(rating) => setStaminaStars(rating)}
                      fullStarColor={'gold'}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Strong Leg:</Text>
                  <View style={styles.prefferedLeg}>
                    <TouchableOpacity>
                      <Text style={appCss.inputLabel}>Right</Text>
                      <RadioButton
                        value="right"
                        status={strongLeg === 'right' ? 'checked' : 'unchecked'}
                        onPress={() => setStrongLeg('right')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={appCss.inputLabel}>Left</Text>
                      <RadioButton
                        value="right"
                        status={strongLeg === 'left' ? 'checked' : 'unchecked'}
                        onPress={() => setStrongLeg('left')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={appCss.btnTouch}>
                  <Text style={appCss.txtBtnTouch}>Sign Up</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const loginValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is Required'),
  lastName: yup
    .string()
    .required('Last Name is Required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(1, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  phoneNumber: yup
    .string()
    .min(10, ({ min }) => `Phone number must be at least ${min} characters`)
    .required('Phone number is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const appCss = AppCss;
const styles = StyleSheet.create({
  title_View: {
    alignItems: 'center',
    padding: 30,
    marginBottom: 10
  },
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
  role: {
    padding: 20,
    alignItems: 'center'
  },
  starStamina: {
    padding: 20,
    justifyContent: 'flex-start',
  },
  radioButtonStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  calanderStyle: {
    margin: 5,
    height: 60,
    width: 60,
  },
  prefferedLeg: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 8,
  },
})