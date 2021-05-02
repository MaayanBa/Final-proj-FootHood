import React, { useState, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal, Dimensions, Pressable
} from 'react-native';
import { Feather as LocationFeather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import AppCss from '../../../CSS/AppCss';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const appCss = AppCss;

const styles = StyleSheet.create({
    location_View: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 35
    },
    modal_View: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '90%',
        width: '90%',

    },
    modal_Txt: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: 'black'
    },
    map_Container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map_BtnClose: {
        backgroundColor: "#2196F3",
        marginTop: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2,

    },
    addressText: {
        color: "black",
        margin: 3,
        fontFamily: "Calibri",
    },
    panelFill: {
        position: "absolute",
        top: 0,
        alignSelf: "stretch",
        right: 0,
        left: 0,
    },
    panel: {
        position: "absolute",
        top: 0,
        alignSelf: "stretch",
        right: 0,
        left: 0,
        flex: 1,
    },
    panelHeader: {
        //add custom header
    },
})

export default function Modal_LocationMap() {
    const [modalVisible, setModalVisible] = useState(false);
    const [region, setRegion] = useState({
        latitude: 32.342668849189536,
        longitude: 34.91228681110108,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    });
    const [address, setAddress] = useState("");
    const [listViewDisplayed, setListViewDisplayed] = useState(true);
    const [showAddress, setShowAddress] = useState(false);
    const [search, setSearch] = useState("");
    const [currentLat, setCurrentLat] = useState("");
    const [currentLng, setCurrentLng] = useState("");
    const [forceRefresh, setForceRefresh] = useState(0);
    const [searchText, setSearchText] = useState("");

    const [destination, setDestination] = useState(null)

    let mapView = "";

    const getAddress = () => {
        //function to get address using current lat and lng
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + region.latitude + "," + region.longitude + "&key=" + AIzaSyAY2M0Dj9jb5I6kU - _prhC3i0XLqdufOW8).then((response) => response.json()).then((responseJson) => {
            console.log("ADDRESS GEOCODE is BACK!! => " + JSON.stringify(responseJson));
            setRegion({
                address: JSON.stringify(responseJson.results[0].formatted_address)
                    .replace(/"/g, "")
            });
        });
    }

    const goToInitialLocation = (region) => {
        let initialRegion = Object.assign({}, region);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    };
    const onRegionChange = (region) => {
        setRegion(region);
        setForceRefresh(Math.floor(Math.random() * 100));
        //this.getCurrentAddress//callback

    };





    const modalLocationMap = <Modal animationType="slide"
        transparent={true} visible={modalVisible}
        onRequestClose={() => {
            alert("You have closed the map.");
            setModalVisible(!modalVisible);
        }}
    >
        {/* <View style={styles.centeredView}> */}
        <View style={styles.modal_View}>
            <Text style={styles.modal_Txt}>Choose Location:</Text>
            <View style={styles.map_Container}>

                <MapView
                    onPress={(pos) => { console.log(pos.nativeEvent.coordinate); }}
                    style={{ flex: 1, width: Dimensions.get('window').width - 70, height: '70%' }}
                    region={region}
                    onRegionChangeComplete={region => setRegion(region)}
                >
                    <Marker draggable
                        coordinate={region}
                        onDragEnd={(e) => setDestination({ destination: e.nativeEvent.coordinate })}
                    />
                </MapView>

                <View style={styles.panel}>
                    <View style={[styles.panelHeader,styles.panelFill ]}>
                        <GooglePlacesAutocomplete
                            currentLocation={false}
                            enableHighAccuracyLocation={true}
                            ref={(c) => (setSearchText(c))}
                            placeholder="Search for a location"
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={"search"}
                            listViewDisplayed={listViewDisplayed}
                            fetchDetails={true}
                            renderDescription={(row) => row.description}
                            enablePoweredByContainer={false}
                            listUnderlayColor="lightgrey"
                            onPress={(data, details) => {
                                setListViewDisplayed(false)
                                setAddress(data.description)
                                setCurrentLat(details.geometry.location.lat)
                                setCurrentLng(details.geometry.location.lng)
                                setRegion({
                                    latitudeDelta,
                                    longitudeDelta,
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                });
                                setSearchText("");
                                goToInitialLocation(region);
                            }}
                            textInputProps={{
                                onChangeText: (text) => {
                                    console.log(text);
                                    setListViewDisplayed(true);
                                },
                            }}
                            getDefaultValue={() => {
                                return ""; // text input default value
                            }}
                            query={{
                                key: "AIzaSyAY2M0Dj9jb5I6kU - _prhC3i0XLqdufOW8",
                                language: "en", // language of the results
                                components: "country:ind",
                            }}
                            styles={{
                                description: {
                                    fontFamily: "Calibri",
                                    color: "black",
                                    fontSize: 12,
                                },
                                predefinedPlacesDescription: {
                                    color: "black",
                                },
                                listView: {
                                    position: "absolute",
                                    marginTop: 44,
                                    backgroundColor: "white",
                                    borderBottomEndRadius: 15,
                                    elevation: 2,
                                },
                            }}
                            nearbyPlacesAPI="GooglePlacesSearch"
                            GooglePlacesSearchQuery={{
                                rankby: "distance",
                                types: "building",
                            }}
                            filterReverseGeocodingByTypes={[
                                "locality", "administrative_area_level_3",]}
                            debounce={200} />
                    </View>
                </View>

            </View>
            {/* <Text style={styles.modalText}>Map Here</Text> */}
            <Pressable
                style={styles.map_BtnClose}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={appCss.inputLabel}>Close Map</Text>
            </Pressable>
        </View>
        {/* </View> */}
    </Modal>

    return (
        <View style={styles.location_View}>
            <TouchableOpacity onPress={() => setModalVisible(true)} >
                <LocationFeather name="map-pin" size={40} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <Text style={appCss.inputLabel}>Game Location:</Text>
            {modalLocationMap}
        </View>
    )
}


