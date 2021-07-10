import React, { useContext, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import { Context as AuthContext } from '../../../Contexts/AuthContext'
import AppCss from '../../../CSS/AppCss';

const appCss = AppCss;

const RestorePassordSchema = yup.object().shape(
   {
      email: yup
         .string()
         .email("Please enter valid email")
         .required('Email Address is Required')
   }
)

export default function EmailVerification() {
   const {  restorePassCode, resetRestore_PassCode_values } = useContext(AuthContext);

   useEffect(() => {
      resetRestore_PassCode_values()
   }, [])

   const verifyEmail = async (values) => {
      console.log(values.email)
      await restorePassCode(values.email)
      //alert("Email has been sent")
      //console.log("Success Restore");
   }
   return (
      <Formik initialValues={{ email: '' }}
         onSubmit={(values) => verifyEmail(values)}
         validationSchema={RestorePassordSchema}>
         {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
            <View style={styles.verifyContainer}>
               <View style={styles.formGroup}>
                  <Text style={appCss.explanationText}>Please enter your email to send an OTP code</Text>
               </View>

               <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Email:</Text>
                  <View style={appCss.sectionStyle}>
                     <Image source={require('../../../assets/soccerPlayer.png')} style={appCss.soccerPlayer_img} />
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
                  <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={[appCss.btnTouch,{width:'60%'}]}>
                     <Text style={appCss.txtBtnTouch}>Send OTP Code</Text>
                  </TouchableOpacity>
               </View>
            </View>
         )}
      </Formik>
   )
}