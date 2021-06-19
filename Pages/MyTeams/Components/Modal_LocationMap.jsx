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

            <View style={appCss.modal_View}>
            <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50}} source={require('../../../assets/WallPaperWhite2.png')}>
                <Text style={appCss.modal_Txt}>Choose Location:</Text>

                <GooglePlacesInput notifyChange={(loc) => getCoordsFromName(loc)} />

                {/* <CitiesDropDown ChoosenCity={(city) => GetCityFromUser(city)} city={cityGame} /> */}
                <View style={appCss.map_Container}>
                    <MapView style={appCss.mapView_container}
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

                <Pressable style={appCss.map_BtnClose} onPress={() => props.setModalVisible()}>
                    <Text style={appCss.inputLabel}>Close Map</Text>
                </Pressable>
                </ImageBackground>
            </View>
        </Modal>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({

})
