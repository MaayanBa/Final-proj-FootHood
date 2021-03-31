import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native';
import { Formik} from "formik";
import * as yup from 'yup';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
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
    color: 'white',
    fontSize: 32,
    marginBottom: 30
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16
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
  },
  rememberMe: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    color: 'white'
  },
  remeberAndForgot: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  forgotPassText: {
    color: 'white'
  },
  noAccountTxt: {
    color: 'white'
  },
  btnLogin: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 30,
    width: '40%',
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
  faceAndGmail_btn:{
    height:85,
    width:85
  },

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


  async function fetchdataFromFacebook() {
    try{
    const { type, token } = await Facebook.logInWithReadPermissionsAsync("2582654205369524", {
      permissions: ["public_profile"],
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
//   try {
//     await Facebook.initializeAsync({
//       options: {
//         appId: "2582654205369524",
//         appName: "FootHood",
//       },
//     });
//     const {
//       type,
//       token,
//       expires,
//       permissions,
//       declinedPermissions,
//     } = await Facebook.logInWithReadPermissionsAsync({
//       permissions: ["public_profile", "email"],
//     });
//     if (type === "success") {
//       // Get the user's name using Facebook's Graph API
//       const response = await fetch(
//         `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
//       );
//       const userInfo = await response.json();
//       console.log(userInfo)
//       //add async and db
//       // email = userInfo.email;
//       // password = userInfo.id;
//       checkUserLogin();
//     } else {
//       alert(`Facebook Login cancel`);
//       type === "cancel";
//     }
//   } catch ({ message }) {
//     alert(`Facebook Login Error: ${message}`);
//   }
// }

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
    props.navigation.navigate('TabNav');
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
        <Text style={styles.title}>Login</Text>
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
                  <Text style={styles.forgotPassText}>Forgot Password</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.check}>
                <Checkbox
                  uncheckedColor='white'
                  color='white'
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={styles.rememberMe}>Remember me</Text>
              </View>

            </View>

            {/* <View style={styles.formGroup}>
              <View style={styles.loginBtn}>
                <Button
                  onPress={handleSubmit}
                  title="Login"
                  disabled={!isValid}
                />
              </View>
            </View> */}
            <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={styles.btnLogin}>
              <Text style={styles.txtBtnTouch}>Login</Text>
            </TouchableOpacity>

            <View style={styles.formGroup}>
              <TouchableOpacity onPress={() => Register()}>
                <View style={styles.noAccount}>
                  <Text style={styles.noAccountTxt}>Dont have an account?    Click to register</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => fetchdataFromFacebook()}>
                <View style={styles.loginBtn}>
                  <Image source={require('../../assets/Facebook.png')} style={styles.faceAndGmail_btn} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signInWithGoogleAsync()}>
                <View style={styles.loginBtn}>
                  <Image source={require('../../assets/Gmail.png')} style={styles.faceAndGmail_btn} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          </>
        )}
      </Formik>


    </View>

  );
}