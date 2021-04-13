import React, { useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import { Context as AuthContext } from '../../../Contexts/AuthContext';
import AppCss from '../../../CSS/AppCss';

const appCss = AppCss;
const RestorePassordSchema = yup.object().shape(
    {
        newPassCode: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        otp: yup
            .string()
            .min(6, ({ min }) => `OTP number must be ${min} characters`)
            .required('OTP number is required'),
        passCodeConfirmation: yup
            .string()
            .oneOf([yup.ref('newPassCode'), null], 'Passwords must match'),
    }
)


export default function ResetPassCode() {
    const { state, updatPassCode } = useContext(AuthContext);

    const changePassCode = async (values) => {
        let changes = {
            passCode: values.newPassCode,
            otp: values.otp,
        }
        await updatPassCode(changes)
        // state.passCodeHasChanged ? resetRestore_PassCode_values() : null
        //navigation.navigate("NewLoginUser")
        alert("Password updated")
        console.log("Success Reset");
        
    }
    return (
        <Formik initialValues={{ otp: '', newPassCode: '', passCodeConfirmation: '' }}
            onSubmit={(values) => changePassCode(values)}
            validationSchema={RestorePassordSchema}>
            {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
                <View style={styles.verifyContainer}>
                    <View style={styles.formGroup}>
                        <Text style={appCss.explanationText}>Please enter the OTP code and insert a new password</Text>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={appCss.inputLabel}>OTP Code:</Text>
                        <View style={appCss.sectionStyle}>
                            <Image source={require('../../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                            <TextInput
                                name="otp"
                                placeholder="OTP Code"
                                onChangeText={handleChange('otp')}
                                value={values.otp}
                            />
                        </View>
                        {errors.otp && touched.otp ?
                            <Text style={{ fontSize: 15, color: 'red' }}>{errors.otp}</Text> : null
                        }
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={appCss.inputLabel}>Password:</Text>
                        <View style={appCss.sectionStyle}>
                            <Image source={require('../../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                            <TextInput
                                name="newPassCode"
                                placeholder="Password"
                                onChangeText={handleChange('newPassCode')}
                                value={values.newPassCode}
                                secureTextEntry
                            />
                        </View>
                        {errors.newPassCode && touched.newPassCode ?
                            <Text style={{ fontSize: 15, color: 'red' }}>{errors.newPassCode}</Text> : null
                        }
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={appCss.inputLabel}>Confirm Password:</Text>
                        <View style={appCss.sectionStyle}>
                            <Image source={require('../../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
                            <TextInput
                                name="passCodeConfirmation"
                                placeholder="Password"
                                onChangeText={handleChange('passCodeConfirmation')}
                                value={values.passCodeConfirmation}
                                secureTextEntry
                            />
                        </View>
                        {errors.passCodeConfirmation && touched.passCodeConfirmation ?
                            <Text style={{ fontSize: 15, color: 'red' }}>{errors.passCodeConfirmation}</Text> : null
                        }
                    </View>

                    <View style={styles.formgruop}>
                        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={[appCss.btnTouch,{width:'60%'}]}>
                            <Text style={appCss.txtBtnTouch}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    )
}