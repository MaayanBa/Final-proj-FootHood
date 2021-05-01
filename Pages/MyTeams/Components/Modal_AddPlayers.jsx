import React, { useState } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal as ModalAddNewPlayer, Pressable
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppCss from '../../../CSS/AppCss';
import Modal_SearchInApp from './Modal_SearchInApp';

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70
      },
      modal_View: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    
      },
      addPlayersBtns: {
        flexDirection: "row-reverse",
      },
      modal_Txt: {
        marginBottom: 15,
        textAlign: "center"
      },
      modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
        flexDirection:'row',
        justifyContent:'center',
      },
})

export default function Modal_AddPlayers() {
    const [addPlayerModalVisible, setAddPlayerModalVisible] = useState(false);
    const [showSearchPlayer_Modal,setShowSearchPlayer_Modal]= useState(false);

    const clickOnSearchPlayerInApp=()=>{
        setAddPlayerModalVisible(!addPlayerModalVisible) 
        setShowSearchPlayer_Modal(true)
    }
  
    const modal_AddNewPlayer = <ModalAddNewPlayer animationType="slide"
    transparent={true} visible={addPlayerModalVisible}
    onRequestClose={() => setAddPlayerModalVisible(!addPlayerModalVisible)}
  >
    <View style={styles.centeredView}>
      <View style={styles.modal_View}>
        <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch,{width:"90%"}]}>
          <View style={styles.addPlayersBtns}>
            <Feather name="link" size={24} color="black" />
            <Text style={[appCss.txtBtnTouch,{fontSize:16}]}>&nbsp; Via Link</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch,{width:"90%"}]}>
          <View style={styles.addPlayersBtns}>
            <Feather name="user-plus" size={24} color="black" />
            <Text style={[appCss.txtBtnTouch,{fontSize:16}]}>&nbsp; Contact List</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch,{width:"90%"}]} onPress={() => clickOnSearchPlayerInApp()}>
          <View style={styles.addPlayersBtns}>
            <Feather name="search" size={24} color="black" />
            <Text style={[appCss.txtBtnTouch,{fontSize:16}]}>&nbsp; Search In App</Text>
          </View>
        </TouchableOpacity>
        
        <Pressable style={styles.modal_Closebtn} onPress={() => setAddPlayerModalVisible(!addPlayerModalVisible)} >
          <Text style={appCss.inputLabel}>Close</Text>
        </Pressable>
      </View>
    </View>
  </ModalAddNewPlayer>

    return (
        <View>
           <TouchableOpacity activeOpacity={0.8} onPress={() => setAddPlayerModalVisible(true)} style={styles.options_Btn}>
            <Text style={[appCss.txtBtnTouch,{fontSize:16}]}>Add New Players</Text>
            <Feather name="user-plus" size={24} color="black" style={{left:10}}/>
          </TouchableOpacity>
          {modal_AddNewPlayer}
          {showSearchPlayer_Modal &&<Modal_SearchInApp showSearchPlayer_Modal={showSearchPlayer_Modal} setShowSearchPlayer_Modal={setShowSearchPlayer_Modal} setAddPlayerModalVisible={setAddPlayerModalVisible}/>}
        </View>
    )

}
