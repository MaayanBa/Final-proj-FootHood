import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, Animated, } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Feather } from '@expo/vector-icons';
import PlayerApi from '../../api/Player';
import StarRating from 'react-native-star-rating';
import NotificationActions from '../../Services/NotificationActions';

const { height } = Dimensions.get("screen");
const height_logo = height * 0.3;

export default function CardPlayer({ navigation, route }) {
    const player = route.params.p;
    const [rate, setRate] = useState(null)
    const [age, setAge] = useState(new Date().getFullYear() - new Date(player.DateOfBirth).getFullYear())
    const stamina = player.Stamina;

    // const animate = new Animated.Value(1);
    // const animatedStyles={
    //     transform:[
    //         {
    //             scale: animate
    //         }
    //     ]
    // }
    // const startAnimation = ()=>{
    //     Animated.timing(animate,{
    //         toValue: 2,
    //         duration: 1500,
    //         useNativeDriver: true,
    //     }).start();
    // } 

    useEffect(() => {
        //startAnimation();
        getRate()
    }, [])
    const getRate = async () => {
        try {
            const response = await PlayerApi.post('/GetWeightedRate', { EmailofRatingPlayer: player.Email })
            setRate(response.data)
        } catch (err) { console.log("this is err in player card===> " + err) }
    }
    return (
        <View >
        <View style={{paddingTop:80}}>
        <Text style={styles.title}>Player Card</Text>
        </View>
        <View>
            <ImageBackground style={styles.card_bg} source={require('../../assets/BG_PlayerCard.png')} >
                <NotificationActions navigation={navigation} />


                <View style={styles.content}>
                    <View style={styles.imgAndName_View}>
                        <View style={styles.name_View}>
                            <Text style={[appCss.inputLabel, styles.playerName_txt]} multiline={true}>{player.FirstName}</Text>
                            <Text style={[appCss.inputLabel, styles.playerName_txt]} multiline={true}>{player.LastName}</Text>
                        </View>
                        {
                            player.PlayerPicture !== null ?
                                <Image style={styles.player_img} source={{ uri: player.PlayerPicture }} />
                                :
                                <Feather name="image" size={150} color="white" style={{ paddingRight: 10 }} />
                        }
                    </View>
                    <Text style={[appCss.inputLabel, styles.inputLabel_extra]}>City Live: {player.PlayerCity}</Text>
                    <View style={styles.ageAndGender_View}>
                        <Text style={[appCss.inputLabel, styles.inputLabel_extra, styles.gender_txt]}>Gender: {player.Gender == 0 ? "Male" : "Famele"}</Text>
                        <Text style={[appCss.inputLabel, styles.inputLabel_extra, styles.age_txt]}>Age: {age}</Text>
                    </View>

                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
                        <Text style={[appCss.inputLabel, styles.inputLabel_extra]}>Stamina: </Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            reversed={true}
                            rating={stamina}
                            //selectedStar={(rating) => setStaminaStars(rating)}
                            fullStarColor={'gold'}
                            size={10}
                        />
                    </View>

                    <Text style={[appCss.inputLabel, styles.inputLabel_extra]}>PreferRole:  {player.PreferredRole} </Text>
                    <View style={appCss.rates_View}>
                        <View style={[appCss.rate, { left: 22 }]}>
                            <Text>Attack</Text>
                            {rate !== null ? <Text>{rate.AttackRating}</Text> : null}
                        </View>
                        <View style={appCss.rate}>
                            <Text>Defence</Text>
                            {rate !== null ? <Text>{rate.DefenseRating}</Text> : null}
                        </View>
                    </View>
                    <View style={[appCss.rate, styles.power_View]}>
                        <Text>Power</Text>
                        {rate !== null ? <Text>{rate.PowerRating}</Text> : null}
                    </View>
                </View>
            </ImageBackground>
        </View>
        </View>
    )
}

const appCss = AppCss;

const styles = StyleSheet.create({
    card_bg: {
        top: 0,
        width: '100%',
        height: '92%',
        paddingTop: 60,
        left: 5,
        margin: 2
    },
    content: {
        paddingRight: 35,
    },
    imgAndName_View: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
    name_View: {
        flexDirection: 'column',
        marginTop: 20
    },
    playerName_txt: {
        paddingTop: 5,
        fontSize: 25
    },
    inputLabel_extra: {
        paddingTop: 5,
        right: 25,
        fontSize: 22
    },
    ageAndGender_View: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    gender_txt: {
        left: 100
    },
    power_View: {
        alignSelf: 'center',
        left: 12,
        paddingBottom: 5
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        alignSelf: 'center',
      },
});
