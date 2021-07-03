import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from 'react-native-paper';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as CitiesContext } from '../../Contexts/CitiesContext';
import AppCss from '../../CSS/AppCss';
import LoginCss from '../../CSS/LoginCss';
import FaceBookLogin from './Components/FaceBookLogin';
import GmailLogin from './Components/GmailLogin';



const appCss = AppCss;
const loginCss = LoginCss;


export default function NewLoginUser({ navigation }) {
    const { state, signIn, tryLocalSignin, clearErrorMessage,clearUserFromGoogle } = useContext(AuthContext);
    const { GetListCities } = useContext(CitiesContext);
    const [email, setEmail] = useState('');
    const [passCode, setPassCode] = useState('');
    const [check_textInputChange, setCheck_textInputChange] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isValidUser, setIsValidUser] = useState(true);
    const [isValidPassCode, setIsValidPassCode] = useState(true);
    const [checked, setChecked] = React.useState(false);
    const { colors } = useTheme();

    useEffect(() => {
        clearErrorMessage();
        tryLocalSignin();
        GetListCities();
        // { console.log("The From storage is : ===> " + state.token) }
    }, []);

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
        if (val.trim().length >= 8) {
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
        <View style={appCss.container}>
            <StatusBar backgroundColor='transparent' barStyle="light-content" />
            <View style={loginCss.headerPart}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={3500}
                    source={require('../../assets/FootHoodLogo.png')}
                    style={loginCss.logo}
                    resizeMode="stretch"
                />
            </View>
            <Text style={[appCss.title, { marginBottom: 20, }]}>Welcome!</Text>
            <Animatable.View style={loginCss.footer} animation="fadeInUpBig">

                <View style={loginCss.login_field}>
                    <FontAwesome name="user-o" color={colors.text} size={20} style={{ bottom: 5 }} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        style={[loginCss.textInput, {
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
                        <Text style={appCss.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }

                <View style={loginCss.login_field}>
                    <Feather name="lock" color={colors.text} size={20} style={{ bottom: 5 }} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={secureTextEntry}
                        style={[loginCss.textInput, {
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
                        <Text style={appCss.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }

                <View style={loginCss.forgot_remember}>
                    <View style={loginCss.check}>
                        <Checkbox
                            uncheckedColor='#009387'
                            color='#009387'
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <Text style={loginCss.rememberMe}>Remember me</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                        <Text style={{ color: '#009387', marginTop: 7 }}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={loginCss.loginBtns}>
                    <TouchableOpacity style={[loginCss.buttonSignIn, { alignSelf: 'center', }]} onPress={() => { loginHandle(email, passCode, () => navigation.navigate('TabNav')) }}                >
                        <Text style={[loginCss.textSign, { color: '#fff' }]}>Sign In</Text>
                    </TouchableOpacity>
                    {
                        state.errorMessage != '' ?
                            <Text style={{ color: 'red', fontSize: 15, alignSelf: 'center', paddingTop: 4 }}>{state.errorMessage}</Text>
                            : null
                    }

                    <TouchableOpacity onPress={() => {navigation.navigate('Register'); clearUserFromGoogle() }}>
                        <Text style={{ color: '#009387', marginTop: 15, alignSelf: 'center' }}>Dont have an account? Register here !</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                        <FaceBookLogin />
                        <GmailLogin navigation={navigation}/>
                    </View>
                </View>
            </Animatable.View>

        </View>
    )
}




