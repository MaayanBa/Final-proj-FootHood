import React, { useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import { Context as AuthContext } from '../../../Contexts/AuthContext'


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
const styles = StyleSheet.create({
    verifyContainer: {
    },
    explanationText: {
        paddingBottom: 50,
        color: 'orange',
        fontSize: 30,
    },
    inputLabel: {
        alignItems: "flex-start",
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    sectionStyle: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
    },
    imageStyle: {
        margin: 5,
        height: 25,
        width: 25,
    },
    btnSendOTP: {
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 30,
        width: '60%',
        alignSelf: 'center',
        padding: 5,
    },
    txtBtnTouch: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})

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
                        <Text style={styles.explanationText}>Please enter the OTP code and insert a new password</Text>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.inputLabel}>OTP Code:</Text>
                        <View style={styles.sectionStyle}>
                            <Image source={require('../../../assets/soccerPlayer.png')} style={styles.imageStyle} />
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
                        <Text style={styles.inputLabel}>Password:</Text>
                        <View style={styles.sectionStyle}>
                            <Image source={require('../../../assets/soccerPlayer.png')} style={styles.imageStyle} />
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
                        <Text style={styles.inputLabel}>Confirm Password:</Text>
                        <View style={styles.sectionStyle}>
                            <Image source={require('../../../assets/soccerPlayer.png')} style={styles.imageStyle} />
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
                        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={styles.btnSendOTP}>
                            <Text style={styles.txtBtnTouch}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    )
}