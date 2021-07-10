import React, { useState, useContext } from 'react'
import {
  StyleSheet, TouchableOpacity, View, Text, Modal as ModalAddNewPlayer, Pressable, ImageBackground
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppCss from '../../../CSS/AppCss';
import ModalAddPlayers4NewTeam from '../Components/ModalAddPlayers4NewTeam';
import Modal_ContactList from './Modal_ContactList';


export default function Modal_AddPlayers(props) {
  const [addPlayerModalVisible, setAddPlayerModalVisible] = useState(false);
  const [showSearchPlayer_Modal, setShowSearchPlayer_Modal] = useState(false);
  const [showContactListModal, setShowContactListModal] = useState(false);

  const clickOnSearchPlayerInApp = () => {
    setAddPlayerModalVisible(!addPlayerModalVisible)
    setShowSearchPlayer_Modal(true)
  }

  const clickOnContactList = () => {
    setAddPlayerModalVisible(!addPlayerModalVisible)
    setShowContactListModal(true)
  }

  const modal_AddNewPlayer = <ModalAddNewPlayer animationType="slide"
    transparent={true} visible={addPlayerModalVisible}
    onRequestClose={() => setAddPlayerModalVisible(!addPlayerModalVisible)}
  >
    <View style={styles.centeredView}>
      <View style={[appCss.modal_View, { height: '45%' }]}>
        <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../../assets/WallPaperWhite2.png')}>
          <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch, { width: "90%" }]}>
            <View style={styles.addPlayersBtns}>
              <Feather name="link" size={24} color="black" />
              <Text style={[appCss.txtBtnTouch, { fontSize: 16 }]}>&nbsp; Via Link</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch, { width: "90%" }]} onPress={() => clickOnContactList()}>
            <View style={styles.addPlayersBtns}>
              <Feather name="user-plus" size={24} color="black" />
              <Text style={[appCss.txtBtnTouch, { fontSize: 16 }]}>&nbsp; Contact List</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch, { width: "90%" }]} onPress={() => clickOnSearchPlayerInApp()}>
            <View style={styles.addPlayersBtns}>
              <Feather name="search" size={24} color="black" />
              <Text style={[appCss.txtBtnTouch, { fontSize: 16 }]}>&nbsp; Search In App</Text>
            </View>
          </TouchableOpacity>

          <Pressable style={styles.modal_Closebtn} onPress={() => setAddPlayerModalVisible(!addPlayerModalVisible)} >
            <Text style={appCss.inputLabel}>Close</Text>
          </Pressable>
        </ImageBackground>
      </View>
    </View>
  </ModalAddNewPlayer>

  return (
    <View>

      <TouchableOpacity activeOpacity={0.8} onPress={() => setAddPlayerModalVisible(true)} style={styles.options_Btn}>
        <Text style={[appCss.txtBtnTouch, { fontSize: 16 }]}>Add New Players</Text>
        <Feather name="user-plus" size={24} color="black" style={{ left: 10 }} />
      </TouchableOpacity>
      {modal_AddNewPlayer}
      {
        showSearchPlayer_Modal &&
        <ModalAddPlayers4NewTeam showSearchPlayer_Modal={showSearchPlayer_Modal}
          setShowSearchPlayer_Modal={setShowSearchPlayer_Modal}
          setAddPlayerModalVisible={setAddPlayerModalVisible}
          teamKey={props.teamKey}
          setForceState={props.setForceState}
          props={props} 
          addedPlayers={props.addedPlayers}
          setAddedPlayers={props.setAddedPlayers}
          />
      }
      {showContactListModal && <Modal_ContactList showContactListModal={showContactListModal}
        setShowContactListModal={setShowContactListModal}
        setAddPlayerModalVisible={setAddPlayerModalVisible}
        teamKey={props.teamKey}
        setForceState={props.setForceState} 
        props={props}/>
      }
    </View>
  )
}

const appCss = AppCss;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 70
  },

  addPlayersBtns: {
    flexDirection: "row-reverse",
  },
  modal_Closebtn: {
    backgroundColor: "#2196F3",
    marginTop: 10,
    borderRadius: 20,
    padding: 15,
    margin: 10,
    alignSelf: "center",
  },
  options_Btn: {
    alignSelf: 'center',
    elevation: 5,
    backgroundColor: "#D9D9D9",
    opacity: 0.8,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
