import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import EmailVerification from './Components/EmailVerification';
import ResetPassCode from './Components/ResetPassCode';
import AppCss from '../../CSS/AppCss';

export default function ForgotPassword() {
  const { state } = useContext(AuthContext);
  return (
    <View style={[appCss.container,{padding:40}]}>
      <View style={styles.title_View}>
        <Text style={appCss.title}>Restore Password</Text>
      </View>
      <View style={styles.mainContent}>
        {!state.emailVerified ? <EmailVerification /> : <ResetPassCode />}
      </View>
    </View>
  )
}


const appCss = AppCss;
const styles = StyleSheet.create({
  title_View: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  mainContent: {
    justifyContent: 'center',
    marginTop: 40
  },
})

