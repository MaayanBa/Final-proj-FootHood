import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { Checkbox } from 'react-native-paper';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { Context as AuthContext } from '../../Contexts/AuthContext';


const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    footer: {
        flex: 1.5,
        backgroundColor: "white",
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginBottom: 30,
        width: "90%",
        alignSelf: 'center',

    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        //alignItems: 'flex-end',
        marginTop: 10,
        backgroundColor: "#08d4c4",
        width: 160,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',


    },
    action: {
        flexDirection: 'row-reverse',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginBottom: 20,
        padding: 5,


    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingRight: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    forgot_Register: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },

    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    check: {
        flexDirection: "row-reverse",
        justifyContent: 'center',
        paddingTop: 20
    },
    rememberMe: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 7,
        color: '#009387'
    },
    loginBtns: {
        top: 20
    },
    socialBtn: {
        alignItems: 'center',
        padding: 30
        , paddingTop: 10
    },
    faceAndGmail_btn: {
        height: 85,
        width: 85
    },
});


export default function NewLoginUser({ navigation }) {
    const { state, signIn, tryLocalSignin, clearErrorMessage } = useContext(AuthContext);
    const [userData, setUserData] = useState('');
    // const [data, setData] = useState({
    //     username: '',
    //     password: '',
    //     check_textInputChange: false,
    //     secureTextEntry: true,
    //     isValidUser: true,
    //     isValidPassword: true,
    // });
    const [email, setEmail] = useState('');
    const [passCode, setPassCode] = useState('');
    const [check_textInputChange, setCheck_textInputChange] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isValidUser, setIsValidUser] = useState(true);
    const [isValidPassCode, setIsValidPassCode] = useState(true);

    const [checked, setChecked] = React.useState(false);

    const { colors } = useTheme();

    const readStorage = async () => {
        // try {
        //     let res = await AsyncStorage.getItem('UserData')
        //     if (res !== null) {
        //         setUserData(JSON.parse(res));
        //     }
        // } catch (e) {
        //     return () => console.log('Error!');
        // }
    }

    useEffect(() => {
        clearErrorMessage();
        tryLocalSignin()
        // { console.log("The From storage is : ===> " + state.token) }

    }, []);

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

    const textInputChange = (val) => {
        if (val.trim().length >= 1) {            
            setEmail(val);
            clearErrorMessage()
            setCheck_textInputChange(true);
            setIsValidUser(true);
        }
        else {
            setEmail(val);
            setCheck_textInputChange(false);
            setIsValidUser(false);
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 1) {
            setPassCode(val);
            setIsValidPassCode(true);
        } else {
            setPassCode(val);
            setIsValidPassCode(false);
        }
    }

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setIsValidUser(true);
        } else {
            setIsValidUser(false);
        }
    }

    const loginHandle = (email, passcode) => {
        let player = {
            email,
            passcode
        }
        clearErrorMessage();
        signIn(player, checked);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='transparent' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../assets/FootHoodLogo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Text style={[styles.title, { marginBottom: 20, }]}>Welcome!</Text>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">


                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} style={{ bottom: 5 }} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {check_textInputChange ?
                        <Animatable.View animation="bounceIn"                       >
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View>
                        : null}
                </View>
                {isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }



                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} style={{ bottom: 5 }} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={secureTextEntry}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}                >
                        {secureTextEntry ?
                            <Feather name="eye-off" color="grey" size={20} />
                            : <Feather name="eye" color="grey" size={20} />
                        }
                    </TouchableOpacity>
                </View>
                {isValidPassCode ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }

                <View style={styles.forgot_Register}>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                        <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: '#009387', marginTop: 15 }}>Register Here !</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.loginBtns}>
                    <TouchableOpacity style={[styles.button, { alignSelf: 'center', }]} onPress={() => { loginHandle(email, passCode, () => navigation.navigate('TabNav')) }}                >
                        <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                    </TouchableOpacity>
                    {
                    state.errorMessage != ''  ?
                        <Text style={{ color: 'red', fontSize: 15, alignSelf: 'center' , paddingTop:4}}>{state.errorMessage}</Text>
                        : null
                    }
                    <View style={styles.check}>
                        <Checkbox
                            uncheckedColor='#009387'
                            color='#009387'
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <Text style={styles.rememberMe}>Remember me</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                        <TouchableOpacity onPress={() => fetchdataFromFacebook()}>
                            <View style={styles.socialBtn}>
                                <Image source={require('../../assets/Facebook.png')} style={styles.faceAndGmail_btn} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => signInWithGoogleAsync()}>
                            <View style={styles.socialBtn}>
                                <Image source={require('../../assets/Gmail.png')} style={styles.faceAndGmail_btn} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animatable.View>

        </View>

    )
}





