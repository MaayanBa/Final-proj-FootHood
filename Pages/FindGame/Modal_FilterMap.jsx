import React, { useState, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text, TextInput,
    Modal, Dimensions, Pressable, ImageBackground
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AppCss from '../../CSS/AppCss';
import { getLocation, geocodeLocationByName } from '../../Services/location-service';
import GooglePlacesInput from '../MyTeams/Components/GooglePlacesInput';


export default function Modal_LocationMap(props) {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [radius, setRadius] = useState("");
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        getInitialState();
    }, [])

    const getInitialState = async () => {
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

    const getCoordsFromName = (loc) => {
        props.location(loc)
        setLocationName(loc);
        loc !== undefined ?
            geocodeLocationByName(loc).then(
                (data) => {
                    // console.log("Data====>" + data);
                    // console.log(data);
                    setRegion({
                        latitude: data.lat,
                        longitude: data.lng,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008
                    });
                }
            ) : null
    }

    const FilterGames = () => {
        if (radius == 0 || locationName == "")
            alert("You must enter place name radius for search")
        else {
            // console.log(region)
            // console.log(locationName)
            // console.log(radius)
            props.distance(parseInt(radius))
            props.locationCord(region)
            props.setModalVisible()
        }
    }
    return (
        <Modal animationType="slide"
            transparent={true} visible={props.modalVisible} onRequestClose={() => props.setModalVisible()}>

            <View style={styles.modal_View}>
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
                    <Text style={styles.modal_Txt}>Choose Location:</Text>
                    <GooglePlacesInput notifyChange={(loc) => getCoordsFromName(loc)} />
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
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.modal_Txt}>Set radius limit:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setRadius}
                            value={radius}
                            keyboardType="phone-pad"
                            placeholder="Please Enter Radius KM"
                        />
                    </View>
                    <View style={styles.buttons}>
                        <Pressable style={styles.map_BtnClose} onPress={() => FilterGames()}>
                            <Text style={appCss.inputLabel}>Filter games</Text>
                        </Pressable>
                        <Pressable style={styles.map_BtnClose} onPress={() => props.setModalVisible()}            >
                            <Text style={appCss.inputLabel}>Close Map</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        </Modal>
    )
}


const appCss = AppCss;

const styles = StyleSheet.create({
    modal_View: {
        margin: 20,
        padding: 5,
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
        paddingTop: 20,
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: 'black'
    },
    map_Container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
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
        marginBottom: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
})
