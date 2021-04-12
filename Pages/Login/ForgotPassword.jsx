import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import EmailVerification from './Components/EmailVerification';
import ResetPassCode from './Components/ResetPassCode';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 40
  },
  title: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  title_txt: {
    alignItems: 'center',
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
  },
  mainContent: {
    justifyContent: 'center',
    marginTop: 40
  },
})

export default function ForgotPassword() {
  const { state } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title_txt}>Restore Password</Text>
      </View>
      <View style={styles.mainContent}>
        {!state.emailVerified ? <EmailVerification /> : <ResetPassCode />}
      </View>
    </View>
  )
}
