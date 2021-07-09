import React, { useState, useEffect,useContext } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text, TextInput,
    Modal, Dimensions, Pressable, ImageBackground, ScrollView,Image
} from 'react-native';
import AppCss from '../../CSS/AppCss';
import { ListItem } from 'react-native-elements';
import * as Linking from 'expo-linking';
import { Context as NewsContext } from '../../Contexts/NewsContext'


export default function Modal_FullNews(props) {
    const { state: { titles, links }, GetNews, } = useContext(NewsContext);

    const News = titles.map((t, i) => {
        if (i > 0) {
            return (<View key={i} style={[appCss.playerCardInList, styles.newsItem]}>
                <TouchableOpacity key={i} style={styles.newsCard} activeOpacity={0.8} onPress={() => Linking.openURL(links[i - 1])} >
                    <Text style={{ alignSelf: 'center' }}>{t}</Text>
                    <Image source={require('../../assets/News.png')} style={styles.ImageStyle} />
                </TouchableOpacity>
            </View>
            )
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    news_scrollView: {
        height: 460,
    },ImageStyle: {
        height: 22,
        width: 22,
        alignSelf: 'center',
        margin: 10
    },
    newsCard: { flexDirection: 'row-reverse', paddingHorizontal: 10 },
    newsItem: {
        // margin:5,
        backgroundColor: 'rgba(250, 252, 252, 0.4)',
        borderRadius: 20,
        height: 60,
        padding: 10,
        alignItems: 'center'
    }

})