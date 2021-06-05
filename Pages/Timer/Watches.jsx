import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image as ImageBall,LogBox } from 'react-native';
import AppCss from '../../CSS/AppCss';
import StopWatch from './StopWatch';
import Timer from './Timer';

export default function Watches() {
    const [stopwatch, setStopWatch] = useState(true);
    
    LogBox.ignoreLogs([
        'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setStopWatch(true)} style={[appCss.btnTouch, { width: "45%" }]}>
                    <Text style={appCss.txtBtnTouch}>StopWatch</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setStopWatch(false)} style={[appCss.btnTouch, { width: "45%" }]}>
                    <Text style={appCss.txtBtnTouch}>Timer</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {stopwatch == true ? <StopWatch /> : <Timer />}
            </View>
            <ImageBall source={require('../../assets/ball.png')} style={styles.ball_img} />
        </View>
    );
};

const appCss = AppCss;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
    },
    ball_img: {
        margin: 50,
        height: 110,
        width: 100,
        alignSelf: 'center',
        top: 40
    },
});