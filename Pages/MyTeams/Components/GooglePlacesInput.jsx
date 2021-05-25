import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, Dimensions, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    googleInput: {
        height: '60%',
        width: Dimensions.get('window').width - 70,
        position:'absolute',
        zIndex:1,
        top:80,
        alignSelf:'center'
    },
})

const GooglePlacesInput = (props) => {
    return (


            <View style={styles.googleInput} >
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    onPress={(googlePlaceDetails = null) => { // 'details' is provided when fetchDetails = true
                        props.notifyChange(googlePlaceDetails.structured_formatting.secondary_text+" " +googlePlaceDetails.structured_formatting.main_text);
                        // console.log("googlePlaceData========>")
                        // console.log(googlePlaceData)
                        // console.log("googlePlaceDetails======>")
                        //console.log(googlePlaceDetails.structured_formatting.main_text+" " +googlePlaceDetails.structured_formatting.secondary_text)
                    }}
                    query={{
                        key: 'AIzaSyAY2M0Dj9jb5I6kU-_prhC3i0XLqdufOW8',
                        language: ['en', 'he']
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={300}
                />
            </View >

    );
};

export default GooglePlacesInput;
