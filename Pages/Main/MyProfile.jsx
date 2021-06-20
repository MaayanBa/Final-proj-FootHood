import React, { useState, useContext, useEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as AuthContext } from '../../Contexts/AuthContext';
import StarRating from 'react-native-star-rating';
import PlayerApi from '../../api/Player';

export default function MyProfile() {
    const { state: { token } } = useContext(AuthContext);
    const [user, setUser] = useState(token)
    const [age, setAge] = useState(new Date().getFullYear() - new Date(user.DateOfBirth).getFullYear())
    const [rate, setRate] = useState(null)

    useEffect(() => {
        getRate()
    }, [])
    const getRate = async () => {
        try {
            const response = await PlayerApi.post('/GetWeightedRate', { EmailofRatingPlayer: user.Email })
            setRate(response.data)
        } catch (err) { console.log("this is err in player card===> " + err) }
    }

    return (
        <View style={appCss.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={[appCss.title, appCss.space]}>My Profile</Text>
                <View>
                    {user.PlayerPicture !== null ?
                        <Image style={styles.player_img} source={{ uri: user.PlayerPicture }} />
                        :
                        <Feather name="image" size={150} color="white" style={{ paddingRight: 10 }} />
                    }
                </View>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={[appCss.inputLabel, { paddingTop: 20 }]}>Full Name: {user.FirstName + " " + user.LastName}</Text>
                <Text style={[appCss.inputLabel, { paddingTop: 20 }]}>Age: {age}</Text>
                <Text style={[appCss.inputLabel, { paddingTop: 20 }]}>Height: {user.Height}</Text>
                <Text style={[appCss.inputLabel, { paddingTop: 20 }]}>Strong Leg: {user.StrongLeg ? 'Left' : 'Right'}</Text>
                <View style={{ flexDirection: 'row' ,justifyContent:'flex-end'}}>
                    <View style={styles.starStamina}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            reversed={true}
                            rating={user.Stamina}
                            fullStarColor={'gold'}
                            starSize={34}
                        />
                    </View>
                    <Text style={[appCss.inputLabel, { paddingTop: 25 }]}>Fitness:</Text>
                </View>
                <Text style={appCss.inputLabel}>Preffered Role: {user.PreferredRole}</Text>
                <Text style={[appCss.inputLabel, { paddingTop: 20 }]}>Ranking:</Text>
                <View style={styles.rates_View}>
                    <View style={styles.rate}>
                        <Text>Attack</Text>
                        {rate !== null ? <Text>{rate.AttackRating}</Text> : null}
                    </View>
                    <View style={styles.rate}>
                        <Text>Defence</Text>
                        {rate !== null ? <Text>{rate.DefenseRating}</Text> : null}
                    </View>
                    <View style={styles.rate}>
                        <Text>Power</Text>
                        {rate !== null ? <Text>{rate.PowerRating}</Text> : null}
                    </View>
                </View>
            </View>
        </View>
    );
}

const appCss = AppCss;
const styles = StyleSheet.create({
    starStamina: {
        padding: 20,
        justifyContent: 'flex-start',
    },
    rates_View: {
        justifyContent: 'space-around',
        alignContent:'center',
        flexDirection: 'row',
        marginTop: 15
    },
    rate: {
        backgroundColor: 'yellow',
        borderRadius: 40,
        height: 60,
        width: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    player_img: {
        width: 150,
        height: 150,
        marginRight: 20,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 2
    },
});
