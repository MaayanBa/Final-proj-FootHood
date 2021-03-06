import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Image, Image as ImageBall, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Badge } from 'react-native-elements'
import { Avatar } from 'react-native-paper';
import { Context as TeamContext } from '../../Contexts/TeamContext';
import { Context as PlayerContext } from '../../Contexts/PlayerContext';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import AppCss from '../../CSS/AppCss';
import { firebase } from '../../api/FireBase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyTeams(props) {
    const { state: { myTeams }, GetTeamDetails } = useContext(TeamContext);
    const { state: { players } } = useContext(PlayerContext);
    const { state: { token } } = useContext(AuthContext)
    const [teamCards, setTeamCards] = useState(null);
    const [loading, setLoading] = useState(true);

    const convertToArray = (data) => {
        let res = []
        Object.keys(data).map((key) => {
            let val = data[key]
            res.push({ ...val, createdAt: new Date(val.createdAt) })
        })
        return res
    }
    const calcBadge = async (team) => {
        let lastCount = parseInt(await AsyncStorage.getItem(`messages_count_${team.TeamSerialNum}`));
        let totalInDb = await firebase.database().ref(`${team.TeamSerialNum}`).get();
        if (totalInDb.exists()) {
            totalInDb = totalInDb.exportVal()
            totalInDb = convertToArray(totalInDb).length
        } else {
            return 0
        }
        if (!lastCount) {
            lastCount = 0;
        }
        return totalInDb - lastCount;
    }

    const calcTeamCards = async () => {
        if (myTeams.length > 0) {
            const teamCards = await Promise.all(myTeams.map(async (team, key) => {
                let manager = players.find(x => x.Email === team.EmailManager);
                const badge = await calcBadge(team);
                return <TouchableOpacity style={styles.teamCard} key={key}
                    onPress={() => props.navigation.navigate('TeamPage', { key })}>
                    {token.Email === team.EmailManager ?
                        <Image source={require('../../assets/Manager.png')} style={styles.manager_img} /> : null}

                    <View style={styles.contextSide}>
                        <View style={styles.headerCard_View}>
                            <Text style={[appCss.inputLabel, { fontSize: 25, color: 'black' }]}>{team.TeamName}</Text>
                        </View>
                        <View style={styles.descripitionCard}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text> {manager.FirstName + " " + manager.LastName} </Text>
                                <Text style={{ fontWeight: 'bold' }}> Manager: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', left: token.Email === team.EmailManager ? 20 : 0 }}>
                                <Text> {team.PlayersList.length} </Text>
                                <Text style={{ fontWeight: 'bold' }}> Players: </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.side_img}>
                        <Avatar.Image size={64} source={{ uri: team.TeamPicture }} />
                    </View>
                    {badge === 0 ? null :
                        <Badge
                            containerStyle={{ position: 'absolute', top: 0, left: 0 }}
                            value={badge} //Counts the length of messages from DB
                            status="error" />
                    }
                </TouchableOpacity>
            }))
            setTeamCards(teamCards);
        }
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setTimeout(() => {
                setLoading(false);
            }, 2100);
            calcTeamCards();
            GetTeamDetails(token.Email)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [props.navigation, myTeams]);
    
    useEffect(() => {
        calcTeamCards();
    }, [myTeams])

    return (
        <View style={appCss.container}>
            <Text style={[appCss.title, appCss.space]}>My Teams</Text>
            {loading ?
                <View style={styles.loading}>
                    <ActivityIndicator size={80} color="#0000ff" style={{ alignItems: 'center' }} />
                </View>
                :
                <View style={styles.mainContent}>
                    <SafeAreaView>
                        <ScrollView>
                            {myTeams.length == 0 ? null : teamCards}
                        </ScrollView>
                    </SafeAreaView>
                </View>}
            {loading ? null : <View style={styles.footer}>
                <ImageBall source={require('../../assets/ball.png')} style={styles.ball_img} />
                <TouchableOpacity style={styles.createNewTeam_btn}
                    onPress={() => props.navigation.navigate('AddNewTeam')}>
                    <Image source={require('../../assets/plus.png')} style={styles.plusStyle} />
                    <Text style={appCss.inputLabel}>Add New Team</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
    },
    ball_img: {
        marginBottom: 90,
        height: 110,
        width: 100,
        alignSelf: 'center',
        top: 100
    },
    loading: {
        marginTop: 200
    },
    manager_img: {
        height: 22,
        width: 22,
        bottom: 20,
        left: 8
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
        padding: 10,
    },
    headerCard_View: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    descripitionCard: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    side_img: {},
});
