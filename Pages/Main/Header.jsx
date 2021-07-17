import React, { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Context as AuthContext } from '../../Contexts/AuthContext'
import { Avatar } from 'react-native-elements';

export default function Header(props) {
    const { state: { token } } = useContext(AuthContext)

    return (
        <View style={styles.headerRow}>
            <TouchableOpacity style={styles.btnSetting} onPress={() => props.navigation.navigate('SettingsPage')}>
                <Image source={require('../../assets/Settings.png')} resizeMode="contain" style={styles.iconSetting} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnProfile} onPress={() => props.navigation.navigate('MyProfile')}>
                <Text style={styles.txtProfile}>  My Profile </Text>
                {token.PlayerPicture !== null ?
                    <Avatar size={28} rounded source={{ uri: token.PlayerPicture }} />
                    : <Image source={require('../../assets/Nyemar.png')} resizeMode="contain" style={styles.imgProfile} />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 80,
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        right: 10
    },
    btnProfile: {
        flexDirection: 'row',
        width: 100,
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    iconSetting: {
        width: 30,
        height: 40,
        tintColor: 'white'
    },
    player_img: {
        height: 20,
        width: 20
    }
})