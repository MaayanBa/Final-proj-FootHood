import React, { useState, useEffect } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text, TextInput,
    Modal, Dimensions, Pressable, ImageBackground, ScrollView
} from 'react-native';
import AppCss from '../../CSS/AppCss';
import { ListItem } from 'react-native-elements';
import * as Linking from 'expo-linking';



export default function Modal_FullNews(props) {


    const News = props.titles.map((t, i) => {
        if(i>0){
            return(<ListItem key={i} style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL(props.links[i-1])} >
                    <ListItem.Content style={{ alignItems: 'flex-end' }} >
                        <ListItem.Title>{t}</ListItem.Title>
                    </ListItem.Content>
                </TouchableOpacity>
            </ListItem>)
        }
        
    })


    return (
        <Modal animationType="slide"
            transparent={true} visible={props.modalNewsVisible} onRequestClose={() => props.setModalNewsVisible()}>

            <View style={appCss.modal_View}>
                <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
                    <Text style={[appCss.modal_Txt, { paddingTop: 20, }]}>Click On An Article To Read More:</Text>
                    <ScrollView style={styles.news_scrollView}>
                        {News}
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
    news_scrollView: {
        height: 460,
    },
})
