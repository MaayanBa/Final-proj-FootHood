import CreateDataContext from './createDataContext';
import AuthApi from '../api/Auth';
import SettingsApi from '../api/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerApi from '../api/Timer';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'resetRestore_PassCode_values': {
            return { ...state, emailVerified: false, passCodeHasChanged: false }
        }
        case 'verifyEmail': {
            return { ...state, emailVerified: action.payload }
        }
        case 'changePasscode': {
            return { ...state, emailVerified: false, passCodeHasChanged: action.payload }
        }
        case 'signOut': {
            return { token: null, errorMessage: '' }
        }
        case 'signin': {
            return { ...state, token: action.payload, errorMessage: '' }
        }
        case 'clear_error_message': {
            return { ...state, errorMessage: '' }
        }
        case 'add_error': {
            console.log("and after i went to authReduce toAdd error")
            return { ...state, errorMessage: action.payload }
        }
        case 'register': {
            return { ...state, token: action.payload, errorMessage: '' }
        }
        case 'restorePassCode': {
            return { ...state, errorMessage: '' }
        }
        case 'PushNotificationToken': {
            return { ...state, token: action.payload }
        }
        case 'SetUserFromGoogle': {
            console.log(action.payload)
            return { ...state, userFromGoogle: action.payload }
        }
        case 'signInFromGoogle': {
            return { ...state, signFromGoogle: action.payload }
        }
        case 'clearUserFromGoogle': {
            return { ...state, userFromGoogle: action.payload, signFromGoogle: null }
        }
        case 'setSettingNotifications': {
            return { ...state, enableNotifications: action.payload, }
        }
        case 'ChangePersonalDetails':{
            return { ...state, token: action.payload }
        }
        default:
            return state
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: JSON.parse(token) })
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

const register = dispatch => {
    return async (player, callBack) => {
        //api request
        try {
            const response = await AuthApi.post('/Register', player);
            let jsonValue = JSON.stringify(response.data);
            //console.log("json value === " + jsonValue)
            await AsyncStorage.setItem('token', jsonValue)
            //console.log("response . data === " + response.data);
            dispatch({ type: 'register', payload: response.data });
            alert("You have sign up succesfuly ! \nEnjoy")
        } catch (err) {
            console.log(err.response.data)
            dispatch({ type: 'add_error', payload: 'Somthing went wrong with registration' })
        }
    }
}

const signIn = dispatch => {
    return async (player, checked) => {
        //api request
        try {
            const data = {
                Email: player.email,
                Passcode: player.passcode
            }

            const options = {
                //method: "Post",
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                }),
                //body: JSON.stringify(data)
            }
            let playerDetails = await AuthApi.post('/LoginUser', data, options);
            if (playerDetails.status < 400 || playerDetails.status >= 500) {
                if (checked) {
                    let jsonValue = JSON.stringify(playerDetails.data);
                    await AsyncStorage.setItem('token', jsonValue);
                }
                await dispatch({ type: 'signin', payload: playerDetails.data });
            }

            let jsonValue = JSON.stringify(true);
            const settings = await AsyncStorage.setItem('Settings',jsonValue);
            dispatch({ type: 'setSettingNotifications', payload: true })

        } catch (err) {
            //if fail error massege
            console.log("im in catch of sign in")
            dispatch({
                type: 'add_error',
                payload: 'Somthing went wrong with the SignIn'
            })
        }
    }
}

const signOut = dispatch => async (Email) => {
    //console.log(JSON.stringify( AsyncStorage.getItem('token')))
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('expoTokenDate')
    await AsyncStorage.removeItem('Settings')
    await AuthApi.post('/LogOut', { Email });
    dispatch({ type: 'signOut' })
}

const restorePassCode = dispatch => async (email) => {
    try {
        let emailVerify = await AuthApi.post('/RequestOTP', { email });
        if (emailVerify.data == true && emailVerify.status === 200) {
            dispatch({ type: 'verifyEmail', payload: emailVerify.data })
            alert("Email has been sent")
        }
    } catch (error) {
        alert("The you have entered a wrong email. Please try again")
    }
}

const updatPassCode = dispatch => async (player) => {
    try {
        let passCodeChanged = await AuthApi.put('/ChangePassCode', player);
        if (passCodeChanged.status < 400 || passCodeChanged.status >= 500) {
            dispatch({ type: 'changePasscode', payload: true })
            alert("Password updated")
        }
    } catch (error) {
        alert("The otp you have entered is wrong. Please try again")
    }
}
const resetRestore_PassCode_values = dispatch => async (player) => {
    dispatch({ type: 'resetRestore_PassCode_values' })
}

const pushNotificationToken = dispatch => async (Email, TokenNotfication) => {
    try {
        let response = await AuthApi.post('/PushNotificationToken', { Email, TokenNotfication });
        dispatch({ type: 'PushNotificationToken', payload: response.data })
    } catch (error) {
        console.log("error in pushNotificationToken")
        console.log(error.message)
    }
}

const setUserFromGoogle = dispatch => async (user) => {
    try {
        dispatch({ type: 'SetUserFromGoogle', payload: user })
    } catch (error) {
        console.log("error in setUserFromGoogle")
        console.log(error.message)
    }
}

const CheckIfExist = dispatch => async (user) => {
    try {
        const data = {
            Email: user.email,
            Passcode: user.id
        }
        const response = await AuthApi.post('/CheckIfExist', { Email: user.email, Passcode: user.id });
        if (response.data === true)
            dispatch({ type: 'signInFromGoogle', payload: response.data })
        else
            dispatch({ type: 'signInFromGoogle', payload: false })

    } catch (err) {
        console.log("Something Went wrong when you tried to check this player  ! ")
        console.log(err.message)
    }
}

const clearUserFromGoogle = dispatch => async (bool) => {
    try {
        dispatch({ type: 'clearUserFromGoogle', payload: null })
    } catch (error) {
        console.log("error in clearUserFromGoogle")
        console.log(error.message)
    }
}
const getSettingNotifications = dispatch => async ()=>{
    try {
        const settings = await AsyncStorage.getItem('Settings');
        // console.log(settings)
        dispatch({ type: 'setSettingNotifications', payload: JSON.parse(settings) })
    } catch (error) {
        console.log("error in getSettingNotifications")
        console.log(error.message)
    }
}

const setSettingNotifications = dispatch => async (bool)=>{
    try {
        let jsonValue = JSON.stringify(bool);
        //console.log("json value === " + jsonValue)
        await AsyncStorage.setItem('Settings', jsonValue)
        dispatch({ type: 'setSettingNotifications', payload: bool })
    } catch (error) {
        console.log("error in setSettingNotifications")
        console.log(error.message)
    }
}

const ChangePersonalDetails = dispatch => async (player)=>{
    try {
        const response = await SettingsApi.post('/ChangePersonalDetails', player);
        let jsonValue = JSON.stringify(response.data);
        await AsyncStorage.setItem('token', jsonValue)
        console.log("response . data === " + response.data);
        console.log( response.data);
        dispatch({ type: 'ChangePersonalDetails', payload: response.data })
        alert("Details updated succesfuly ! \nEnjoy")
        
    } catch (error) {
        alert("Something went wrong with changing personal details")
        console.log("error in ChangePersonalDetails")
        console.log(error.message)
    }
}

const StartTimer = dispatch => async ()=>{
    try {
        await TimerApi.post('/StartTimer');
    } catch (error) {
        console.log("error in StartTimer")
    }
}

const StopTimer = dispatch => async ()=>{
    try {
        await TimerApi.get('/StopTimer');
    } catch (error) {
        console.log("error in StopTimer")
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    authReducer,
    {
        register,
        signIn,
        clearErrorMessage,
        tryLocalSignin,
        signOut,
        restorePassCode,
        updatPassCode,
        resetRestore_PassCode_values,
        pushNotificationToken,
        setUserFromGoogle,
        clearUserFromGoogle,
        CheckIfExist,
        getSettingNotifications,
        setSettingNotifications,
        ChangePersonalDetails,
        StartTimer,
        StopTimer
    },
    {
        token: null,
        userFromGoogle: null,
        errorMessage: '',
        emailVerified: false,
        passCodeHasChanged: false,
        signFromGoogle: null,
        signFromFacebook: false,
        enableNotifications: true
    }
);





