import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image as ImageBall } from 'react-native';
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
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={appCss.title}>Timer</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTotalDuration}
                        value={totalDuration.toString()}
                        keyboardType="phone-pad"
                        placeholder="Please Enter Minutes"
                    />
                    <TouchableOpacity activeOpacity={0.8} onPress={() => StartTimer()} style={[appCss.btnTouch, { width: "30%" }]}>
                        <Text style={appCss.txtBtnTouch}>Start</Text>
                    </TouchableOpacity>
                </View>
                {clicked == true ? <CountDown until={selectTime * 60} timeToShow={['M', 'S']} digitStyle={{ backgroundColor: '#FFF' }}
                    digitTxtStyle={{ color: 'black' }} timeLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                    timeLabels={{ m: 'Minutes', s: 'Seconds' }} onFinish={() => Finish()} size={30} /> : null}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },

    ball_img: {
        margin: 50,
        height: 110,
        width: 100,
        alignSelf: 'center',
        top: 40
    },
    input: {
        height: 40,
        margin: 12,
        marginTop: 40,
        borderWidth: 1,
        width: 200,
        backgroundColor: 'white',
    }
});