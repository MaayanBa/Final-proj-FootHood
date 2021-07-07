import React, { useState, useEffect, useContext } from 'react'
import { Text } from 'react-native';
import { Context as NewsContext } from '../../Contexts/NewsContext'
import TextTicker from 'react-native-text-ticker'


export default function TextTickerRow({navigation}) {
    const { state: { titles } } = useContext(NewsContext)
    const [TITLES, setTITLES] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            shuffle(titles)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => unsubscribe();
    }, [navigation]);

    const shuffle = (array) => {
        var currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        setTITLES(array);
    }

    const printTitles = TITLES.map((item, index) => {
        return (
            <Text key={index}>  {item}  ⚽  </Text>
        );
    });
    return (
        <TextTicker
            style={{ fontSize: 26, backgroundColor: 'rgba(250, 252, 252, 0.4)', marginTop: 10 }}
            duration={120000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}
            isRTL={true}
        >
            {printTitles}
        </TextTicker>
    )
}
