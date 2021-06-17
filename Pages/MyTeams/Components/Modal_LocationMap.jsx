import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text, Image, TextInput,
    Modal, Dimensions, Pressable,ImageBackground
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AppCss from '../../../CSS/AppCss';
import { getLocation, geocodeLocationByName } from '../../../Services/location-service';
import { Context as CitiesContext } from '../../../Contexts/CitiesContext';
import CitiesDropDown from './CitiesDropDown';
import GooglePlacesInput from './GooglePlacesInput';

export default function Modal_LocationMap(props) {
    const { state: { cities } } = useContext(CitiesContext);

    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [cityGame, setCityGame] = useState(null);

    useEffect(() => {
        getInitialState();
    }, [])

    const getInitialState = () => {
        getLocation().then(
            (data) => {
                //console.log(data);
                setRegion({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                });
            }
        );
    }

    const GetCityFromUser = (c) => {
        setCityGame(c)
    }

    const getCoordsFromName = (loc) => {
        props.location(loc)
        loc !== undefined ?
            geocodeLocationByName(loc).then(
                (data) => {
                    console.log("Data====>" + data);
                    console.log(data);
                    props.locationCord(data)
                    setRegion({
                        latitude: data.lat,
                        longitude: data.lng,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008
                    });
                }
            ) : null
    }

    return (
        <Modal animationType="slide"
            transparent={true} visible={props.modalVisible} onRequestClose={() => props.setModalVisible()}>

            <View style={styles.modal_View}>
            <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50}} source={require('../../../assets/WallPaperWhite2.png')}>
                <Text style={styles.modal_Txt}>Choose Location:</Text>

                <GooglePlacesInput notifyChange={(loc) => getCoordsFromName(loc)} />

                {/* <CitiesDropDown ChoosenCity={(city) => GetCityFromUser(city)} city={cityGame} /> */}
                <View style={styles.map_Container}>
                    <MapView style={styles.mapView_container}
                        onPress={(pos) => { console.log(pos.nativeEvent.coordinate); }}
                        provider={PROVIDER_GOOGLE}
                        region={region}
                        onRegionChangeComplete={region => setRegion(region)}>

                        <Marker
                            draggable
                            coordinate={region} title={'My Location'}
                            onDragEnd={(e) => console.log(e.nativeEvent)/*setDestination({ destination: e.nativeEvent.coordinate })*/} />
                    </MapView>
                </View>

                <Pressable style={styles.map_BtnClose} onPress={() => props.setModalVisible()}>
                    <Text style={appCss.inputLabel}>Close Map</Text>
                </Pressable>
                </ImageBackground>
            </View>
        </Modal>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    // modal_View: {
    //     margin: 20,
    //     backgroundColor: "white",
    //     borderRadius: 20,
    //     padding: 35,
    //     alignItems: "center",
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5,
    //     height: '90%',
    //     width: '90%',

    // },
    modal_View: {
        margin: 20,
        // backgroundColor: "#808080",
        //backgroundColor: imgBackGround,
        //borderRadius:0,
        padding: 5,
        //paddingTop: 5,
        shadowColor: "#D9D9D9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 20,
        height: '90%',
        width: '90%',
        borderRadius: 30

    },
    modal_Txt: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: 'black'
    },
    map_Container: {
        flex: 1,
        marginTop: 20,
        // backgroundColor: '#fff',
        alignItems:'center'
    },
    mapView_container: {
        flex: 1,
        zIndex: 0,
        width: Dimensions.get('window').width - 60,
        height: '70%'
    },
    map_BtnClose: {
        backgroundColor: "#2196F3",
        marginTop: 40,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
        marginBottom:20
    },
})
