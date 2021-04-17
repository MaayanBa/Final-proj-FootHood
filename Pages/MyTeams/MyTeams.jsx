import React, { useState,useContext } from 'react';
import { StyleSheet, View, Text, Image, Image as ImageBall, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Badge } from 'react-native-elements'
//import ScrollView from 'rn-faded-scrollview';
import { Avatar } from 'react-native-paper';
//import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Main/Header';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import AppCss from '../../CSS/AppCss';

const appCss = AppCss;
const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        //: 'space-between',
    },
    ball_img: {
        margin: 100,
        height: 110,
        width: 100,
        alignSelf: 'center',
        top: 100
    },
    footer: {
        justifyContent: 'flex-end',
    },
    plusStyle: {
        margin: 5,
        height: 30,
        width: 30,
    },
    createNewTeam_btn: {
        flexDirection: "row-reverse",
        alignItems: 'center',
    },
    teamCard: {
        backgroundColor: '#D9D9D9',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        width: '90%',
        height: 80,
        margin: 20,
        padding: 5,
    },
    contextSide: {
        flex: 1,
        padding: 10
    },
    headerCard_View: {
        alignSelf: 'center'
    },
    descripitionCard: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    side_img: {

    },
});

export default function MyTeams(props) {
    const { state: { myTeams } } = useContext(TeamContext);
    const { state: { players } } = useContext(PlayerContext);
    const [messages, setMessages] = useState([]);

    let teamCards = myTeams.map((team, key) => {
        //console.log(players)
        let manager = players.find(x => x.Email === team.EmailManager);
        console.log(manager)
        return <TouchableOpacity style={styles.teamCard} key={key} onPress={() => props.navigation.navigate('TeamPage', { team })}>
            {/* {FireBaseMessages(team,messages,setMessages)} */}
            <View style={styles.contextSide}>
                <View style={styles.headerCard_View}>
                    <Text style={[appCss.inputLabel, { fontSize: 25, color: 'black' }]}>{team.TeamName}</Text>
                </View>
                <View style={styles.descripitionCard}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text> {manager.FirstName + " " + manager.LastName} </Text>
                        <Text style={{ fontWeight: 'bold' }}> Manager:  </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text> {team.PlayersList.length} </Text>
                        <Text style={{ fontWeight: 'bold' }}> Players:  </Text>
                    </View>

                </View>
            </View>
            <View style={styles.side_img}>
                <Avatar.Image size={64} source={{ uri: team.TeamPicture }} />
            </View>
            <Badge
                containerStyle={{ position: 'absolute', top: 0, left: 0 }}
                value="99+" //Need to count length of messages from DB
                status="error" />
        </TouchableOpacity>
    })

    return (
        <View style={appCss.container}>
            {/* <Header /> */}
            <Text style={[appCss.title, appCss.space]}>My Teams</Text>
            <View style={styles.mainContent}>
                <SafeAreaView >
                    <ScrollView >

                        {teamCards}

                    </ScrollView>
                </SafeAreaView>

            </View>
            <View style={styles.footer}>
                <ImageBall source={require('../../assets/ball.png')} style={styles.ball_img} />
                <TouchableOpacity style={styles.createNewTeam_btn} onPress={() => props.navigation.navigate('AddNewTeam')}>
                    <Image source={require('../../assets/plus.png')} style={styles.plusStyle} />
                    <Text style={appCss.inputLabel}>Add New Team</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}








