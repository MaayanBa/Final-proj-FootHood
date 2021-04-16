import React, { useState, useContext } from 'react';
import {
  StyleSheet, TextInput,
  View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar,
  Image, LogBox
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik } from "formik";
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';
//import {navigate} from '../../Navigations/navigationRef'
import AppCss from '../../CSS/AppCss';

const appCss = AppCss;
const styles = StyleSheet.create({
  imageButton: {
    alignItems: 'center'
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
  addPlayersBtns: {
    flexDirection: "row-reverse",
  },
})

//Fix YellowBox Error
LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e.']);

const newTeamValidationSchema = yup.object().shape({
  teamName: yup
    .string()
    .required('Team Name is Required'),
})

export default function CreateNewTeam({ navigation }) {
  const { state: { token } } = useContext(AuthContext);
  const { teamState, CreateNewTeam } = useContext(TeamContext);
  const [emailManager, setEmailManager] = useState(token.Email)
  const [privateOrPublic, setPrivateOrPublic] = useState('public');
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

  const CreateTeam = async (values) => {
    let priOpub = false; //private or public 
    privateOrPublic === 'public' ? priOpub = true : null;
    let newTeam = {
      teamName: values.teamName,
      TeamPicture: TeamImageUri,
      isPrivate: priOpub,
      rulesAndLaws: values.rulesAndLaws,
      EmailManager: emailManager,
      addPlayers: []/*values.addPlayers*/,
    }
    await CreateNewTeam(newTeam);
    alert("The Team has Added")
    navigation.navigate('MyTeams')


  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.container, { padding: 20, paddingTop: 60 }]}>
          <Text style={[appCss.title, { paddingBottom: 20 }]}>Create A New Team</Text>
          <Formik
            validationSchema={newTeamValidationSchema}
            initialValues={{
              teamName: '',
              isPrivate: '',
              rulesAndLaws: '',
              addPlayers: '',
              TeamPicture: '',
            }}
            onSubmit={(values) => CreateTeam(values)
            }
          >
            {({ handleChange, handleSubmit, values, errors, isValid, touched }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Team Picture:</Text>
                  {TeamImageUri == null ?
                    <TouchableOpacity onPress={() => btnOpenGalery()} style={styles.imageButton}>
                      <Feather name="image" size={100} color="white" />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => btnOpenGalery()} style={styles.imageButton}>
                      <Avatar.Image size={100} source={{ uri: TeamImageUri }} />
                    </TouchableOpacity>
                  }
                </View>
                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Team Name:</Text>
                  <View style={appCss.sectionStyle}>
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
                  <Text style={appCss.inputLabel}>Private Or Public?</Text>
                  <View style={styles.privateOrPublic}>
                    <TouchableOpacity>
                      <Text style={appCss.inputLabel}>Public</Text>
                      <RadioButton
                        label="First item"
                        value="public"
                        status={privateOrPublic === 'public' ? 'checked' : 'unchecked'}
                        onPress={() => setPrivateOrPublic('public')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={appCss.inputLabel}>Private</Text>
                      <RadioButton
                        value="private"
                        status={privateOrPublic === 'private' ? 'checked' : 'unchecked'}
                        onPress={() => setPrivateOrPublic('private')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={appCss.inputLabel}>Teams Rules And Laws: {"\n"}</Text>
                  <View style={styles.rulesSectionStyle}>
                    <TextInput
                      name="rulesAndLaws"
                      placeholder="Enter here the rules and laws of the team"
                      multiline={true}
                      onChangeText={handleChange('rulesAndLaws')}
                      value={values.rulesAndLaws}
                      style={[styles.textInput, { padding: 10 }]}
                    />
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch,{alignItems:'center',backgroundColor:'#A9A9A9'}]}>
                  <View style={styles.addPlayersBtns}>
                    <Feather name="user-plus" size={24} color="black" />
                    <Text style={styles.txtBtnMdl}>Add Players</Text>
                  </View>
                </TouchableOpacity>


                <View style={styles.formGroup}>

                  <TouchableOpacity activeOpacity={0.8} disabled={!isValid} onPress={handleSubmit} style={[appCss.btnTouch,{width: '60%'}]}>
                    <Text style={appCss.txtBtnTouch}>Create New Team</Text>
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