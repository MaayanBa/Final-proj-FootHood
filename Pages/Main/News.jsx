import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import XMLParser from 'react-xml-parser';
import TextTicker from 'react-native-text-ticker'
import { FontAwesome as FootBall } from '@expo/vector-icons';
import AppCss from '../../CSS/AppCss';
import Modal_FullNews from './Modal_FullNews';


export default function News() {
    const [titles, setTitles] = useState([])
    const [links, setLinks] = useState([])
    const [israelNews, setIsraelNews] = useState(true)
    const [modalNewsVisible, setModalNewsVisible] = useState(false);

    useEffect(() => {
        GetNews();
    }, [israelNews]);

    const GetNews = () => {
        let title = [];
        let linkArr = [];
        fetch(israelNews == true ? 'https://www.one.co.il/cat/coop/xml/rss/newsfeed.aspx?c=1' : 'https://www.one.co.il/cat/coop/xml/rss/newsfeed.aspx?c=3')
            .then(res => res.text())
            .then(data => {
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(data);
                //console.log(xml.getElementsByTagName('link'));
                //console.log(xml.getElementsByTagName('title'));
                var headers = xml.getElementsByTagName('title')
                var link = xml.getElementsByTagName('link')
                headers.map(x => {
                    if (x.value != "ONE") {
                        // console.log(x.value)
                        // console.log("===============")
                        title.push(x.value);
                    }
                })
                setTitles(title)

                link.map(x => {
                    if (x.value !== "https://www.ONE.co.il") {
                        // console.log(x.value)
                        // console.log("===============")
                        if (x.value !== "https://images.one.co.il//images/one/logosmall.jpg") {
                            linkArr.push(x.value);
                        }
                    }
                })
                console.log(linkArr)
                setLinks(linkArr)
            })
            .catch(err => console.log(err));
    }

    const printTitles = titles.map((item, index) => {
        return (
            <Text key={index}>  {item}  ⚽  </Text>
        );
    });

    return (
        <View style={styles.container}>
            {/* {console.log(links)} */}
            <Text style={[appCss.title, { paddingTop: 20 }]}>Football News</Text>
            {modalNewsVisible && <Modal_FullNews modalNewsVisible={modalNewsVisible} setModalNewsVisible={() => setModalNewsVisible(!modalNewsVisible)} titles={titles} links={links}/>}
            <View style={styles.buttons}>
                <TouchableOpacity style={israelNews==true?[appCss.btnTouch, { width: '40%', backgroundColor: 'rgba(100,100, 100, 0.8)'}]:[appCss.btnTouch, { width: '40%', }]} onPress={() => setIsraelNews(true)}>
                    <Text style={appCss.txtBtnTouch}>Israel News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={israelNews==true?[appCss.btnTouch, { width: '40%', }]:[appCss.btnTouch, { width: '40%', backgroundColor: 'rgba(100,100, 100, 0.8)'}]} onPress={() => setIsraelNews(false)}>
                    <Text style={appCss.txtBtnTouch}>World News</Text>
                </TouchableOpacity>
            </View>


            <TextTicker
                style={{ fontSize: 26, backgroundColor: 'rgba(250, 252, 252, 0.4)' }}
                duration={120000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}
                isRTL={true}
            >
                {printTitles}
            </TextTicker>
            <TouchableOpacity style={[appCss.btnTouch, { width: '40%', }]} onPress={() => setModalNewsVisible(true)}>
                    <Text style={appCss.txtBtnTouch}>Read More</Text>
                </TouchableOpacity>
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 30
    },
});