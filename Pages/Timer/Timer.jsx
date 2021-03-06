import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image as ImageBall } from 'react-native';
import CountDown from 'react-native-countdown-component';
import AppCss from '../../CSS/AppCss';
import Modal_Alert from '../Modal_Alert';


export default function Timer() {
    const [totalDuration, setTotalDuration] = useState("");
    const [selectTime, setSelectTime] = useState();
    const [clicked, setClicked] = useState(false);
    const [run, setRun] = useState(true);
    const [pauseBtn, setPauseBtn] = useState('Pause')
    const [alertModalVisible, setAlertModalVisible] = useState(false);

    useEffect(() => {
        setSelectTime(totalDuration)
    }, [totalDuration])

    const StartTimer = () => {
        if (totalDuration == "")
            setAlertModalVisible(true)
        else {
            setClicked(true)
        }
    }

    const Pause = () => {
        if (run == true) {
            setRun(false)
            setPauseBtn('Resume')
        }
        else {
            setRun(true)
            setPauseBtn('Pause')
        }
    }

    const Finish = () => {
        setClicked(false)
    }

    const Reset = () => {
        Finish()
    }
    return (
        <View style={appCss.container} >
            <View style={appCss.container}>
                {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={"Please insert the minutes of the game"} />}
                <Text style={[appCss.title, { paddingBottom: 20 }]}>Timer</Text>
                {clicked == true ? <CountDown until={selectTime * 60} timeToShow={['H', 'M', 'S']} digitStyle={{ backgroundColor: '#FFF' }}
                    digitTxtStyle={{ color: 'black' }} timeLabelStyle={{ color: 'white', fontWeight: 'bold' }}
                    timeLabels={{ h: 'hours', m: 'Minutes', s: 'Seconds' }} running={run} onFinish={() => Finish()} size={30} /> : null}
                <View style={styles.watchStyle}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTotalDuration}
                        value={totalDuration.toString()}
                        keyboardType="phone-pad"
                        placeholder="Please Enter Minutes"
                    />
                    <View style={styles.buttons}>
                        {clicked == true ? <TouchableOpacity activeOpacity={0.8} onPress={() => Pause()} style={[appCss.btnTouch, { marginHorizontal: 30 }]}>
                            <Text style={appCss.txtBtnTouch}>{pauseBtn}</Text>
                        </TouchableOpacity> : <TouchableOpacity activeOpacity={0.8} onPress={() => StartTimer()} style={[appCss.btnTouch, { marginHorizontal: 30 }]}>
                            <Text style={appCss.txtBtnTouch}>START</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => Reset()} style={[appCss.btnTouch, { marginHorizontal: 30 }]}>
                            <Text style={appCss.txtBtnTouch}>RESET</Text>
                        </TouchableOpacity>
                    </View>
                    <ImageBall source={require('../../assets/ball.png')} style={appCss.ball_img} />
                </View>
            </View>
        </View>
    );
};

const appCss = AppCss;
const styles = StyleSheet.create({
    watchStyle: {
        alignItems: 'center',
        flex: 1,
        marginTop: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    input: {
        height: 56,
        fontSize: 22,
        marginTop: 20,
        borderWidth: 1,
        paddingRight: 43,
        width: 300,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
    }
});