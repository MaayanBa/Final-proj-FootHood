import React, { useContext, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import { Context as AuthContext } from '../../../Contexts/AuthContext'


const RestorePassordSchema = yup.object().shape(
   {
      email: yup
         .string()
         .email("Please enter valid email")
         .required('Email Address is Required')
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

export default function EmailVerification() {
   const {  restorePassCode, resetRestore_PassCode_values } = useContext(AuthContext);

   useEffect(() => {
      resetRestore_PassCode_values()
   }, [])

   const verifyEmail = async (values) => {
      console.log(values.email)
      await restorePassCode(values.email)
      alert("Email has been sended")
      //console.log("Success Restore");
   }
   return (
      <Formik initialValues={{ email: '' }}
         onSubmit={(values) => verifyEmail(values)}
         validationSchema={RestorePassordSchema}>
         {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
            <View style={styles.verifyContainer}>
               <View style={styles.formGroup}>
                  <Text style={styles.explanationText}>Please enter your email to send an OTP code</Text>
               </View>

               <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Email:</Text>
                  <View style={styles.sectionStyle}>
                     <Image source={require('../../../assets/soccerPlayer.png')} style={styles.imageStyle} />
                     <TextInput
                        name="email"
                        placeholder="Email Address"
                        onChangeText={handleChange('email')}
                        value={values.email}
                        keyboardType="email-address"

                     />
                  </View>
                  {errors.email && touched.email ?
                     <Text style={{ fontSize: 15, color: 'red' }}>{errors.email}</Text> : null
                  }
               </View>

               <View style={styles.formgruop}>
                  <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={styles.btnSendOTP}>
                     <Text style={styles.txtBtnTouch}>Send OTP Code</Text>
                  </TouchableOpacity>
               </View>
            </View>
         )}
      </Formik>
   )
}