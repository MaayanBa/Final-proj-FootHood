import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform, Image, TouchableNativeFeedbackBase, TouchableOpacityBase } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik, Field, Form } from "formik";
import * as yup from 'yup';
import { Feather, Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        padding: 40,
    },
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width: '100%',
        padding: 10
    },
    formGroup: {
        padding: 5,
    },
    createTeamButton: {
        alignItems: 'center',
        width: '10',
        padding: 70
    },
    textboxes: {
        alignItems: 'center',
    },
    inputLabel: {
        alignItems: "flex-start",
    },
    textInput:{
padding:2
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
    rulesSectionStyle: {
        height: 200,
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    privateOrPublic: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 2
    },
})


const newTeamValidationSchema = yup.object().shape({
    teamName: yup
        .string()
        .required('Team Name is Required'),
    numberOfPlayers: yup
        .number().positive().integer()
        .required('Number Of Players is Required'),
})

export default function CreateNewTeam() {
    const [privateOrPublic, setPrivateOrPublic] = React.useState('public');
    const [TeamImageUri, setimageUri] = useState(null);

    const btnOpenGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            // aspect: [4, 3],
        });

        if (!result.cancelled) {
            console.log(result.uri);
            setimageUri(result.uri);
        }
    };

    const CreateTeam = (values) => {
        values.isPrivate = privateOrPublic;
        values.groupPhoto = TeamImageUri;
        console.log(values)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text h4>Create A New Team</Text>
                    </View>
                    <Formik
                        validationSchema={newTeamValidationSchema}
                        initialValues={{
                            teamName: '',
                            numberOfPlayers: '',
                            isPrivate: '',
                            rulesAndLaws: '',
                            addPlayers: '',
                            groupPhoto: '',
                        }}
                        onSubmit={(values) => CreateTeam(values)
                        }
                    >
                        {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
                            <>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Team Name:</Text>
                                    <View style={styles.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                        <TextInput
                                            name="teamName"
                                            placeholder="Team Name"
                                            onChangeText={handleChange('teamName')}
                                            value={values.teamName}
                                        />
                                    </View>
                                    {errors.teamName &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.teamName}</Text>
                                    }
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Number Of Players:</Text>
                                    <View style={styles.sectionStyle}>
                                        <Image source={require('../../assets/soccerPlayer.png')} style={styles.ImageStyle} />
                                        <TextInput
                                            name="numberOfPlayers"
                                            placeholder="Number Of Players"
                                            onChangeText={handleChange('numberOfPlayers')}
                                            value={values.numberOfPlayers}
                                            keyboardType="phone-pad"
                                        />
                                    </View>

                                    {errors.numberOfPlayers &&
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.numberOfPlayers}</Text>
                                    }
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Team Picture:</Text>
                                    <TouchableOpacity onPress={() => btnOpenGalery()}>
                                        <Feather name="image" size={50} color="black" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text>Private Or Public?</Text>
                                    <View style={styles.privateOrPublic}>
                                        <TouchableOpacity>
                                            <Text>Public</Text>
                                            <RadioButton
                                                label="First item"
                                                value="public"
                                                status={privateOrPublic === 'public' ? 'checked' : 'unchecked'}
                                                onPress={() => setPrivateOrPublic('public')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text>Private</Text>
                                            <RadioButton
                                                value="private"
                                                status={privateOrPublic === 'private' ? 'checked' : 'unchecked'}
                                                onPress={() => setPrivateOrPublic('private')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Teams Rules And Laws: {"\n"}</Text>
                                    <View style={styles.rulesSectionStyle}>
                                        <TextInput
                                            name="rulesAndLaws"
                                            placeholder="Enter here the rules and laws of the team"
                                            onChangeText={handleChange('rulesAndLaws')}
                                            value={values.rulesAndLaws}
                                            style={styles.TextInput}
                                        />
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.inputLabel}>Need to add here to option to add player to the team by search</Text>
                                </View>
                                <View style={styles.formGroup}>
                                    <Button
                                        onPress={handleSubmit}
                                        title="Create New Team"
                                        disabled={!isValid}
                                        style={styles.createTeamButton}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
