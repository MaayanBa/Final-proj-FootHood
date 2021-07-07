import React, { useState, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text, TextInput,
    Modal, Dimensions, Pressable, ImageBackground, ScrollView
} from 'react-native';
import AppCss from '../../CSS/AppCss';
import { ListItem } from 'react-native-elements';
import * as Linking from 'expo-linking';


export default function Modal_FullNews(props) {

    return (
        <Modal animationType="slide"
            transparent={true} visible={props.modalNewsVisible} onRequestClose={() => props.setModalNewsVisible()}>

            <View style={appCss.modal_View}>
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
                    <ScrollView style={styles.news_scrollView}>
                        {props.News}
                    </ScrollView>
                    <View style={styles.buttons}>
                        <Pressable style={appCss.map_BtnClose} onPress={() => props.setModalNewsVisible()}            >
                            <Text style={appCss.inputLabel}>Close</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        </Modal>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    news_scrollView: {
        height: 460,
    },
})