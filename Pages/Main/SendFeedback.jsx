import React, { useContext } from 'react';
import {
    StyleSheet, TextInput,
    View, Text, TouchableOpacity,
    ScrollView, SafeAreaView,
    Image, LogBox
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import AppCss from '../../CSS/AppCss';
import { Context as SettingsContext } from '../../Contexts/SettingsContext';


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
        height: 200,
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },

    addPlayersBtns: {
        flexDirection: "row-reverse",
    },
})

export default function SendFeedback(props) {
    const { AddFeedback } = useContext(SettingsContext);


    const SendFeedback = (values) => {
        let newFeedback = {
            email: values.email,
            content: "Subject: " + values.subject + "  ,    Content: " + values.content,
        }
        if (newFeedback.email != '' &&  values.subject != '' && values.content!='') {
            AddFeedback(newFeedback.email, newFeedback.content)
            props.navigation.goBack();
        }
        else {
            alert("Please fill in all the details.")
        }
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.container, { padding: 20, paddingTop: 60 }]}>
                    <Text style={[appCss.title, { paddingBottom: 20 }]}>Feedback</Text>
                    <Formik
                        initialValues={{
                            email: '',
                            subject: '',
                            content: '',
                        }}
                        onSubmit={(values) => SendFeedback(values)} //SendFeedback(values)}
                    >
                        {({ handleChange, handleSubmit, values }) => (
                            <>
                                <Text style={appCss.inputLabel}>Email:</Text>
                                <View style={appCss.sectionStyle}>
                                    <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                    <TextInput
                                        name="Email"
                                        placeholder="Enter Email"
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                    />
                                </View><Text style={appCss.inputLabel}>Subject:</Text>
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

                                <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch, { flexDirection: "row" }, { width: '60%' },]} onPress={handleSubmit}>
                                    <MaterialCommunityIcons name="soccer" size={24} color="black" />
                                    <Text style={appCss.txtBtnTouch}>Send feedback</Text>
                                    <MaterialCommunityIcons name="soccer" size={24} color="black" />
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}