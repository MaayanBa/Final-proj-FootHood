import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import AppCss from '../../CSS/AppCss';

export default function StopWatch() {
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(420000);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={appCss.title}>Stop Watch</Text>
                <View style={styles.sectionStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Stopwatch
                            laps
                            msecs
                            start={isStopwatchStart}
                            // To start
                            reset={resetStopwatch}
                            // To reset
                            options={options}
                            // Options for the styling
                            // getTime={(time) => {
                            //     console.log(time);
                            // }}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableHighlight
                            style={appCss.btnTouch}
                            onPress={() => {
                                setIsStopwatchStart(!isStopwatchStart);
                                setResetStopwatch(false);
                            }}>
                            <Text style={appCss.txtBtnTouch}>
                                {!isStopwatchStart ? 'START' : 'STOP'}
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={appCss.btnTouch}
                            onPress={() => {
                                setIsStopwatchStart(false);
                                setResetStopwatch(true);
                            }}>
                            <Text style={appCss.txtBtnTouch}>RESET</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const appCss = AppCss;
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
    sectionStyle: {
        flex: 1,
        marginTop: 32,
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
    },
});

const options = {
    container: {
        backgroundColor: '#D9D9D9',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: 'black',
        marginLeft: 7,
    },
};