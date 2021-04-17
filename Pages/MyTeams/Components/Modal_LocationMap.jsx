import React, { useState } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
    Modal, Dimensions, Pressable
} from 'react-native';
import { Feather as LocationFeather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import AppCss from '../../../CSS/AppCss';

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
})

export default function Modal_LocationMap() {
    const [modalVisible, setModalVisible] = useState(false);
    const [region, setRegion] = useState({
        latitude: 32.342668849189536,
        longitude: 34.91228681110108,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    });
    const [destination, setDestination] = useState(null)

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
