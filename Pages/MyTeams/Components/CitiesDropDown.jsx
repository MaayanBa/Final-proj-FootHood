import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AppCss from '../../../CSS/AppCss';
import { Context as CitiesContext } from '../../../Contexts/CitiesContext';


const appCss = AppCss;
const styles = StyleSheet.create({
    dropDown: {
        alignItems: 'center',
        padding: 20,
    }
})

export default function CitiesDropDown(props) {
    const { state: { cities } } = useContext(CitiesContext);
    const [city, setCity] = useState(null)
    const [citiesNames, setCitiesNames] = useState([])




    useEffect(() => {
        let arrDemo = []
        let ctr = 0;
        //cities.results.map(c=> setCitiesNames(...citiesNames, c.name));     
        cities.results.map(c => arrDemo.push({ label: `${c.name}`, value: `${c.name}` }))
        setCitiesNames(arrDemo);
    }, [])
    useEffect(() => {
        props.ChoosenCity(city);
    }, [city])

    return (
        <View style={styles.dropDown}>
            {/* {console.log(citiesNames)} */}
            <DropDownPicker
                items={citiesNames}
                value={city}
                searchable={true}
                defaultValue={props.city}
                containerStyle={{ height: 43, width: 315 }}
                placeholder="Choose City Below"
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-end',
                }}
                dropDownMaxHeight={500}
                dropDownStyle={{ backgroundColor: '#dfdfdf' }}
                onChangeItem={item => setCity(item.label)}
            />
        </View>
    )
}
