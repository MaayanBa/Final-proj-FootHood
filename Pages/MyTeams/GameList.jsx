import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import Navigation from '../../Pages/MyTeams/Components/Navigation'
import AppCss from '../../CSS/AppCss';
import { Context as GameContext } from '../../Contexts/GameContext';
import DateAndTime from './Components/DateAndTime';
//import LaunchNavigator from 'react-native-launch-navigator';
import * as Linking from 'expo-linking';



const appCss = AppCss;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#D9D9D9',
        width: '90%',
        borderRadius: 30,
        marginTop: 40, 
        alignSelf:'center'
    },
    gameTitle_View: {
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    gameInformation_View: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txtStyle: {
        paddingBottom: 20,
        fontWeight: "bold",
    },
    header_txt: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: "bold",
    },
    waze_Icon: {
        width: 50,
        height: 30,
        tintColor: 'black',
        alignSelf: 'flex-end'

    },
    gameInformation_View_R: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    gameInformation_View_R_Down: {
        flexDirection: 'column',
        alignItems: 'center'
    },

})


export default function GameList(props) {
    // const { state: { gamesList }, GetGamesList } = useContext(GameContext);
    // const {team} = props.route.params;
    const { state: { gamesList }} = useContext(GameContext);
    const { key } = props.route.params;
    const keyTeam  = key;
    //const { state: { gamesList } } = useContext(GameContext);

    // const GetGameDate=(date)=>{
    //     console.log(date.getFullYear())
    //     var gameDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //     return gameDate;
    // }



    const convertDate = (date) => {
        return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }

    //Builds up togther the date and time
    const sliceTime = (time) => {
        return time.slice(0, -3);
    }

    const navInWaze = (loc) => {
        console.log(loc)
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + loc) //מנווט למקום ספציפי
        // Linking.openURL('https://www.google.com/maps/search/?api=1&query=%D7%9E%D7%92%D7%A8%D7%A9+%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C'); //ניווט לכל המגרשי ספורט
    }

    let gameCards = gamesList.map((game, index) => {
        return <View key={index} style={styles.card}>
            <View style={styles.gameInformation_View}>
                <View style={styles.gameInformation_View_R}>
                    <View>
                        <Text style={styles.txtStyle}>Time: {sliceTime(game.GameTime)}</Text>
                        <Text style={styles.txtStyle}>Avarege Age: {game.AvgPlayerAge}</Text>
                    </View>
                    <View style={styles.gameInformation_View_R_Down}>
                        <TouchableOpacity style={appCss.blue_btn} onPress={() => props.navigation.navigate('GamePage', { index, keyTeam })}>
                            <Text style={[styles.txtStyle, { color: 'white', alignItems: 'center' }]}>ENTER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.gameInformation_View_L}>
                    <Text style={styles.txtStyle}>Date: {convertDate(new Date(game.GameDate))}</Text>
                    <Text style={styles.txtStyle}>Number of Players: {game.NumOfPlayersInTeam}</Text>
                    {/* <View style={{flexDirection:'row-reverse'}}> */}
                    <Text style={styles.txtStyle}>Location: {game.GameLocation}</Text>
                    {/* <Navigation location={game.GameLocation} /> */}
                    <TouchableOpacity onPress={() => navInWaze(game.GameLocation)}>
                        <Text style={styles.txtStyle}>Take me there
                            <Image source={require('../../assets/Waze.png')} resizeMode="contain" style={styles.waze_Icon} />
                        </Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
            </View>
        </View>
    });
    return (
        <View style={[appCss.container, {  paddingTop: 50 }]}>
            {/* {console.log(gamesList)} */}
            <Text style={[appCss.title, { top: 5, paddingBottom:20, }]}>Game List</Text>
            <ScrollView>
                {gameCards}
            </ScrollView>

        </View>
    );
}




