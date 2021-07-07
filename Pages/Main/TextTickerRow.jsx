import React,{ useContext} from 'react'
import { Text } from 'react-native';
import { Context as NewsContext } from '../../Contexts/NewsContext'
import TextTicker from 'react-native-text-ticker'


export default function TextTickerRow() {
    const { state: { titles } } = useContext(NewsContext)

    const printTitles = titles.map((item, index) => {
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
