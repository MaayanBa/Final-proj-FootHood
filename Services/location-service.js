import { enableExpoCliLogging } from 'expo/build/logs/Logs';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAY2M0Dj9jb5I6kU-_prhC3i0XLqdufOW8');


export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => reject(err)
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(locationName)
                .then(json => {
                    // const addressComponent = json.results[0].address_components[0];
                    var addressComponent = json.results[0].geometry.location;

                    resolve(addressComponent);
                    // console.log("loc===>"+addressComponent);
                    // console.log(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

