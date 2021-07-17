import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Octicons } from '@expo/vector-icons';
import { Context as JarvisContext } from '../../Contexts/JarvisContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import Modal_Alert from '../Modal_Alert';

export default function HotGames(props) {
    const { state: { hotGames }, Jarvis_GetHotGames } = useContext(JarvisContext)
    const { state: { token } } = useContext(AuthContext);
    const {  AddNewJoinRequests } = useContext(TeamContext);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            Jarvis_GetHotGames(token.Email)
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

    const Alert = (message) => {
        setAlertText(message)
        setAlertModalVisible(true)
    }

    const sendJoinRequest = (gameSerialNum) => {
        AddNewJoinRequests(token.Email, gameSerialNum)
        Alert("You have sent a request to join! Please wait for the manager of the team to accept you")
    }
    
    let counter = 0;
    let gameCards = hotGames.map((g, key) => {
        if (counter == 0) {
            counter++;
            return <View key={key} style={styles.GameInformation_Touch}>
                <View style={styles.gameInformation_View}>
                {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={alertText} />}
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
    })

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={[ appCss.space,{flexDirection: 'row',justifyContent: 'space-evenly'}]}>
                <Octicons name="flame" size={35} color="#ff0000" style={{alignSelf:'center',marginRight:30}} />
                <Text style={[appCss.title,{color:'white'}]}>Hot Games</Text>
                <Octicons name="flame" size={35} color="#ff0000" style={{alignSelf:'center',marginLeft:30}} />
            </View>
            {hotGames==null?null:gameCards}
            {console.log(hotGames)}
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
        height: 45,
        width: 45,
        marginHorizontal: 20
    },
    games_scrollView: {
        height: 340
    },
});
