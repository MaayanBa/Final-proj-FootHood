import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import XMLParser from 'react-xml-parser';
import TextTicker from 'react-native-text-ticker'
import { FontAwesome as FootBall } from '@expo/vector-icons';
import AppCss from '../../CSS/AppCss';


export default function News() {
    const [titles, setTitles] = useState([])

    useEffect(() => {
        GetNews();
    }, []);

    const GetNews = () => {
        let title = [];
        fetch('https://www.one.co.il/cat/coop/xml/rss/newsfeed.aspx?c=3')
            .then(res => res.text())
            .then(data => {
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(data);
                // console.log(xml);
                // console.log(xml.getElementsByTagName('title'));
                headers = xml.getElementsByTagName('title')
                headers.map(x => {
                    if (x.value != "ONE") {
                        // console.log(x.value)
                        // console.log("===============")
                        title.push(x.value);
                    }
                })
                setTitles(title)

            })
            .catch(err => console.log(err));
    }

    const printTitles = titles.map((item, index) => {
        return (<Text key={index}>
            {item}⚽
        </Text>
        );
    });

    return (
        <View style={styles.container}>
            {/* {console.log(titles)} */}
            <Text style={[appCss.title, { paddingTop: 20,paddingBottom:20}]}>Football News</Text>
            <TextTicker
                style={{ fontSize: 22, backgroundColor: 'rgba(250, 252, 252, 0.4)' }}
                duration={50000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}
                isRTL={true}
            >
                {printTitles}
            </TextTicker>
        </View>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        alignItems: 'center',
        padding: 40
    },
    title: {
        alignItems: 'center',
        padding: 40,
        color: 'white',
        fontSize: 40,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
});