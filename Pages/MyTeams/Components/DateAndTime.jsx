import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, LogBox } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import AppCss from '../../../CSS/AppCss';

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

export default function DateAndTime(props) {
    const [mode, setMode] = useState(null);
    const [showshowDateTimePicker_Game, setShowDateTimePicker_Game] = useState(false);
    const [dateGame, setDateGame] = useState(new Date());
    const [gameTime, setGameTime] = useState(new Date());
    const [showChoosenDateGame, setShowChoosenDateGame] = useState(false);
    const [gameOrRegistration, setGameOrRegistration] = useState(false)
    const [showDateTimePicker_Regi, setShowDateTimePicker_Regi] = useState(false);
    const [dateRegistration, setDateRegistration] = useState(new Date());
    const [registrationTime, setRegistretionTime] = useState(new Date());
    const [showLastRegistration, setShowLastRegistration] = useState(false);

    LogBox.ignoreLogs([
        'TypeError: _reactNative.NativeModules.RNDatePickerAndroid.dismiss is not a function',
    ]);

    useEffect(() => {
      props.liftState(dateGame,gameTime,dateRegistration,registrationTime);
    }, [registrationTime])

    useEffect(() => {
        dateGame !== new Date() ?
            dateGame < new Date() ? null : setShowDateTimePicker_Game(true) // to show the picker again in time mode 
            : null
    }, [dateGame])

    const onChange = (event, selectedValue) => {

        if (gameOrRegistration === 'game') {
            setShowDateTimePicker_Game(false);

            if (mode === 'date') {
                const currentDate = selectedValue || new Date();
                setDateGame(currentDate);
                setMode('time');

            } else if (mode === 'time') {
                const selectedTime = selectedValue || new Date();
                setGameTime(selectedTime);
                setShowChoosenDateGame(true);
            }
        }
        else if (gameOrRegistration === 'registration') {
            setShowDateTimePicker_Regi(false);

            if (mode == 'date') {
                const lastDate = selectedValue || new Date();
                if ((lastDate.getDate() < dateGame.getDate() && lastDate.getMonth() == dateGame.getMonth()) || (lastDate.getMonth() < dateGame.getMonth())) {
                    setDateRegistration(lastDate);
                    setMode('time');
                    setShowDateTimePicker_Regi(true); // to show the picker again in time mode
                }
                else
                    alert("The date you have choosen is after the game date.Please choose another date.")

            } else if (mode === 'time') {
                const selectedlastTime = selectedValue || new Date();
                setRegistretionTime(selectedlastTime);
                setShowLastRegistration(true);
            }
        }
    };

    const showMode = (currentMode, belongTo) => {
        //console.log(belongTo);     console.log(currentMode);
        setGameOrRegistration(belongTo);
        setMode(currentMode);
        belongTo === 'game' ? setShowDateTimePicker_Game(true) : setShowDateTimePicker_Regi(true);
    };


    const dateAndTime = (date, time) => {
        return `${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()}  At - ${time.getHours()}:${time.getMinutes()}`;//Builds up togther the date and time
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

            {showshowDateTimePicker_Game && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateGame}
                    //timeZoneOffsetInMinutes={tzOffsetInMinutes}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            {showChoosenDateGame &&
                <Text style={[appCss.inputLabel, { color: 'orange', fontSize: 15, marginTop: 5 , alignSelf:'center' }]}>
                    {dateAndTime(dateGame, gameTime)}
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
                />
            )}

            {showLastRegistration &&
                <Text style={[appCss.inputLabel, { color: 'orange', fontSize: 15, marginTop: 5 , alignSelf:'center' }]}>
                    {dateAndTime(dateRegistration, registrationTime)}
                </Text>}
        </View>
    )
}









