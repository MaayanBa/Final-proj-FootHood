import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
// import XMLParser from 'react-xml-parser';
import AppCss from '../../CSS/AppCss';
import { ListItem } from 'react-native-elements';
import { Context as NewsContext } from '../../Contexts/NewsContext'



export default function News() {
    const [israelNews, setIsraelNews] = useState(true)
    const { state: { titles, links }, GetNews, } = useContext(NewsContext);

    useEffect(() => {
        //true = israel | false = World
        GetNews(israelNews);
    }, [israelNews]);

    const News = titles.map((t, i) => {
        if (i > 0) {
            return (<ListItem key={i} style={[appCss.playerCardInList, styles.newsItem]} containerStyle={{ backgroundColor: "transparent" }} >
                <TouchableOpacity style={{ flexDirection: 'row-reverse' }} activeOpacity={0.8} onPress={() => Linking.openURL(links[i - 1])} >
                    <ListItem.Content style={{left:150}}>
                        <ListItem.Title>
                            {t}
                        </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content  >
                        <Image source={require('../../assets/News.png')} style={styles.ImageStyle} />
                    </ListItem.Content>
                </TouchableOpacity>
            </ListItem>)
        }
    })

    return (
        <View style={styles.container}>
            {console.log(titles)}
            <Text style={[appCss.title, { paddingTop: 20 }]}>Football News</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={israelNews == true ? [appCss.btnTouch, styles.btnTouch_Extra, { backgroundColor: 'rgba(100,100, 100, 0.8)' }] : [appCss.btnTouch, styles.btnTouch_Extra]} onPress={() => setIsraelNews(true)}>
                    <Text style={appCss.txtBtnTouch}>Israel News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={israelNews == true ? [appCss.btnTouch, styles.btnTouch_Extra] : [appCss.btnTouch, styles.btnTouch_Extra, { backgroundColor: 'rgba(100,100, 100, 0.8)' }]} onPress={() => setIsraelNews(false)}>
                    <Text style={appCss.txtBtnTouch}>World News</Text>
                </TouchableOpacity>
            </View>

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
        zIndex: 999
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
    newsItem: {
        // margin:5,
        backgroundColor: 'rgba(250, 252, 252, 0.4)',
        borderRadius: 20,
    }
});