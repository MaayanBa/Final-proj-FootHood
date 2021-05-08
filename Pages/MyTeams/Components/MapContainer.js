import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import GooglePlacesInput  from './GooglePlacesInput';
import MyMapView from './MapView';
import { getLocation, geocodeLocationByName } from '../../../Services/location-service';


export default function MapContainer() {
    const [region, setRegion] = useState({
        latitude: "",
        longitude: '',
        latitudeDelta: '',
        longitudeDelta: '',
    });
    
    useEffect(() => {
        getInitialState();
    }, [])


    const getInitialState = () => {
        getLocation().then(
            (data) => {
                console.log(data);
                setRegion({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                });
            }
        );
    }

    const getCoordsFromName = (loc) => {
        setRegion({
            latitude: loc.lat,
            longitude: loc.lng,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
        });
    }

    const onMapRegionChange=(region)=> {
        setRegion(region);
    }
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <GooglePlacesInput notifyChange={(loc) => getCoordsFromName(loc)}
                />
            </View>

            {
                region['latitude'] ?
                    <View style={{ flex: 1 }}>
                        <MyMapView
                        
                            region={region}
                            onRegionChange={(reg) => onMapRegionChange(reg)} />
                    </View> : null}
        </View>
    )
}









