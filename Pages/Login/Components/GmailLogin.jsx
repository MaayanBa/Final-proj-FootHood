import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AppCss from '../../../CSS/AppCss';
const appCss = AppCss;

export default function GmailLogin(props) {

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: '24351265915-ljcsflkkpbm3vi3n16ug5d2ud6k51ujn.apps.googleusercontent.com',
                iosClientId: '24351265915-9skrp62884dhu2eo38qp879o2j0ihehp.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result);
                return result;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    return (
        <TouchableOpacity onPress={() => signInWithGoogleAsync()}>
            <View style={appCss.social_btn}>
                <Image source={require('../../../assets/Gmail.png')} style={appCss.faceAndGmail_btn} />
            </View>
        </TouchableOpacity>
    )
}
