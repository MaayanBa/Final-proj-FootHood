import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Modal, Pressable, ImageBackground } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import AppCss from '../../CSS/AppCss';
import { getLocation, geocodeLocationByName } from '../../Services/location-service';
import GooglePlacesInput from '../MyTeams/Components/GooglePlacesInput';
import Modal_Alert from '../Modal_Alert';


export default function Modal_LocationMap(props) {
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [locationName, setLocationName] = useState("");
    const [radius, setRadius] = useState('');

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
            // alert("You must enter place name radius for search")
            setAlertModalVisible(true)
        else {
            props.distance(parseInt(radius))
            props.locationCord(region)
            props.setModalVisible()
        }
    }
    return (
        <Modal animationType="slide"
            transparent={true} visible={props.modalVisible} onRequestClose={() => props.setModalVisible()}>

            <View style={appCss.modal_View}>
                {alertModalVisible && <Modal_Alert alertModalVisible={alertModalVisible} setAlertModalVisible={() => setAlertModalVisible(!alertModalVisible)} text={"You must enter place name and radius for search"} />}
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
                    <Text style={[appCss.modal_Txt, { paddingTop: 20, }]}>Choose Location:</Text>
                    <GooglePlacesInput notifyChange={(loc) => getCoordsFromName(loc)} />
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

                    <View style={{ justifyContent: 'space-around', marginTop: 20, flexDirection: 'row-reverse' }}>
                        <Text style={[appCss.modal_Txt, { paddingTop: 20 }]}>Set radius limit:</Text>
                        <DropDownPicker
                            items={[
                                { label: '1 KM', value: '1' }, { label: '2 KM', value: '2' }, { label: '5 KM', value: '5' }, { label: '10 KM', value: '10' }, { label: '20 KM', value: '20' }, { label: '40 KM', value: '40' }, { label: '', value: '' }
                            ]}
                            onChangeItem={item => setRadius(item.value)}
                            placeholder="KM"
                            containerStyle={{ marginTop: 15, height: 30, width: 85 }}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Pressable style={appCss.map_BtnClose} onPress={() => FilterGames()}>
                            <Text style={appCss.inputLabel}>Filter games</Text>
                        </Pressable>
                        <Pressable style={appCss.map_BtnClose} onPress={() => props.setModalVisible()}            >
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
