import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView } from 'react-native';
// import Navigation from '../../Pages/MyTeams/Components/Navigation'
import AppCss from '../../CSS/AppCss';
import { Context as GameContext } from '../../Contexts/GameContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import * as Linking from 'expo-linking';
import NotificationActions from '../../Services/NotificationActions';
import Modal_ActionAlert from '../Modal_ActionAlert';


export default function GameList(props) {
    const { state: { gamesList, amountRegisteredPlayersEachGame }, GetGamesList, GetAmountRegisteredPlayersEachGame, RemoveGameFromList } = useContext(GameContext);
    const { key } = props.route.params;
    const keyTeam = key;
    const { state: { token } } = useContext(AuthContext)
    const { state: { myTeams } } = useContext(TeamContext);
    const [alertActionModalVisible, setAlertActionModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertAction, setAlertAction] = useState('');
    const [alertTeam, setAlertTeam] = useState()

    const convertDate = (date) => {
        return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            GetGamesList(myTeams[key].TeamSerialNum)
            GetAmountRegisteredPlayersEachGame(myTeams[key].TeamSerialNum)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [props.navigation]);


    const RemoveBtn = (g) => {
        setAlertText("Do you want to remove this game?")
        setAlertAction("RemoveGame")
        setAlertActionModalVisible(true)
        setAlertTeam(g)
    }

    //Builds up togther the date and time
    const sliceTime = (time) => {
        return time.slice(0, -3);
    }

    const navInWaze = (loc) => {
        console.log(loc)
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + loc) //Navigate to specific location
    }

    let gameCards = gamesList.map((game, index) => {
        return <View key={index} style={styles.card}>
            <View style={styles.gameInformation_View}>
                <View style={styles.gameInformation_View_R}>
                    {token.Email !== myTeams[keyTeam].EmailManager ? null :
                        <TouchableOpacity style={[appCss.x_TouchIcon, { right: 5, bottom: 10 }]} activeOpacity={0.8} onPress={() => RemoveBtn(game)} >
                            <Image style={appCss.xIcon} source={require('../../assets/X.png')} />
                        </TouchableOpacity>
                    }
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
                    <Text style={styles.txtStyle}>Number of Registered: {amountRegisteredPlayersEachGame == undefined ? null : amountRegisteredPlayersEachGame.find(x => x.GameSerialNum === game.GameSerialNum).NumOfPlayers}</Text>
                    <Text style={styles.txtStyle}>Location: {game.GameLocation}</Text>
                    <TouchableOpacity onPress={() => navInWaze(game.GameLocation)}>
                        <Text style={styles.txtStyle}>Take me there
                            <Image source={require('../../assets/Waze.png')} resizeMode="contain" style={styles.waze_Icon} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    });
    return (
        <View style={[appCss.container, { paddingTop: 50 }]}>
            {alertActionModalVisible && <Modal_ActionAlert alertActionModalVisible={alertActionModalVisible} setAlertActionModalVisible={() => setAlertActionModalVisible(!alertActionModalVisible)} text={alertText} action={alertAction} item={alertTeam} />}
            <NotificationActions navigation={props.navigation} />
            <Text style={[appCss.title, { top: 5, paddingBottom: 20, }]}>Game List</Text>
            <ScrollView>
                {gamesList !== undefined ? gameCards : null}
            </ScrollView>
        </View>
    );
}

const appCss = AppCss;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#D9D9D9',
        width: '90%',
        borderRadius: 30,
        marginTop: 40,
        alignSelf: 'center'
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
