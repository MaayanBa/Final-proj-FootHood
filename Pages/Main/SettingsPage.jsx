import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Image as ImageBall } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppCss from '../../CSS/AppCss';
import { AntDesign } from '@expo/vector-icons';
import { Context as AuthContext } from '../../Contexts/AuthContext';
// import Header from './Header';


const appCss = AppCss;
const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        alignItems: 'center',
        padding: 40
    },
    title: {
        alignItems: 'center',
        padding: 40,
        color: 'white',
        fontSize: 40,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchBtn: {
        justifyContent: 'space-evenly'

    },

    changeBtn: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',

    },
    ball_img: {
        margin: 50,
        height: 110,
        width: 100,
        alignSelf: 'center',
        top: 40
    },

    footer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
});

export default function Settings(props) {
    const { signOut } = useContext(AuthContext);

    const SignOut = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                },
                { text: "OK", onPress: () => signOut() }
            ]
        );
    }

    return (
        <View style={styles.container}>
            {/* <View style={{ top: 35, paddingLeft:20,paddingRight:40 }}>
                <Header navigation={props.navigation} />
            </View> */}
            <View style={styles.header}>
                <Text style={[appCss.title, appCss.space]}>Settings</Text>
            </View>
            <View style={styles.mainContent}>
                <View>
                    <TouchableOpacity style={[appCss.btnTouch, { width: '100%' },]} onPress={() => console.log("change personal btn")}>
                        <Text style={appCss.txtBtnTouch}>  Change personal details  </Text>
                    </TouchableOpacity>
                </View>
                <ImageBall source={require('../../assets/ball.png')} style={styles.ball_img} />
                <TouchableOpacity style={[appCss.btnTouch, { width: '80%' }]} onPress={() => SignOut()}>
                    <Text style={appCss.txtBtnTouch}>  Logout  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[appCss.btnTouch, { width: '80%' }]} onPress={() => console.log("feedback btn")}>
                    <Text style={appCss.txtBtnTouch}> Send feedback    <AntDesign name="questioncircleo" size={24} color="black" /></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{ right: 30, bottom: 20 }} onPress={() => props.navigation.goBack()}>
                    <AntDesign  name="arrowleft" size={30} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    )
}