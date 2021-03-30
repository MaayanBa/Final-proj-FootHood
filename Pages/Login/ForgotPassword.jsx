import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image } from 'react-native';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";


const RestorePassordSchema = yup.object().shape(
    {
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        otp: yup
            .string()
            .min(6, ({ min }) => `OTP number must be ${min} characters`)
            .required('OTP number is required'),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    }
)


const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        color: 'white',
        fontSize: 32,
      },
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    header: {
        padding: 30
    },
    mainContent: {
        justifyContent: 'space-around',
        //borderColor: 'black', borderWidth: 1

    },
    mc_row1: {
        paddingBottom: 55,
        //borderColor: 'black', borderWidth: 1
    },
    explanationText: {
        paddingBottom: 55,
        color: 'red',
        fontSize: 30,

    },
    ImageStyle: {
        //padding: 10,
        margin: 5,
        height: 25,
        width: 25,
    },
    signupButton: {
        alignItems: 'center',
        width: '10',
        padding: 50
    },
    textboxes: {
        alignItems: 'center',
    },
    inputLabel: {
        alignItems: "flex-start",
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
})

export default function ForgotPassword() {
    const [errorText, seterrorText] = useState(null);
    const [allowNewPass, setallowNewPass] = useState(false);
    const [continuePage, setcontinuePage] = useState(true)
    const restore = async (values) => {console.log("Success Restore"); setcontinuePage(false);}
    const sendOtp2Email = async () => {
        console.log("need to do fetch to server side to send email and otp")
        setcontinuePage(false)
    }

    const explanationText1 = "Please enter your email to send a OTP code."
    const explanationText2 = "Please enter the OTP code and insert a new password."
    return (
        // <View style={styles.container}>

        <Formik initialValues={{ email: '', otp: '', newPassword: '', }}
            onSubmit={(values) => restore(values)}
            validationSchema={RestorePassordSchema}>
            {({ handleChange, handleSubmit, values, errors, isValid }) => (

                <View style={styles.container}>
                    <View style={styles.header}>
                        <View>
                            <Text  style={styles.title}>Restore Password</Text>
                        </View>
                    </View>

                    <View style={styles.mainContent}>
                        <View style={styles.mc_row0}>
                            <View style={styles.formGroup}>
                                <Text style={styles.explanationText}>{continuePage ?  explanationText1: explanationText2}</Text>
                            </View>
                        </View>

                        {continuePage ?
                            <View style={styles.mc_row1}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Email:</Text>
                                    <View style={styles.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                        <TextInput
                                            name="email"
                                            placeholder="Email Address"
                                            onChangeText={handleChange('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                        />
                                    </View>
                                    {errors.email &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                    }
                                </View>

                                <View style={styles.formgruop}>
                                    <Button onPress={() => sendOtp2Email()}
                                        title="Send OTP Code"
                                        disabled={!isValid}
                                        style={styles.button}
                                    />
                                </View>
                            </View> :
                            <View style={styles.mc_row2}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Code:</Text>
                                    <View style={styles.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                        <TextInput
                                            name="otp"
                                            placeholder="OTP Code"
                                            onChangeText={handleChange('otp')}
                                            value={values.otp}
                                        />
                                    </View>
                                    {errors.otp &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.otp}</Text>
                                    }
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Password:</Text>
                                    <View style={styles.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                        <TextInput
                                            name="password"
                                            placeholder="Password"
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            secureTextEntry
                                        />
                                    </View>
                                    {errors.password &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                    }
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Confirm Password:</Text>
                                    <View style={styles.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                        <TextInput
                                            name="passwordConfirmation"
                                            placeholder="Password Confirmation"
                                            onChangeText={handleChange('passwordConfirmation')}
                                            value={values.passwordConfirmation}
                                            secureTextEntry
                                        />
                                    </View>
                                    {errors.passwordConfirmation &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.passwordConfirmation}</Text>
                                    }
                                </View>

                                <View style={styles.formgruop}>
                                    <Button onPress={handleSubmit}
                                        title="Restore Password"
                                        disabled={!isValid}
                                        style={styles.signupButton}
                                    />
                                </View>
                            </View>
                        }

                    </View>
                </View>

            )
            }
        </Formik >
        // </View>

    )
}
