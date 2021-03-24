import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, SafeAreaView, 
  ScrollView, View, Text,
  StatusBar, } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';
import { Feather as Minus, Feather as Plus } from '@expo/vector-icons';


const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: "100%",
    paddingTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
  },
  // safeArea: {
  //   //flex: 1,
  //   width: '100%',
  //   height: 420,
  // },

  headerView: {
    paddingTop: 40,
    alignItems: 'center',
    //height:'25%'
    //padding: 
  },
  txtHeader: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignItems: 'center',
    //padding: 40,
    color: 'white',
    fontSize: 40,
  },
  pickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:35
  },
  btns_PlusAndMinus_View: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    alignSelf: 'center'

  },
  txt_NumOfTeamsState: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 30,
  },
  txtView: {
    alignSelf: 'center',
    justifyContent:'flex-end',
  },
  txtLabel: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 25,
  }

})

const newGameValidationSchema = yup.object().shape({
  numberOfTeams: yup
    .string()
    .required('Number of Teams is Required'),
  numbOfPlayersInTeam: yup
    .number().positive().integer()
    .required('Number Of Players is Required'),
})


export default function CreateNewGame() {
  const [numOfTeamsState, setnumOfTeamsState] = useState(2);
  const [numOfPlayersInTeam, setnumOfPlayersInTeam] = useState(2)


  const ChangeNum_state = (change, state) => {
    let num = 0;
    if (state === 'numOfTeamsState')
      num = numOfTeamsState;
    else
      num = numOfPlayersInTeam;

    if (change === 'minus') {
      if (num > 2) {
        if (state === 'numOfTeamsState')
          setnumOfTeamsState(num - 1)
        else
          setnumOfPlayersInTeam(num - 1)
      }
      else
        alert('Minmum of Team is 2')
    }
    else if (change === 'plus') {
      if (state === 'numOfTeamsState') {
        if (num < 10)
          setnumOfTeamsState(num + 1)
        else
          alert('The Maximum of Team is 10')
      }
      else {
        if (num < 11)
        setnumOfPlayersInTeam(num + 1)
        else
          alert('The Maximum Players each Team is 11')
      }
    }

  }

 
  return (

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerView}>
        <Text style={styles.txtHeader}>Create New Game</Text>
      </View>

      {/* number of teams */}
      <View style={styles.pickerView}>
        <View style={styles.btns_PlusAndMinus_View}>
          <TouchableOpacity onPress={() => ChangeNum_state('minus', 'numOfTeamsState')}>
            <Minus name="minus" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.txt_NumOfTeamsState}>{numOfTeamsState}</Text>
          <TouchableOpacity onPress={() => ChangeNum_state('plus', 'numOfTeamsState')}>
            <Plus name="plus" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.txtView}>
          <Text style={styles.txtLabel}>Number Of Teams:</Text>
        </View>
      </View>

      {/* number of player each team */}
      <View style={styles.pickerView}>
        <View style={styles.btns_PlusAndMinus_View}>
          <TouchableOpacity onPress={() => ChangeNum_state('minus','numOfPlayersInTeam')}>
            <Minus name="minus" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.txt_NumOfTeamsState}>{numOfPlayersInTeam}</Text>
          <TouchableOpacity onPress={() => ChangeNum_state('plus','numOfPlayersInTeam')}>
            <Plus name="plus" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.txtView}>
          <Text style={styles.txtLabel}>Players In Teams:</Text>
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationView}>

      </View>

      {/* Date and Time */}

      {/* Last date for registration */}

      {/* Equipment required */}

      {/* btn Create Game */}


      {/* <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('CreateNewGame')} style={styles.btnTouch}>
                <Text style={styles.txtBtnTouch}>Create New Game</Text>
            </TouchableOpacity> */}
    </View>

    /* </Formik>  
</ScrollView > 
</SafeAreaView > */
  )
}
