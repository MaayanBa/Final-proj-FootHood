import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Image as ImageBall, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import AppCss from '../../CSS/AppCss';
import { AntDesign } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as SettingsContext } from '../../Contexts/SettingsContext';
import { useTheme } from '@react-navigation/native';

export default function ChangePassWord(props) {
    const { state: { token } } = useContext(AuthContext);
    const { ChangePasscode } = useContext(SettingsContext);
    const [email, setEmail] = useState("")
    const [passCode, setPassCode] = useState('');
    const [newPassCode, setNewPassCode] = useState('');
    const [confirmPassCode, setConfirmPassCode] = useState(null);
    const [invalidPassword, setInvalidPassword] = useState(true)
    const [secureCurrentPassword, setSecureCurrentPassword] = useState(true);
    const [secureNewPassword, setSecureNewPassword] = useState(true);
    const { colors } = useTheme();

    useEffect(() => {
        if (newPassCode.trim().length >= 8)
            setInvalidPassword(true);
    }, [newPassCode])

    const updateSecureCurrentPassword = () => {
        setSecureCurrentPassword(!secureCurrentPassword)
    }

    const updateSecureNewPassword = () => {
        setSecureNewPassword(!secureNewPassword)
    }

    const Change = () => {
        if (email.toLowerCase() === token.Email.toLowerCase() && passCode !== null) {
            if (newPassCode.trim().length >= 8) {
                if (newPassCode === confirmPassCode) {
                    let player = {
                        Email: email,
                        Passcode: passCode,
                        NewPasscode: newPassCode
                    }
                    ChangePasscode(player);
                    props.navigation.goBack();
                }
                else
                    alert("Please make sure to confirm password")
            }
            else
                setInvalidPassword(false)
        }
        else
            alert("Something wrong with your email or password,\nPlease make sure you inserted the correct details")
    }
    return (
        <View style={[appCss.container, { paddingHorizontal: 35 }]}>
            {/* <Header /> */}
            <View style={styles.header}>
                <Text style={[appCss.title, appCss.space]}>Change Password</Text>
            </View>

            {/* <MainContent /> */}
            <View style={styles.mainContent}>

                {/* Insert Email */}
                <View style={styles.formGroup}>
                    <Text style={appCss.inputLabel}>Email:</Text>
                    <View style={appCss.sectionStyle}>
                        <Image source={require('../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                        <TextInput
                            placeholder="Please enter your email"
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>
                </View>

                {/* Insert Current Password */}
                <View style={styles.formGroup}>
                    <Text style={appCss.inputLabel}>Current Password:</Text>
                    <View style={appCss.sectionStyle}>
                        <Feather name="lock" color={colors.text} size={20} style={appCss.soccerPlayer_img} />
                        <TextInput
                            placeholder="Please enter your current password"
                            onChangeText={(p) => setPassCode(p)}
                            autoCapitalize="none"
                            secureTextEntry={secureCurrentPassword}
                        />
                        <TouchableOpacity onPress={updateSecureCurrentPassword} style={{ left: 35 }}               >
                            {secureCurrentPassword ? <Feather name="eye-off" color="grey" size={20} /> : <Feather name="eye" color="grey" size={20} />}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Insert New Password */}
                <View style={[styles.formGroup, { marginTop: 30 }]}>
                    <Text style={appCss.inputLabel}>New Password:</Text>
                    <View style={appCss.sectionStyle}>
                        <Feather name="lock" color={colors.text} size={20} style={appCss.soccerPlayer_img} />
                        <TextInput
                            placeholder="Please enter your new password"
                            onChangeText={(p) => setNewPassCode(p)}
                            autoCapitalize="none"
                            secureTextEntry={secureNewPassword}
                        />
                        <TouchableOpacity onPress={updateSecureNewPassword} style={{ left: 54 }}               >
                            {secureNewPassword ? <Feather name="eye-off" color="grey" size={20} /> : <Feather name="eye" color="grey" size={20} />}
                        </TouchableOpacity>
                        {newPassCode === confirmPassCode ? <Feather name="check" color="lightgreen" size={25} /> : null}

                    </View>
                </View>
                {invalidPassword ? null : <Text style={{ color: 'red', fontSize: 14, bottom: 5, paddingBottom: 5 }}>Your password must have 8 digit at less</Text>}

                {/* Confirm New Password */}
                <View style={styles.formGroup}>
                    <Text style={appCss.inputLabel}>Confirm Password:</Text>
                    <View style={appCss.sectionStyle}>
                        <Feather name="lock" color={colors.text} size={20} style={appCss.soccerPlayer_img} />
                        <TextInput
                            placeholder="Please confirm your new password"
                            onChangeText={(p) => setConfirmPassCode(p)}
                            autoCapitalize="none"
                            secureTextEntry={true}
                        />
                        {newPassCode === confirmPassCode ? <Feather style={{ left: 3 }} name="check" color="lightgreen" size={25} /> : null}
                    </View>
                </View>

                {/* BTN Change Password */}
                <TouchableOpacity style={[appCss.btnTouch, styles.btnTouch_Extra]} onPress={() => Change()}>
                    <Text style={appCss.txtBtnTouch}>  Change Password </Text>
                </TouchableOpacity>

                {/* <IMG Ball /> */}
                <ImageBall source={require('../../assets/ball.png')} style={styles.ball_img} />
            </View>

            {/* <Footer /> */}
            <View style={styles.footer}>
                <TouchableOpacity style={{ right: 30, bottom: invalidPassword ? 30 : 50 }} onPress={() => props.navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    title: {
        alignItems: 'center',
        padding: 40,
        color: 'white',
        fontSize: 40,
    },
    mainContent: {
        // flex: 1,
        marginTop: 40
    },
    btnTouch_Extra: {
        width: Dimensions.get('window').width - 160,
    },
    ball_img: {
        marginTop: 30,
        height: 110,
        width: 100,
        alignSelf: 'center',
    },
    footer: {
        justifyContent: 'flex-end',
        flex: 0,
        left: 35

    },
});