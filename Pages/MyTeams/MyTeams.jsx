import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, Image as ImageBall, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
//import ScrollView from 'rn-faded-scrollview';

import { Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../Main/Header';

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: 40,
        paddingLeft:30,
        paddingRight:30,
    },
    safeArea: {
        //flex: 1,
        width: '100%',
        height: 420,
    },
    //  scrollView:{
    //     backgroundColor: 'black',
    //     marginHorizontal: 20,
    //  },
    header: {
        alignItems: 'center',
        //height:'25%'
        //padding: 
    },
    title: {
        alignItems: 'center',
        //padding: 40,
        color: 'white',
        fontSize: 40,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',

        //alignItems: 'center',
        //alignSelf:'stretch'

    },
    imageBallStyle: {
        margin: 100,
        height: 110,
        width: 100,
        alignSelf: 'center',
        top: 100
    },
    footer: {
        justifyContent: 'flex-end',
        flex: 1,
        //height:'15%'
    },
    plusStyle: {
        margin: 5,
        height: 30,
        width: 30,
    },
    btnCreateNewTeam: {
        flexDirection: "row-reverse",
        alignItems: 'center',
    },
    txtAddNewTeam: {
        color: 'white'
    },

    teamCard: {

        backgroundColor: '#D9D9D9',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        width: '90%',
        height: 80,
        // padding:10,
        margin: 20,
    },
    contextSide: {
        justifyContent: 'space-between'
    },
    txtHeaderCard: {
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
    //save -----------------------
    //props.navigation.navigate('MyTeamsNav' , {screen: 'AddNewTeam'});
    //props.navigation.navigate('LoginUser');




    let teamCards = teams.map((team, key) => {
        return <TouchableOpacity style={styles.teamCard} key={key} onPress={() => props.navigation.navigate('TeamPage')}>
            <View style={styles.contextSide}>
                <View style={styles.txtHeaderCard}>
                    <Text style={{ fontSize: 25 }}>{team.teamName}</Text>
                </View>
                <View style={styles.descripitionCard}>
                    <Text >Manager: {team.teamManager} </Text>
                    <Text> Players: {team.numberOfPlayers} </Text>
                </View>
            </View>
            <View style={styles.imgSide}>
                <Avatar.Image size={64} source={{ uri: team.groupPhoto }} />
            </View>
        </TouchableOpacity>
    })

    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.header}>
                <Text style={styles.title}>My Teams</Text>
            </View>
            <View style={styles.mainContent}>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView style={styles.scrollView} >
               
                            {teamCards}
                           
                    </ScrollView>
                </SafeAreaView>

            </View>
                <View style={styles.footer}>
                    <ImageBall source={require('../../assets/ball.png')} style={styles.imageBallStyle} />
                    <TouchableOpacity style={styles.btnCreateNewTeam} onPress={() => props.navigation.navigate('AddNewTeam')}>
                        <Image source={require('../../assets/plus.png')} style={styles.plusStyle} />
                        <Text style={styles.txtAddNewTeam}>Add New Team</Text>
                    </TouchableOpacity>
                </View>
            </View>

    )
}








