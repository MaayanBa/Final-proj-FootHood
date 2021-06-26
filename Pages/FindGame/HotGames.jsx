import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Octicons } from '@expo/vector-icons';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';

export default function HotGames(props) {
    const { state: { gamesPlayerNotRegistered }, GetGamesPlayerNotRegistered } = useContext(GameContext)
    const { state: { token } } = useContext(AuthContext);
    const { state: { joinRequests }, AddNewJoinRequests, GetJoinRequests } = useContext(TeamContext);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            GetGamesPlayerNotRegistered(token.Email)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [props.navigation]);

    const sliceTime = (time) => {
        return time.slice(0, -3);
    }

    const convertDate = (date) => {
        return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }


    const sendJoinRequest = (gameSerialNum) => {
        AddNewJoinRequests(token.Email, gameSerialNum)
    }
    let counter = 0;
    let gameCards = gamesPlayerNotRegistered.map((g, key) => {
        if (counter == 0) {
            counter++;
            return <View key={key} style={styles.GameInformation_Touch}>
                <View style={styles.gameInformation_View}>
                    <View style={styles.gameInformation_View_R}>
                        <View>
                            <Text style={styles.txtStyle}>Time: {sliceTime(g.GameTime)}</Text>
                            <Text style={styles.txtStyle}>Avarage age: {g.AvgPlayerAge}</Text>
                        </View>
                        <View style={styles.gameInformation_View_R_Down}>
                            <TouchableOpacity style={[,appCss.blue_btn, { paddingTop: 5 ,backgroundColor:'white'}]} onPress={() => sendJoinRequest(g.GameSerialNum)}>
                                <Text style={[styles.txtStyle, { color: 'black', alignItems: 'center', paddingBottom: 5 }]}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.gameInformation_View_L}>
                        <Text style={styles.txtStyle}>Date: {convertDate(new Date(g.GameDate))}</Text>
                        <Text style={styles.txtStyle}>Number of Players: {g.NumOfPlayersInTeam}</Text>
                        <Text style={styles.txtStyle}>Location: {g.GameLocation}</Text>
                    </View>
                </View>
            </View>
        }
        else {

        }
    })

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={[ appCss.space,{flexDirection: 'row',justifyContent: 'space-evenly'}]}>
                <Octicons name="flame" size={35} color="#ff0000" style={{alignSelf:'center',marginRight:30}} />
                <Text style={[appCss.title,{color:'white'}]}>Hot Games</Text>
                <Octicons name="flame" size={35} color="#ff0000" style={{alignSelf:'center',marginLeft:30}} />
            </View>
            {gameCards}
        </View>
    );
}

const appCss = AppCss;
const styles = StyleSheet.create({
    gameTitle_View: {
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    gameInformation_View: {
        backgroundColor: '#ff0000',
        padding: 20,
        width: Dimensions.get('window').width - 40,
        flexDirection: "row",
        justifyContent: 'space-between',
        borderRadius: 20,
        marginTop: 10
    },
    txtStyle: {
        paddingBottom: 20,
        fontWeight: "bold",
        color:'white'
    },
    header_txt: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: "bold",
    },
    gameInformation_View_R: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    gameInformation_View_R_Down: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    court_img: {
        //marginBottom: 90,
        height: 45,
        width: 45,
        //alignSelf: 'flex-end',
        marginHorizontal: 20
    },
    games_scrollView: {
        height: 340
    },
});
