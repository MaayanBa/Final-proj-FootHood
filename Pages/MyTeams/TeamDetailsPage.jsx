import React, { useState, useContext } from 'react';
import {
  StyleSheet, View,
  SafeAreaView, ScrollView, TouchableOpacity,
  StatusBar, ImageBackground, Modal as ModalRulsAndLaws,
  Modal as ModalAddNewPlayer, Pressable, Image
} from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import {Context as TeamContext} from '../../Contexts/TeamContext';
import AppCss from '../../CSS/AppCss';

const appCss = AppCss;
const styles = StyleSheet.create({
  container_extra: {
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    padding: 20,
    marginTop: 10,
    //justifyContent:'center',
  },
  imgBG: {
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between'
  },
  options_View: {
    alignSelf: 'center',
    marginBottom: 10,
    width: 250
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

  },
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
  addPlayersBtns: {
    flexDirection: "row-reverse",
  },
  playerList_View: {
    marginTop: 10,
    height: '60%',
  },
  teamPlayers_Text: {
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
    color: 'white'
  },
  leaveTeam_Btn: {
    flexDirection: "row-reverse",
    margin: 15,
    justifyContent: 'flex-end',
  },
  leaveTeam_txt: {
    fontSize: 16,
    color: 'white'
  },
  playerCardIcon_Btn: {
    width: 35,
    height: 35
  }
})

export default function TeamDetailsPage({route}) {
  const {team} = route.params;
  const [rulesModalVisible, setRuleModalVisible] = useState(false);
  const [addPlayerModalVisible, setAddPlayerModalVisible] = useState(false);
  const { LeaveTeam } = useContext(TeamContext);


  // const team =
  // {
  //   TeamName: "Barca",
  //   TeamPicture: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
  //   teamManager: "Benel",
  //   numberOfPlayers: 10,
  //   PlayersList: [
  //     { EmailPlayer: "Lionel Messi", PlayerImg: "https://assets.laliga.com/squad/2020/t178/p19054/2048x2048/p19054_t178_2020_1_002_000.jpg" },
  //     { EmailPlayer: "Cristiano Ronaldo", PlayerImg: "https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg" },
  //     { EmailPlayer: "Neymar Jr.", PlayerImg: "https://sportshub.cbsistatic.com/i/r/2020/12/13/2106d28e-ef9a-4813-9c9e-ba468026d2e3/thumbnail/640x360/3cfd012b2f428aa2f4cf7ef9cd4b5d64/neymar-1.png" },
  //     { EmailPlayer: "Bruno Fernandes", PlayerImg: "http://therepublikofmancunia.com/wp-content/uploads/2020/06/NINTCHDBPICT000565411429-1440x684.jpg" },
  //     { EmailPlayer: "Eran Levi", PlayerImg: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2018/10/09/15390673413277_b.jpg" },
  //     { EmailPlayer: "Lionel Messi", PlayerImg: "https://assets.laliga.com/squad/2020/t178/p19054/2048x2048/p19054_t178_2020_1_002_000.jpg" },
  //     { EmailPlayer: "Cristiano Ronaldo", PlayerImg: "https://site-cdn.givemesport.com/images/21/02/05/354cc6f5366bb99d3eca6bc92f8d2165/1201.jpg" },
  //     { EmailPlayer: "Neymar Jr.", PlayerImg: "https://sportshub.cbsistatic.com/i/r/2020/12/13/2106d28e-ef9a-4813-9c9e-ba468026d2e3/thumbnail/640x360/3cfd012b2f428aa2f4cf7ef9cd4b5d64/neymar-1.png" },
  //     { EmailPlayer: "Bruno Fernandes", PlayerImg: "http://therepublikofmancunia.com/wp-content/uploads/2020/06/NINTCHDBPICT000565411429-1440x684.jpg" },
  //     { EmailPlayer: "Eran Levi", PlayerImg: "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2018/10/09/15390673413277_b.jpg" }

  //   ],
  //   rulesAndLaws: "Hello And welcome to FootHood First Game. The rules are- Each team has 5 players and the team who wins is the team who reaches 2 goals. The game time is 8 min. If needed there is a 2 min extra time."
  // }

  const playerList = team.PlayersList.map((p, i) => (
    <ListItem key={i} bottomDivider>
      <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("player Card")} >
        <Image style={styles.playerCardIcon_Btn} source={require('../../assets/PlayerCardIcon.png')} />
      </TouchableOpacity>
      <ListItem.Content style={{ alignItems: 'flex-end' }} >
        <ListItem.Title>{p.EmailPlayer}</ListItem.Title>
      </ListItem.Content>
      <Avatar rounded source={{ uri: p.PlayerImg }} />
    </ListItem>
  ))

  const modal_RulsAndLaws = <ModalRulsAndLaws animationType="slide"
    transparent={true} visible={rulesModalVisible}
    onRequestClose={() => setRuleModalVisible(!rulesModalVisible)}
  >
    <View style={styles.centeredView}>
      <View style={styles.modal_View}>
        <Text style={styles.modal_Txt}>{team.RulesAndLaws}</Text>
        <Pressable style={styles.modal_Closebtn} onPress={() => setRuleModalVisible(!rulesModalVisible)} >
          <Text style={appCss.inputLabel}>Close</Text>
        </Pressable>
      </View>
    </View>
  </ModalRulsAndLaws>


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
        <TouchableOpacity activeOpacity={0.8} style={[appCss.btnTouch,{width:"90%"}]}>
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

  const ExitTeam = () => { 
    console.log('Leave Team')
    let playerInTeam = {
      TeamSerialNum: team.TeamSerialNum,
      EmailPlayer: team.EmailManager 
    }
    //LeaveTeam(playerInTeam);
   }

  return (
    <SafeAreaView style={[appCss.container, styles.container_extra]} >

      {/* ImageBackGround With Bottuns */}
      <ImageBackground style={styles.imgBG} source={{ uri: team.TeamPicture }}>
        <Text style={appCss.title}>{team.TeamName}</Text>
        <View style={styles.options_View}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setRuleModalVisible(true)} style={styles.options_Btn}>
            <Text style={[appCss.txtBtnTouch,{fontSize:16}]}>Rules And Laws</Text>
          </TouchableOpacity>
          {modal_RulsAndLaws}
          <TouchableOpacity activeOpacity={0.8} onPress={() => setAddPlayerModalVisible(true)} style={styles.options_Btn}>
            <Text style={[appCss.txtBtnTouch,{fontSize:16}]}>Add New Players</Text>
          </TouchableOpacity>
          {modal_AddNewPlayer}
        </View>
      </ImageBackground>


      {/* Player List */}
      <View style={styles.playerList_View}>
        <Text style={styles.teamPlayers_Text}>Team Players:</Text>
        <ScrollView>
          {playerList}
        </ScrollView>
      </View>


      {/* Leave Team */}
      <TouchableOpacity style={styles.leaveTeam_Btn} onPress={() => ExitTeam()}>
        <Text style={styles.leaveTeam_txt}>Leave Team </Text>
        <Feather name="log-out" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
