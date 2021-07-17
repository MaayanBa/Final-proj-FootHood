import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image as ImageBall, LogBox, SafeAreaView } from 'react-native';
import AppCss from '../../CSS/AppCss';
import StopWatch from './StopWatch';
import Timer from './Timer';
import TextTickerRow from '../Main/TextTickerRow';


export default function Watches(props) {
    const [stopwatch, setStopWatch] = useState(true);

    LogBox.ignoreLogs([
        'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setStopWatch(true)} style={[appCss.btnTouch, { width: "45%" }, stopwatch ? { backgroundColor: 'rgba(100,100, 100, 0.8)' } : null]}>
                    <Text style={appCss.txtBtnTouch}>Timer</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setStopWatch(false)} style={[appCss.btnTouch, { width: "45%" }, stopwatch ? null : { backgroundColor: 'rgba(100,100, 100, 0.8)' }]}>
                    <Text style={appCss.txtBtnTouch}>StopWatch</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {stopwatch == true ?  <Timer />: <StopWatch />}
            </View>
            <TextTickerRow navigation={props.navigation} />
        </View>
    );
};

const appCss = AppCss;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        marginTop:10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30
    },
});