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
import { getLocation, geocodeLocationByName } from '../../Services/location-service';
import Slider from '@react-native-community/slider';
import { interpolate } from 'react-native-reanimated';


LogBox.ignoreLogs([
    'TypeError: _reactNative.NativeModules.RNDatePickerAndroid.dismiss is not a function',
    'Warning: Failed prop type: Invalid prop `value` of type `number` supplied to `ForwardRef(TextInput)`, expected `string`.'
]);


export default function EditPersonalDetails(props) {

    const { state: { token, userFromGoogle }, register } = useContext(AuthContext);
    const [imageUri, setimageUri] = useState(token.PlayerPicture);
    const [gender, setGender] = useState(token.Gender ? 'Female' : 'Male');
    const [date, setDate] = useState(new Date(token.DateOfBirth));

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [staminaStars, setStaminaStars] = useState(token.Stamina);
    const [prefferedRole, setPrefferedRole] = useState(token.PreferredRole);
    const [strongLeg, setStrongLeg] = React.useState(token.StrongLeg ? 'left' : 'right');
    const [sliderValue, setSliderValue] = useState(token.DistanceOfInvites)
    const { state: { cities }, GetListCities } = useContext(CitiesContext);
    const [cityLive, setCityLive] = useState(token.PlayerCity);
    const [region, setRegion] = useState({
        latitude: token.LatitudeHomeCity,
        longitude: token.LongitudeHomeCity,
    });
    const phoneNumber = +JSON.stringify(token.Phone)
    useEffect(() => {
        GetListCities();
        // console.log(cityLive)
    }, []);

    useEffect(() => {
        getCoordsFromName()
    }, [cityLive]);

    const GetCityFromUser = (c) => {
        setCityLive(c)
    }

    const getCoordsFromName = () => {
        //props.location(loc)
        // console.log(cityLive)
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
        //setDateBigger(false)
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
            alert("Please enter valid date of birth");
            setDate(new Date());
        }
        else
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const Edit = (values) => {
        // console.log(values.firstName)
        let player = {
            FirstName: "",
            LastName: "",
            Phone: "",
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
        // if (token.FirstName !== values.firstName)
            player.FirstName = values.firstName;

        // if (token.LastName !== values.firstName)
            player.LastName = values.lastName;

        // if (token.Phone !== values.phoneNumber)
            player.Phone = values.phoneNumber;

        // if (token.Gender !== values.playerGender)
            player.Gender = values.playerGender;

        // if (token.PlayerCity !== values.city)
            player.PlayerCity = cityLive

        // if (token.DateOfBirth !== values.dateOfBirth)
            player.DateOfBirth = date

        // if (token.PlayerPicture !== values.image)
            player.PlayerPicture = imageUri

        // if (token.Height !== values.height)
            player.Height = values.height

        // if (token.StrongLeg !== values.prefferedLeg)
            player.StrongLeg = strongLeg

        // if (token.Stamina !== values.prefferedLeg)
            player.Stamina = values.stamina


        // if (token.PreferredRole !== values.role)
            player.PreferredRole = prefferedRole

        player.LatitudeHomeCity = region.latitude
        player.LongitudeHomeCity = region.longitude
        player.DistanceOfInvites = sliderValue



        // player.Phone = values.phoneNumber
        // player.Gender = gender
        // player.PlayerCity = cityLive
        // player.DateOfBirth = date
        // player.PlayerPicture = imageUri
        // player.Height = values.height
        // player.StrongLeg = strongLeg
        // player.Stamina = staminaStars
        // player.PreferredRole = prefferedRole
        // player.LatitudeHomeCity = region.latitude
        // player.LongitudeHomeCity = region.longitude
        // player.DistanceOfInvites = sliderValue

        // register(player)
        console.log("Afteer Edit ",player)
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {/* {console.log(token)} */}
                <StatusBar backgroundColor='transparent' barStyle="light-content" />
                <View style={appCss.container, { padding: 40 }}>
                    <View style={styles.title_View}>
                        <Text style={appCss.title}>Edit Details</Text>
                    </View>

                    <Formik
                        // validationSchema={loginValidationSchema}
                        initialValues={{
                            firstName: token.FirstName,
                            lastName: token.LastName,
                            phoneNumber: token.Phone,
                            playerGender: token.Gender,
                            city: token.PlayerCity,
                            dateOfBirth: new Date(token.DateOfBirth),
                            image: token.PlayerPicture,
                            height: token.Height,
                            prefferedLeg: token.StrongLeg,
                            stamina: token.Stamina,
                            role: token.PreferredRole
                        }}
                        onSubmit={(values) => Edit(values)
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
                                            placeholder={token.FirstName}
                                            onChangeText={handleChange('firstName')}
                                            value={values.firstName}
                                        />
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
                                            placeholder={token.LastName}
                                            onChangeText={handleChange('lastName')}
                                            value={values.lastName}
                                        />
                                    </View>
                                    {errors.lastName && touched.lastName ?
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</Text> : null
                                    }
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={appCss.inputLabel}>Phone Number:</Text>
                                    <View style={appCss.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                                        <TextInput
                                            name="phoneNumber"
                                            placeholder={"0" + phoneNumber}
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
                                            placeholder={JSON.stringify(token.Height)}
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
                                    <Text style={appCss.txtBtnTouch}>Edit</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}



// const loginValidationSchema = yup.object().shape({
//     firstName: yup
//         .string()
//         .required('First Name is Required'),
//     lastName: yup
//         .string()
//         .required('Last Name is Required'),
//     phoneNumber: yup
//         .string()
//         .min(10, ({ min }) => `Phone number must be at least ${min} characters`)
//         .required('Phone number is required'),
// })

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
    //   textInputExtra:{
    //         width: Dimensions.get('window').width - 40,
    //  alignItems:'flex-end'
    //   },
    //   blockInput: {
    //     backgroundColor: 'gray',

    //   },

})