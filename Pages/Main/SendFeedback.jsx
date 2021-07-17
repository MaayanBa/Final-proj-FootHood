import React, { useContext, useState } from 'react';
import {
    StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import AppCss from '../../CSS/AppCss';
import { Context as SettingsContext } from '../../Contexts/SettingsContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import Modal_Alert from '../Modal_Alert';


export default function SendFeedback(props) {
    const { AddFeedback } = useContext(SettingsContext);
    const { state: { token } } = useContext(AuthContext);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');

    const SendFeedback = (values) => {
        if (values.subject !== '' && values.content !== '') {
            let newFeedback = {
                EmailPlayer: token.Email,
                FeedBackSubject: values.subject,
                FeedbackContext: values.content,
            }
            AddFeedback(newFeedback)
            props.navigation.goBack();
        }
        else {
            setAlertText("Please fill in all the details.")
            setAlertModalVisible(true)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
                <View style={[styles.container, { padding: 20, paddingTop: 60 }]}>
                    <Text style={[appCss.title, { paddingBottom: 20 }]}>Feedback</Text>
                    <Formik
                        initialValues={{
                            subject: '',
                            content: '',
                        }}
                        onSubmit={(values) => SendFeedback(values)} //SendFeedback(values)}
                    >
                        {({ handleChange, handleSubmit, values }) => (
                            <>
                                <View style={{ marginTop: 40 }}>
                                    <Text style={appCss.inputLabel}>Subject:</Text>
                                    <View style={appCss.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                        <TextInput
                                            name="Subject"
                                            placeholder="Enter Subject"
                                            onChangeText={handleChange('subject')}
                                            value={values.subject}
                                        />
                                    </View>
                                    <Text style={appCss.inputLabel}>Content: {"\n"}</Text>
                                    <View style={styles.contentStyle}>
                                        <TextInput
                                            placeholder="Enter your feedback (:"
                                            value={values.content}
                                            multiline={true}
                                            onChangeText={handleChange('content')}
                                            style={[styles.textInput, { padding: 10 }]}
                                        />
                                    </View>

                                    <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch, styles.btnSend]} onPress={handleSubmit}>
                                        <MaterialCommunityIcons name="soccer" size={24} color="black" />
                                        <Text style={appCss.txtBtnTouch}>Send feedback</Text>
                                        <MaterialCommunityIcons name="soccer" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


//SEND FEEDBACK PAGE****!!!
const appCss = AppCss;
const styles = StyleSheet.create({
    imageButton: {
        alignItems: 'center'
    },
    textInput: {
        padding: 2
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    contentStyle: {
        height: 300,
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },

    addPlayersBtns: {
        flexDirection: "row-reverse",
    },
    btnSend: {
        flexDirection: "row",
        width: Dimensions.get('window').width - 150,
        justifyContent: 'space-evenly'
    }
})