import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image as ImageBall, ScrollView } from 'react-native';
import CountDown from 'react-native-countdown-component';
import AppCss from '../../CSS/AppCss';

const appCss = AppCss;

export default function Timer() {
    const [totalDuration, setTotalDuration] = useState("");
    const [selectTime, setSelectTime] = useState();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setSelectTime(totalDuration)
    }, [totalDuration])

    const StartTimer = () => {
        if (totalDuration == "")
            alert("Please insert minutes of game")
        else {
            setClicked(true)
        }
    }

    const Finish = () => {
        setClicked(false)
        //alert('Times up!')
    }
    return (
        <SafeAreaView >

            <View style={appCss.container}>
                <Text style={appCss.title}>Timer</Text>
                <View style={styles.watchStyle}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTotalDuration}
                        value={totalDuration.toString()}
                        keyboardType="phone-pad"
                        placeholder="Please Enter Minutes"
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => StartTimer()} style={[appCss.btnTouch, { marginHorizontal: 30 }]}>
                            <Text style={appCss.txtBtnTouch}>  Start  </Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch, { marginHorizontal: 30 }]}
                        // onPress={() => {
                        //     setIsStopwatchStart(false);
                        //     setResetStopwatch(true);
                        // }}
                        >
                            <Text style={appCss.txtBtnTouch}>RESET</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {clicked == true ? <CountDown until={selectTime * 60} timeToShow={['M', 'S']} digitStyle={{ backgroundColor: '#FFF' }}
                    digitTxtStyle={{ color: 'black' }} timeLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                    timeLabels={{ m: 'Minutes', s: 'Seconds' }} onFinish={() => Finish()} size={30} /> : null}
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    watchStyle: {
        alignItems: 'center',
        flex: 1,
        marginTop: 40,
        // justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
    },

    input: {
        height: 56,
        fontSize: 22,
        //margin: 12,
        marginTop: 43,
        borderWidth: 1,
        paddingRight: 43,
        width: 300,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        // padding:10
    }
});