//import React, { useContext, useState } from 'react';
import CreateDataContext from './createDataContext';
import AuthApi from '../api/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { navigate } from '../Navigations/navigationRef';
//import { useNavigation } from '@react-navigation/native';



const authReducer = (state, action) => {
    switch (action.type) {
        case 'clear_error_message': {
            return { ...state, errorMessage: '' }
        }
        case 'add_error': {
            return { ...state, errorMessage: /*action.payload*/'' }
        }
        case 'register': {
            return { token: action.payload, errorMessage: '' }
        }
        default:
            return state
    }
};
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(JSON.parse(token))
}
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })
}

const register = dispatch => {
    return async (player) => {

        //api request
        try {
            console.log(player)
            const response = await AuthApi.post('/Register', player);
            let jsonValue = JSON.stringify(response);
            await AsyncStorage.setItem('token', jsonValue)
            dispatch({ type: 'register', payload: response.data.token });
            //console.log(response.data)
            
            //setNavigate('NewLoginUser','')
            // const navigation = useNavigation();
            // navigation.navigate('NewLoginUser')

        } catch (err) {
            console.log(err.response.data)
            dispatch({ type: 'add_error', payload: 'Somthing went wrong with registration' })
        }
        //if sign up, modify our state, and say ok

        //if fail error massege
    }
}

const signIn = dispatch => {
    return async ({ EmailPlayer, PassCode }) => {

        //api request
        try {
            const response = await AuthApi.get('/LoginUser', { EmailPlayer, PassCode });
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'signin', payload: response.data.token });
            console.log(response.data)
            //setNavigate('NewLoginUser','')
            // const navigation = useNavigation();
            // navigation.navigate('NewLoginUser')

        } catch (err) {
            console.log(err.response.data)
            dispatch({
                type: 'add_error',
                payload: 'Somthing went wrong with the SignIn'
            })
        }
        //if sign up, modify our state, and say ok

        //if fail error massege
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    authReducer,
    {
        register,
        signIn,
        clearErrorMessage,
        tryLocalSignin
    },
    {
        token: null,
        errorMessage: '',
    }
);



// const forgotPassCode = (dispatch) => {
//     return ({ email }) => {
//         //api request

//         //if exist, and say ok

//         //if fail error massege
//     }
// }

// const checkOTP = (dispatch) => {
//     return ({ otp, passCode }) => {
//         //api request

//         //if succes, say ok

//         //if fail error massege
//     }
// }



