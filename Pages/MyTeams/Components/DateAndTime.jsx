import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, LogBox } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import AppCss from '../../../CSS/AppCss';
import Modal_Alert from '../../Modal_Alert';


export default function DateAndTime(props) {
    const [mode, setMode] = useState(null);
    const [showshowDateTimePicker_Game, setShowDateTimePicker_Game] = useState(false);
    const [dateGame, setDateGame] = useState(props.gameDate != undefined ? new Date(props.gameDate) : new Date());
    const [gameTime, setGameTime] = useState(props.gameTime != undefined ? props.gameTime : new Date());
    const [showChoosenDateGame, setShowChoosenDateGame] = useState(false);
    const [gameOrRegistration, setGameOrRegistration] = useState(false)
    const [showDateTimePicker_Regi, setShowDateTimePicker_Regi] = useState(false);
    const [dateRegistration, setDateRegistration] = useState(props.lastRegistrationDate != undefined ? new Date(props.lastRegistrationDate) : new Date());
    const [registrationTime, setRegistretionTime] = useState(props.lastRegistrationTime != undefined ? props.lastRegistrationTime : new Date());
    const [showLastRegistration, setShowLastRegistration] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');

    LogBox.ignoreLogs([
        'TypeError: _reactNative.NativeModules.RNDatePickerAndroid.dismiss is not a function',
    ]);
    LogBox.ignoreLogs([
        'Cannot update a component from inside the function body of a different component',
    ]);

    const Alert = (message) => {
        setAlertText(message)
        setAlertModalVisible(true)
    }

    useEffect(() => {
        props.liftState(dateGame, gameTime, dateRegistration, registrationTime);
    }, [registrationTime])

    const onChange = (event, selectedValue) => {
        let now = new Date();
        if (gameOrRegistration === 'game') {
            setShowDateTimePicker_Game(false);

            if (mode === 'date') {
                const currentDate = selectedValue || now;

                if (currentDate.setHours(0, 0, 0, 0) >= now.setHours(0, 0, 0, 0)) {
                    setDateGame(currentDate);
                    setMode('time');
                    setShowDateTimePicker_Game(true)
                }
                else {
                    Alert("You must choose date in future")
                    setShowChoosenDateGame(false)
                }
            } else if (mode === 'time') {
                const selectedTime = selectedValue || now;

                if (dateGame.setHours(0, 0, 0, 0) > now.setHours(0, 0, 0, 0)) {
                    setGameTime(selectedTime);
                    setShowChoosenDateGame(true);
                }
                else if (dateGame.setHours(0, 0, 0, 0) == now.setHours(0, 0, 0, 0)) {
                    if (selectedTime > now.getTime()) {
                        setGameTime(selectedTime);
                        setShowChoosenDateGame(true);
                    }
                    else {
                        Alert("You must choose the future game time")
                        setShowChoosenDateGame(false)
                    }
                }
            }
        }
        else if (gameOrRegistration === 'registration') {
            setShowDateTimePicker_Regi(false);

            if (mode == 'date') {
                const lastDate2Reg = selectedValue || selectedValue.setDate(selectedValue.getDate() - 1);

                if (lastDate2Reg.setHours(0, 0, 0, 0) <= dateGame.setHours(0, 0, 0, 0)) {
                    setDateRegistration(lastDate2Reg);
                    setMode('time');
                    setShowDateTimePicker_Regi(true); // to show the picker again in time mode
                } else
                    Alert("The date you have choosen is after the game date.Please choose another date.")

            } else if (mode === 'time') {
                const selectedlastTime = selectedValue;
                if (dateRegistration.setHours(0, 0, 0, 0) < dateGame.setHours(0, 0, 0, 0)) {
                    setRegistretionTime(selectedlastTime);
                    setShowLastRegistration(true);
                }
                else if (dateRegistration.setHours(0, 0, 0, 0) == dateGame.setHours(0, 0, 0, 0)) {
                    if (selectedlastTime < gameTime.getTime()) {
                        setRegistretionTime(selectedlastTime);
                        setShowLastRegistration(true);
                    }
                    else {
                        Alert("You must choose the last registration time before the game time")
                        setShowLastRegistration(false)
                    }
                }
            }
        }
    };

    const showMode = (currentMode, belongTo) => {
        setGameOrRegistration(belongTo);
        setMode(currentMode);
        belongTo === 'game' ? setShowDateTimePicker_Game(true) : setShowDateTimePicker_Regi(true);
    };

    const dateAndTime = (time) => {
        return time.toLocaleString();
    };

    return (
        <View>
            {/* Date and Time */}
            <View style={styles.dateTime_View}>
                <TouchableOpacity onPress={() => showMode('date', 'game')}>
                    <Image style={styles.calander_img} source={require('../../../assets/Calander.png')} />
                </TouchableOpacity>
                <Text style={appCss.inputLabel}>Game Date {'&'} Time:</Text>
            </View>
            {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
            {showshowDateTimePicker_Game && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateGame}
                    //timeZoneOffsetInMinutes={tzOffsetInMinutes}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}

            {props.edit ?
                <Text style={[appCss.inputLabel, { color: 'orange', fontSize: 15, marginTop: 5, alignSelf: 'center' }]}>
                    {props.gameTime.toLocaleString()}    {new Date(props.gameDate).toLocaleDateString()}
                </Text> : null}
            {showChoosenDateGame &&
                <Text style={[appCss.inputLabel, { color: 'orange', fontSize: 15, marginTop: 5, alignSelf: 'center' }]}>
                    {dateAndTime(gameTime)} {props.setEdit(false)}

                </Text>}

            {/* Last date for registration */}
            <View style={styles.dateTime_View}>
                <TouchableOpacity onPress={() => showMode('date', 'registration')}>
                    <Image style={styles.calander_img} source={require('../../../assets/Calander.png')} />
                </TouchableOpacity>
                <Text style={appCss.inputLabel}>Final Registration Date:</Text>
            </View>
            {showDateTimePicker_Regi && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateRegistration}
                    //timeZoneOffsetInMinutes={tzOffsetInMinutes}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}

            {props.edit ?
                <Text style={[appCss.inputLabel, { color: 'orange', fontSize: 15, marginTop: 5, alignSelf: 'center' }]}>
                    {new Date(props.lastRegistrationDate).toLocaleDateString()}    {props.lastRegistrationTime.toLocaleString()}
                </Text> : null}
            {showLastRegistration &&
                <Text style={[appCss.inputLabel, { color: 'orange', fontSize: 15, marginTop: 5, alignSelf: 'center' }]}>
                    {dateAndTime(registrationTime)}
                </Text>}
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    dateTime_View: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25
    },
    calander_img: {
        width: 60,
        height: 60
    },
})





