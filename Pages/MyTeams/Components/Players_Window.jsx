import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Avatar, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  playersAndEquipment_Window: {
    backgroundColor: 'white',
    padding: 25,
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 15
  },
  playersAndEquipment_Title: {
    alignSelf: 'center'
  },
  txtGame: {
    alignSelf: 'center',
    fontWeight: "bold",
    marginBottom: 5,
  },
  playerList_scrollView: {
    width: '100%',
    backgroundColor: '#D9D9D9',
    height: 200
  },
  playerInGameList: {
    backgroundColor: '#D9D9D9',

  }
})

export default function Players_Window() {
  const players =
    [
      {
        FirstName: "Daniel",
        LastName: "Grunberg",
        PlayerPicture: "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ec593cc431fb70007482137%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1321%26cropX2%3D3300%26cropY1%3D114%26cropY2%3D2093",
        equipment: "Ball"
      },
      {
        FirstName: "Maayan",
        LastName: "Bachar",
        PlayerPicture: "https://icdn.psgtalk.com/wp-content/uploads/2021/04/Neymar-Bayern-Munich-Champions-League.jpg",
        equipment: "Water"

      },
      {
        FirstName: "Benel",
        LastName: "Omer",
        PlayerPicture: "https://magiconfield.com/wp-content/uploads/2021/03/Messi-Barcelona.jpg",
        equipment: "First Aid Kit"
      },
      {
        FirstName: "Daniel",
        LastName: "Grunberg",
        PlayerPicture: "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ec593cc431fb70007482137%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1321%26cropX2%3D3300%26cropY1%3D114%26cropY2%3D2093",
        equipment: "Ball"
      },
      {
        FirstName: "Maayan",
        LastName: "Bachar",
        PlayerPicture: "https://icdn.psgtalk.com/wp-content/uploads/2021/04/Neymar-Bayern-Munich-Champions-League.jpg",
        equipment: "Water"

      },
      {
        FirstName: "Benel",
        LastName: "Omer",
        PlayerPicture: "https://magiconfield.com/wp-content/uploads/2021/03/Messi-Barcelona.jpg",
        equipment: "First Aid Kit"
      },
    ]
  // let registeredPlayers = players.map((p, key) => {
  //   return <View key={key}>
  //     <Text>{p.playerName}</Text>
  //   </View>
  // })

  const registeredPlayers = players.map((p, key) => {
    return <ListItem key={key} style={styles.playerInGameList}>
      <ListItem.Content style={{ alignItems: 'flex-end' }} >
        <ListItem.Title>{p.FirstName + " " + p.LastName}</ListItem.Title>
      </ListItem.Content>
      <Avatar rounded source={{ uri: p.PlayerPicture }} />
    </ListItem>

  })

  return (
    <View style={styles.playersAndEquipment_Window}>
      <View style={styles.playersAndEquipment_Title}>
        <Text style={styles.txtGame}>Registerd players :</Text>
      </View>
      <ScrollView style={styles.playerList_scrollView}>
        {registeredPlayers}
        
      </ScrollView>
      <TouchableOpacity>
        <View style={styles.txtGame}>
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ color: 'red', paddingTop: 30 }}>Find new players!</Animatable.Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

