import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AppCss from '../../../CSS/AppCss';
import * as Google from 'expo-google-app-auth';
import { Context as AuthContext } from '../../../Contexts/AuthContext';

const appCss = AppCss;

export default function GmailLogin({ navigation }) {

    const { state: { signFromGoogle, userFromGoogle }, setUserFromGoogle, signIn, clearUserFromGoogle, CheckIfExist } = useContext(AuthContext)


    async function signInWithGoogleAsync() {
        try {
            clearUserFromGoogle()
            const { type, accessToken, user } = await Google.logInAsync({
                iosClientId: `24351265915-9skrp62884dhu2eo38qp879o2j0ihehp.apps.googleusercontent.com`,
                androidClientId: `24351265915-ljcsflkkpbm3vi3n16ug5d2ud6k51ujn.apps.googleusercontent.com`,
                // iosStandaloneAppClientId: `24351265915-9skrp62884dhu2eo38qp879o2j0ihehp.apps.googleusercontent.com`,
                // androidStandaloneAppClientId: `24351265915-ljcsflkkpbm3vi3n16ug5d2ud6k51ujn.apps.googleusercontent.com`,
                scopes: ['profile', 'email'],
            });


            if (type === 'success') {
                /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
                // console.log(user);
                setUserFromGoogle(user);
                CheckIfExist(user)

                // navigation.navigate('Register')

                // let player = {
                //     email: user.email,
                //     passcode: user.id
                // }
            }
        } catch (e) {
            console.log("Error")
            console.log(e)
            return { error: true };
        }
    }

    useEffect(() => {
        if (signFromGoogle === true) {
            // console.log(userFromGoogle)
            let player = {
                email: userFromGoogle.email,
                passcode: userFromGoogle.id
            }
            signIn(player, false);
        }
        else if (signFromGoogle === false)
            navigation.navigate('Register')

    }, [signFromGoogle])
    return (
        <TouchableOpacity onPress={() => signInWithGoogleAsync()}>
            <View style={appCss.social_btn}>
                <Image source={require('../../../assets/Gmail.png')} style={appCss.faceAndGmail_btn} />
            </View>
        </TouchableOpacity>
    )
}
