import React, { useEffect } from 'react'
import { Touchable } from 'react-native';
import { View, Text, StyleSheet, Animated } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesInput from '../MyTeams/Components/GooglePlacesInput'

const styles = StyleSheet.create({
    // container: {
    //     height: "100%"
    // },
    // header: {
    //     alignItems: 'center',
    //     padding: 40
    // },
    // title: {
    //     alignItems: 'center',
    //     padding: 40,
    //     color: 'white',
    //     fontSize: 40,
    // },
    // mainContent: {
    //     flex: 1,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    // footer: {
    //     justifyContent: 'flex-end',
    //     flex: 1,
    // },

    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop:80,
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: 'tomato'
    },
    google:{
        //width:'100%'
    }

});

export default function FindGame(props) {

    const animate = new Animated.Value(1);
    const animatedStyles = {
        transform: [
            {
                scale: animate
            }
        ]
    }
    const startAnimation = () => {
        Animated.timing(animate, {
            toValue: 2,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }

    // useEffect(() => {
    //     startAnimation();
    // }, [])
    return (
        <View style={styles.container}>
            <GooglePlacesInput/>
            
            {/* <MapContainer style={styles.google}/> */}
            {/* <View style={styles.header}>
                    {/* <Text style={styles.title}>Find Game</Text> */}
            {/* <View style={styles.box}> */}
                {/* <TouchableWithoutFeedback onPress={() => startAnimation()}>
                    <Animated.View style={animatedStyles.transform} />
                </TouchableWithoutFeedback> */}

            {/* </View> */}
        </View>

        //         {/* <View style={styles.mainContent}></View>
        //             <View style={styles.footer}></View> */}
        // {/* /</View> */ }

    )
}