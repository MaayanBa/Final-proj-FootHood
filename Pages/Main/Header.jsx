import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';


const styles = StyleSheet.create({
    headerRow: {
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 15,
        flexDirection: 'row',
        // paddingHorizontal: '10',
        // paddingVertical: 10,
        alignItems: 'center',
    },
    btnProfile: {
        flexDirection: 'row',
        width: 100,
        //height: ,
        //alignItems: 'flex-end'

    },
    imgProfile: {
        width: 30,
        height: 30,
        tintColor: 'white'
    },
    txtProfile: {
        color: 'white',
        fontSize: 20,

    },
    btnSetting: {
        width: 50,
        //height: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    iconSetting: {
        width: 30,
        height: 40,
        tintColor: 'white'
    }

})

export default function Header() {
    return (

        <View style={styles.headerRow}>

            <TouchableOpacity style={styles.btnSetting} onPress={() => console.log("SettingPage")}>
                <Image source={require('../../assets/Settings.png')} resizeMode="contain" style={styles.iconSetting} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnProfile} onPress={() => console.log("ProfilePage")}>
                <Text style={styles.txtProfile}> My Profile </Text>
                <Image source={require('../../assets/Nyemar.png')} resizeMode="contain" style={styles.imgProfile} />

            </TouchableOpacity>


        </View>
    )
}
