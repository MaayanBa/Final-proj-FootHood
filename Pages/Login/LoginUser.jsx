import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button, StatusBar, Image, ImageBackground } from 'react-native';
import { Formik, Field, Form, useField, FieldAttributes, FieldArray } from "formik";
import * as yup from 'yup';
//import { Text } from 'react-native-elements';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppCss from '../../CSS/AppCss';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    alignItems: 'center',
    padding: 40,

  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
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
  inputLabel: {
    alignItems: "flex-start",
  },
  noAccount: {
    alignItems: 'center',
    padding: 20,
  },
  forgotPass: {
    alignItems: 'flex-end',
    padding: 7
  },
  loginBtn: {
    alignItems: 'center',
    padding: 30
  },
  check: {
    flexDirection: "row-reverse",
    //justifyContent: "space-between",
  },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7
  },
  remeberAndForgot:{
    flexDirection:"row",
    justifyContent:'space-between'

  }

})

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

export default function LoginUser(props) {
  const [checked, setChecked] = React.useState(false);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    readStorage()
  }, []);

  const Register = () => {
    props.navigation.navigate('Register');
    // props.updateTitle('Register');
  }

  const Forgot = () => {
    props.navigation.navigate('ForgotPassword');
    //props.history.push('/Forgot');
    //props.updateTitle('Forgot');
  }
  const Login = (values) => {
    if (checked) {
      setUserData(values);
      setStorage(userData);
      console.log(userData, 'Saved!')
    }
    else {
      console.log(values, 'Not Saved')
    }
    props.navigation.navigate('MainNav');
  }
  const setStorage = async (userData) => {
    try {
      let jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem("UserData", jsonValue);
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }
  const readStorage = async () => {
    try {
      let res = await AsyncStorage.getItem('UserData')
      if (res !== null) {
        setUserData(JSON.parse(res));
      }
    } catch (e) {
      return () => console.log('Error!');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text h3>Login</Text>
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => Login(values)}
      >
        {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
          <>
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
              {errors.email && touched.email ?
                null : <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
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
              {errors.password && touched.password ?
                null : <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }
            </View>

            <View style={styles.remeberAndForgot}>
              <TouchableOpacity onPress={() => Forgot()}>
                <View style={styles.forgotPass}>
                  <Text>Forgot Password</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.check}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={styles.rememberMe}>Remember me</Text>
              </View>

            </View>

            <View style={styles.formGroup}>
              <View style={styles.loginBtn}>
                <Button
                  onPress={handleSubmit}
                  title="Login"
                  disabled={!isValid}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <TouchableOpacity onPress={() => Register()}>
                <View style={styles.noAccount}>
                  <Text>Dont have an account?    Click to register</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>


    </View>

  );
}