import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image as ImageBall, Dimensions, Switch } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppCss from '../../CSS/AppCss';
import { AntDesign } from '@expo/vector-icons';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import Modal_ActionAlert from '../Modal_ActionAlert';


export default function Settings(props) {
    const { state: { enableNotifications }, setSettingNotifications } = useContext(AuthContext);
    const [isEnabledChatAlert, setIsEnabledChatAlert] = useState(enableNotifications)
    const [alertActionModalVisible, setAlertActionModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertAction, setAlertAction] = useState('');

    const toggleSwitch = () => { setIsEnabledChatAlert(previousState => !previousState) }

    useEffect(() => {
        setSettingNotifications(isEnabledChatAlert)
    }, [isEnabledChatAlert])

    const SignOut = () => {
        setAlertText("Are you sure you want to log out?")
        setAlertAction("LogOutUser")
        setAlertActionModalVisible(true)
    }

    return (
        <View style={appCss.container}>
            {/* <Header /> */}
            <View style={styles.header}>
                <Text style={[appCss.title, appCss.space]}>Settings</Text>
            </View>

            {/* <MainContent /> */}
            <View style={styles.mainContent}>
                {alertActionModalVisible && <Modal_ActionAlert alertActionModalVisible={alertActionModalVisible} setAlertActionModalVisible={() => setAlertActionModalVisible(!alertActionModalVisible)} text={alertText} action={alertAction} />}
                <TouchableOpacity style={[appCss.btnTouch, styles.btnTouch_Extra]} onPress={() => props.navigation.navigate('EditPersonalDetails')}>
                    <Text style={appCss.txtBtnTouch}>  Change personal details  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[appCss.btnTouch, styles.btnTouch_Extra]} onPress={() => props.navigation.navigate('ChangePassWord')}>
                    <Text style={appCss.txtBtnTouch}>  Change Password </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', padding: 30, top: 10 }}>
                    <Text style={[appCss.txtBtnTouch, styles.txtBtnTouch_Extra]}>  Notifications </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#00ff77" }}
                        thumbColor={isEnabledChatAlert ? "white" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabledChatAlert}
                        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], right: 15, }}
                    />
                </View>

                {/* <IMGBall /> */}
                <ImageBall source={require('../../assets/ball.png')} style={styles.ball_img} />
                <TouchableOpacity style={[appCss.btnTouch,]} onPress={() => SignOut()}>
                    <Text style={appCss.txtBtnTouch}>  Logout  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[appCss.btnTouch, { width: '80%' }]} onPress={() => props.navigation.navigate('SendFeedback')}>
                    <Text style={appCss.txtBtnTouch}> Send feedback    <AntDesign name="questioncircleo" size={24} color="black" /></Text>
                </TouchableOpacity>
            </View>

            {/* <Footer /> */}
            <View style={styles.footer}>
                <TouchableOpacity style={{ right: 30, bottom: 20 }} onPress={() => props.navigation.goBack()}>
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
        flex: 1,
    },
    btnTouch_Extra: {
        width: Dimensions.get('window').width - 80,
    },
    txtBtnTouch_Extra: {
        color: 'white',
        fontSize: 25
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
        marginTop: 50,
        height: 110,
        width: 100,
        alignSelf: 'center',
    },
});