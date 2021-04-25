import React, { useContext } from 'react';
import { View} from 'react-native';
import FirstGamePage from './Components/FirstGamePage';
import FinalGamePage from './Components/FinalGamePage';


export default function GamePage() {
const gameDate=new Date("2021-04-29T20:00:00Z"); //Need to enter here game date
const oneDay = 60 * 60 * 24 * 1000 //This give us 24 hours parmeter
  return (
    <View>
      <View>
        {(new Date()<=gameDate-oneDay) ? <FirstGamePage /> : <FinalGamePage />}
      </View>
    </View>
  )
}
