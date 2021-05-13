import React, { useState, useEffect } from 'react';
import { NavigationApps, googleMapsActions, wazeActions, googleMapsTravelModes,actions } from "react-native-navigation-apps";
import { getLocation, geocodeLocationByName } from '../../../Services/location-service';


const Navigation = (props) => {
    const [location,setLocation] = useState(props.location);
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    useEffect(() => {
        getCoordsFromName()
    }, [])

    const getCoordsFromName =async () => {
        location !== undefined ?
            await geocodeLocationByName(location).then(
                (data) => {
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
        <NavigationApps
            iconSize={30}
            row
            address={props.location} // address to navigate by for all apps 
            // waze={{ address: `${props.location}`, lat: region.latitude, lon: region.longitude, action: actions.navigateByAddress }}
            // googleMaps={{  lat: region.latitude, lon: region.longitude, action: actions.navigateByAddress, travelMode: googleMapsTravelModes }}
            //maps={{ search, lat: region.latitude, lon: region.longitude, action: mapsActions.navigateByAddress, travelMode: mapsTravelModes.driving }}
        />
    )
}
export default Navigation;