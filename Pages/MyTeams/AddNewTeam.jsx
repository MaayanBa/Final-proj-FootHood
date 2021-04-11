import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, 
  View, Text, TouchableOpacity, 
  ScrollView, SafeAreaView, StatusBar, 
  Image, LogBox } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik, Field, Form } from "formik";
import * as yup from 'yup';
import { Feather, Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';


const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    color: 'white',
    fontSize: 32,
    marginBottom: 10
  },
  imageButton: {
    alignItems: 'center'
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16
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
  btnLogin: {
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
  btnAdd: {
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: "#D9D9D9",
    opacity: 0.8,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    width: '40%',
    alignItems: 'center',
    marginBottom: 10
  },
  addPlayersBtns: {
    flexDirection: "row-reverse",
  },
})

//Fix YellowBox Error
LogBox.ignoreLogs([  'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the   timer module awake, and timers can only be called when the app is in the foreground.']);

const newTeamValidationSchema = yup.object().shape({
  teamName: yup
    .string()
    .required('Team Name is Required'),
})

export default function CreateNewTeam() {
  const { state } = useContext(AuthContext);
  const { CreateNewTeam } = useContext(TeamContext);
  const [emailManager, setEmailManager] = useState(JSON.parse(state.token).Email)
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

  const CreateTeam = (values) => {
    let priOpub = false; //private or public 
    privateOrPublic === 'public'? priOpub= true: null;
    // values.isPrivate = priOpub;
    // values.teamPicture = TeamImageUri;
    
    let newTeam = {
      teamName: values.teamName,
      TeamPicture: values.teamPicture,
      isPrivate: priOpub,
      rulesAndLaws: values.rulesAndLaws,
      EmailManager: emailManager,
      addPlayers: values.addPlayers,
    }
    console.log("new tem  ===="  + newTeam)
    //console.log("email manager ==== " +emailManager)
    CreateNewTeam(newTeam)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.title}>Create A New Team</Text>
          </View>
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
                  <Text style={styles.inputLabel}>Team Picture:</Text>
                  <TouchableOpacity onPress={() => btnOpenGalery()} style={styles.imageButton}>
                    <Feather name="image" size={100} color="white" />
                  </TouchableOpacity>
                </View>
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
                  <Text style={styles.inputLabel}>Private Or Public?</Text>
                  <View style={styles.privateOrPublic}>
                    <TouchableOpacity>
                      <Text style={styles.inputLabel}>Public</Text>
                      <RadioButton
                        label="First item"
                        value="public"
                        status={privateOrPublic === 'public' ? 'checked' : 'unchecked'}
                        onPress={() => setPrivateOrPublic('public')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.inputLabel}>Private</Text>
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
                      multiline={true}
                      onChangeText={handleChange('rulesAndLaws')}
                      value={values.rulesAndLaws}
                      style={[styles.textInput, { padding: 10 }]}
                    />
                  </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} style={styles.btnAdd}>
                  <View style={styles.addPlayersBtns}>
                    <Feather name="user-plus" size={24} color="black" />
                    <Text style={styles.txtBtnMdl}>Add Players</Text>
                  </View>
                </TouchableOpacity>


                <View style={styles.formGroup}>

                  <TouchableOpacity activeOpacity={0.8} disabled={!isValid} onPress={handleSubmit} style={styles.btnLogin}>
                    <Text style={styles.txtBtnTouch}>Create New Team</Text>
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