import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, View, Dimensions, TouchableOpacity, LogBox, ScrollView, SafeAreaView, StatusBar, Platform, Image, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik } from "formik";
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
import Modal_Alert from '../Modal_Alert';

LogBox.ignoreLogs([
    'TypeError: _reactNative.NativeModules.RNDatePickerAndroid.dismiss is not a function',
    'Warning: Failed prop type: Invalid prop `value` of type `number` supplied to `ForwardRef(TextInput)`, expected `string`.'
]);

export default function EditPersonalDetails(props) {

    const { state: { token }, ChangePersonalDetails } = useContext(AuthContext);
    const [imageUri, setimageUri] = useState(token.PlayerPicture);
    const [gender, setGender] = useState(token.Gender ? 'Male' : 'Female');
    const [genderBool, setGenderBool] = useState(token.Gender)
    const [date, setDate] = useState(new Date(token.DateOfBirth));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [staminaStars, setStaminaStars] = useState(token.Stamina);
    const [prefferedRole, setPrefferedRole] = useState(token.PreferredRole);
    const [strongLeg, setStrongLeg] = React.useState(token.StrongLeg ? 'left' : 'right');
    const [sliderValue, setSliderValue] = useState(token.DistanceOfInvites)
    const { GetListCities } = useContext(CitiesContext);
    const [cityLive, setCityLive] = useState(token.PlayerCity);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [region, setRegion] = useState({
        latitude: token.LatitudeHomeCity,
        longitude: token.LongitudeHomeCity,
    });
    const phoneNumber = +JSON.stringify(token.Phone)

    const Alert = (message) => {
        setAlertText(message)
        setAlertModalVisible(true)
    }

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
            setGenderBool(true);
        }
        else {
            setGender('Female');
            setGenderBool(false);
        }
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
            Alert("Please enter valid date of birth");
            setDate(new Date());
        }
        else
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const Edit = (values) => {
        let player = {
            Email: "",
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
        player.Email = token.Email;
        player.FirstName = values.firstName;
        player.LastName = values.lastName;
        player.Phone = values.phoneNumber;
        player.Gender = genderBool;
        if (cityLive == "" || cityLive == null)
            player.PlayerCity = token.PlayerCity
        player.DateOfBirth = date
        player.PlayerPicture = imageUri
        player.Height = values.height
        player.StrongLeg = strongLeg
        player.Stamina = values.stamina
        player.PreferredRole = prefferedRole
        player.LatitudeHomeCity = region.latitude
        player.LongitudeHomeCity = region.longitude

        player.DistanceOfInvites = sliderValue
        let phoneNumber = JSON.stringify(player.Phone).length

        if ((phoneNumber >= 9 && phoneNumber <= 10) || player.Phone.length === 10) {
            ChangePersonalDetails(player)
            props.navigation.goBack()
        }
        else Alert("Something wrong with your phone number")
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
                <StatusBar backgroundColor='transparent' barStyle="light-content" />
                <View style={appCss.container, { padding: 40 }}>
                    <View style={styles.title_View}>
                        <Text style={appCss.title}>Edit Details</Text>
                    </View>

                    <Formik
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
                        }} onSubmit={(values) => Edit(values)}
                    >
                        {({ handleChange, handleSubmit, values }) => (
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
    role: {
        padding: 20,
        alignItems: 'center'
    },
    starStamina: {
        padding: 20,
        justifyContent: 'flex-start',
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