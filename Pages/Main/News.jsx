import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
// import XMLParser from 'react-xml-parser';
import AppCss from '../../CSS/AppCss';
import { Context as NewsContext } from '../../Contexts/NewsContext'
import * as Linking from 'expo-linking';
import Modal_FullNews from './Modal_FullNews';


export default function News() {
    const [israelNews, setIsraelNews] = useState(true)
    const { state: { titles, links }, GetNews, } = useContext(NewsContext);
    const [modalNewsVisible, setModalNewsVisible] = useState(false);

    useEffect(() => {
        //true = israel | false = World
        GetNews(israelNews);
    }, [israelNews]);

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
        <View style={styles.container}>
            {/* {console.log(titles)} */}
            <Text style={[appCss.title, { paddingTop: 20 }]}>Football News</Text>
            {modalNewsVisible && <Modal_FullNews modalNewsVisible={modalNewsVisible} setModalNewsVisible={() => setModalNewsVisible(!modalNewsVisible)} News={News}/>}
            <View style={styles.buttons}>
                <TouchableOpacity style={israelNews == true ? [appCss.btnTouch, styles.btnTouch_Extra, { backgroundColor: 'rgba(100,100, 100, 0.8)' }] : [appCss.btnTouch, styles.btnTouch_Extra]} onPress={() => setIsraelNews(true)}>
                    <Text style={appCss.txtBtnTouch}>Israel News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={israelNews == true ? [appCss.btnTouch, styles.btnTouch_Extra] : [appCss.btnTouch, styles.btnTouch_Extra, { backgroundColor: 'rgba(100,100, 100, 0.8)' }]} onPress={() => setIsraelNews(false)}>
                    <Text style={appCss.txtBtnTouch}>World News</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[appCss.btnTouch, { width: '40%',marginTop:0 }]} onPress={() => setModalNewsVisible(true)}>
                <Text style={appCss.txtBtnTouch}>Read More</Text>
            </TouchableOpacity>

            <View style={styles.newsPart}>
                <ScrollView style={styles.news_scrollView}>
                    {News}
                </ScrollView>
            </View>
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        // marginBottom: 30
    },

    btnTouch_Extra: {
        width: '40%',
        marginTop: 10,
        marginBottom: 10
    },
    ImageStyle: {
        height: 22,
        width: 22,
        alignSelf: 'center',
        margin: 10
    },
    newsPart: {
        // backgroundColor: 'rgba(250, 252, 252, 0.4)',
        // justifyContent: 'space-around',
        // borderRadius: 30,
        alignSelf: 'center',
        width: Dimensions.get('window').width - 60,
        height: 290,
        // margin: 10,
        // padding:10,
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
});