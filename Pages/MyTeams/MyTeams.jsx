import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, Image as ImageBall, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Badge } from 'react-native-elements'
//import ScrollView from 'rn-faded-scrollview';
import { Avatar } from 'react-native-paper';
//import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Main/Header';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import AppCss from '../../CSS/AppCss';

const appCss = AppCss;
const styles = StyleSheet.create({
    safeArea: {
        //flex: 1,
        width: '100%',
        height: 410,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
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
        //flex: 1,
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
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        width: '90%',
        height: 80,
        margin: 20,
    },
    contextSide: {
        justifyContent: 'space-between'
    },
    headerCard_View: {
        alignSelf: 'center'
    },
    descripitionCard: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
});

const teams = [
    {
        teamName: "Manchester United",
        groupPhoto: 'https://assets.manutd.com/AssetPicker/images/0/0/12/55/800532/hercules-red-icon-1024x10241562734953094.png',
        teamManager: "Dana",
        numberOfPlayers: 10,
        playersInTeam: [
            {
                Name: "Maayan"
            },
            {
                Name: "Benel"
            },
            {
                Name: "Liam"
            }

        ]
    },
    {
        teamName: "Baraaaca",
        groupPhoto: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
        teamManager: "Benel",
        numberOfPlayers: 10,
        playersInTeam: [
            { Name: "Maayan" }, { Name: "Benel" }, { Name: "Guy" }, { Name: "Yossi" }, { Name: "Avi" }

        ]
    },
    {
        teamName: "Manchester United",
        groupPhoto: 'https://assets.manutd.com/AssetPicker/images/0/0/12/55/800532/hercules-red-icon-1024x10241562734953094.png',
        teamManager: "Dana",
        numberOfPlayers: 10,
        playersInTeam: [
            {
                Name: "Maayan"
            },
            {
                Name: "Benel"
            },
            {
                Name: "Liam"
            }

        ]
    },
    {
        teamName: "Manchester United",
        groupPhoto: 'https://assets.manutd.com/AssetPicker/images/0/0/12/55/800532/hercules-red-icon-1024x10241562734953094.png',
        teamManager: "Dana",
        numberOfPlayers: 10,
        playersInTeam: [
            {
                Name: "Maayan"
            },
            {
                Name: "Benel"
            },
            {
                Name: "Liam"
            }

        ]
    },
    {
        teamName: "Baraaaca",
        groupPhoto: 'https://static.nike.com/a/images/f_auto/dpr_3.0/w_371,c_limit/a76a7bba-36d1-4637-97ec-1ecfbfcfc547/official-fc-barcelona-store.png',
        teamManager: "Benel",
        numberOfPlayers: 10,
        playersInTeam: [
            { Name: "Maayan" }, { Name: "Benel" }, { Name: "Guy" }, { Name: "Yossi" }, { Name: "Avi" }

        ]
    },
]
export default function MyTeams(props) {
    const { state: { myTeams } } = useContext(TeamContext);

    let teamCards = myTeams.map((team, key) => {

        return <TouchableOpacity style={styles.teamCard} key={key} onPress={() => props.navigation.navigate('TeamPage', { team })}>
            <View style={styles.contextSide}>
                <View style={styles.headerCard_View}>
                    <Text style={[appCss.inputLabel,{fontSize:25, color:'black'}]}>{team.TeamName}</Text>
                </View>
                <View style={styles.descripitionCard}>
                    <Text >Manager: {team.EmailManager} </Text>
                    <Text> Players: {team.PlayersList.length} </Text>
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
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView style={styles.scrollView} >

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








