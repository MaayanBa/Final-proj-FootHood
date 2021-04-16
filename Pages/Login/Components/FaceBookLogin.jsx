import React from 'react'
import { StyleSheet ,View, TouchableOpacity,Image } from 'react-native';
import AppCss from '../../../CSS/AppCss';
const appCss = AppCss;

export default function FaceBookLogin(props) {

    async function fetchdataFromFacebook() {
        try {
            await Facebook.initializeAsync({
                options: {
                    appId: "2582654205369524",
                    appName: "FootHood",
                },
            });
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile", "email"],
            });
            if (type === "success") {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
                );
                const userInfo = await response.json();
                console.log(userInfo)
                //add async and db
                // email = userInfo.email;
                // password = userInfo.id;
                checkUserLogin();
            } else {
                alert(`Facebook Login cancel`);
                type === "cancel";
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    return (
        <TouchableOpacity onPress={() => fetchdataFromFacebook()}>
            <View style={appCss.social_btn}>
                <Image source={require('../../../assets/Facebook.png')} style={appCss.faceAndGmail_btn} />
            </View>
        </TouchableOpacity>
    )
}
