import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async () => {
    let previousExpoTokenDate = await AsyncStorage.getItem('expoTokenDate');

    if (previousExpoTokenDate == new Date().toLocaleDateString())
        return;
    else {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        // console.log(status)
        if (status !== 'granted')
            return;

        let expoToken = await Notifications.getExpoPushTokenAsync();
        AsyncStorage.setItem('expoTokenDate', new Date().toLocaleDateString());
        return expoToken
    }
}