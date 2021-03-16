import React, { useState } from 'react';
import { StyleSheet, View, Text, Buttonm, Image,Image as ImageBall, TouchableOpacity } from 'react-native';
import AddNewTeam from './AddNewTeam';


const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        alignItems: 'center',
        padding: 40
    },
    title: {
        alignItems: 'center',
        padding: 40,
        color: 'white',
        fontSize: 40,
    },
    mainContent: {
        flex:1,
        justifyContent: 'space-between',
        alignItems:'center',
    },
    imageBallStyle:{
        margin: 100,
        height: 100,
        width: 100,
    },
    footer: {
        justifyContent: 'flex-end',
        flex:1,
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
    }
});
export default function MyTeams(props) {
    const go2AddNewTeam = () => {
        props.navigation.navigate('AddNewTeam');
        //props.navigation.navigate('MyTeamsNav' , {screen: 'AddNewTeam'});
        //props.navigation.navigate('LoginUser');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Teams</Text>
            </View>
            <View style={styles.mainContent}>
                <Text> Main</Text>
                <ImageBall source={require('../../assets/ball.png')} style={styles.imageBallStyle} />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnCreateNewTeam} onPress={() => go2AddNewTeam()}>
                    <Image source={require('../../assets/plus.png')} style={styles.plusStyle} />
                    <Text style={styles.txtAddNewTeam}>Add New Team</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}
