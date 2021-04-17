import React,{useState} from 'react'
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import {
  Feather as Minus,
  Feather as Plus,
} from '@expo/vector-icons';

const styles = StyleSheet.create({
  plusAndMinus_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35
  },
  plusAndMinus_Btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    alignSelf: 'center'

  },
  plusAndMinus_Numbers: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 24,
  },
  txt_View: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  txt_Label: {
    color: "white",
    fontWeight: "bold",
    alignItems: 'center',
    fontSize: 16,
  },
})

export default function NumOfTeamsAndPlayers() {
  const [numOfTeamsState, setnumOfTeamsState] = useState(2);
  const [numOfPlayersInTeam, setnumOfPlayersInTeam] = useState(2)
  
  const ChangeNum_state = (change, state) => {
    let num = 0;
    state === 'numOfTeamsState' ? num = numOfTeamsState : num = numOfPlayersInTeam;

    if (change === 'minus') {
      num > 2 ?
        state === 'numOfTeamsState' ? setnumOfTeamsState(num - 1) : setnumOfPlayersInTeam(num - 1)
        :
        alert('The Minimum number of Teams is 2')
    }
    else if (change === 'plus') {
      state === 'numOfTeamsState' ?
        num < 10 ? setnumOfTeamsState(num + 1) : alert('The Maximum number of Teams is 10')
        :
        num < 11 ? setnumOfPlayersInTeam(num + 1) : alert('The Maximum Players in each Team is 11')

    }
  }
  return (
    <>
      {/* number of teams */}
      <View style={styles.plusAndMinus_View}>
        <View style={styles.plusAndMinus_Btns}>
          <TouchableOpacity onPress={() => ChangeNum_state('plus', 'numOfTeamsState')}>
            <Plus name="plus" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.plusAndMinus_Numbers}>{numOfTeamsState}</Text>
          <TouchableOpacity onPress={() => ChangeNum_state('minus', 'numOfTeamsState')}>
            <Minus name="minus" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.txt_View}>
          <Text style={styles.txt_Label}>Number Of Teams:</Text>
        </View>
      </View>

      {/* number of player each team */}
      <View style={styles.plusAndMinus_View}>
        <View style={styles.plusAndMinus_Btns}>
          <TouchableOpacity onPress={() => ChangeNum_state('plus', 'numOfPlayersInTeam')}>
            <Plus name="plus" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.plusAndMinus_Numbers}>{numOfPlayersInTeam}</Text>

          <TouchableOpacity onPress={() => ChangeNum_state('minus', 'numOfPlayersInTeam')}>
            <Minus name="minus" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.txt_View}>
          <Text style={styles.txt_Label}>Players In Teams:</Text>
        </View>
      </View>
    </>
  )
}
