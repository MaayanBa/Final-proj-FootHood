import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Modal, Pressable, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { ListItem } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal_LocationMap from '../MyTeams/Components/Modal_LocationMap';


export default function ModalFilterPlayer(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [radius, setRadius] = useState('');
    const [maleOrFemale, setMaleOrFemale] = useState('male');
    const [cityLive, setCityLive] = useState(null);
    const [rankValues, setRankValues] = useState([0, 100])
    const [ageValues, setAgeValues] = useState([18, 100])
    const [gameLocation, setGameLocation] = useState('');
    const [locationCord, setLocationCord] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    const getLocation = (loc) => {
        setGameLocation(loc);
    }
    const getLocationCord = (region) => {
        setLocationCord(region);
    }

    const AgeValuesChange = (values) => {
        setAgeValues(values)
    }

    const RankValuesChange = (values) => {
        setRankValues(values)
    }

    const Filter = () => {
        var minAge = ageValues[0];
        var maxAge = ageValues[1];
        var minRank = rankValues[0];
        var maxRank = rankValues[1];
        var gender = maleOrFemale;
        var gameLocName = gameLocation;
        var gameLoc = locationCord;
        if (parseInt(radius) <= 40 && parseInt(radius) > 0) { var distance = parseInt(radius); }
        else if (radius == '') { var distance = 0 }
        else { alert("Radius Should only be numbers between 1-40") }
        var city = cityLive;
        console.log(minAge,maxAge,minRank,maxRank,gender,distance,gameLoc)
        // console.log(gameLocName)
        // props.setOpenModalFilter(false)
    }

    return (
        <Modal animationType="slide" transparent={true} visible={props.openModalFilter}
            onRequestClose={() => props.setOpenModalFilter(false)}>
            
            <View style={styles.centeredView}>
                <View style={styles.modal_View}>
            
                    <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
                        <View style={{ marginTop: 30 }}>
                            <Text style={[{ alignSelf: 'center', paddingBottom: 10 }, appCss.inputLabel]}>Filter Search:</Text>
                            <ListItem style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                                <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => setModalVisible(true)} >
                                    <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Map</Text>
                                </Pressable>
                                <ListItem.Content style={{ alignItems: 'flex-end' }} >
                                    <ListItem.Title>Location:</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            {modalVisible && <Modal_LocationMap modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} location={(loc) => getLocation(loc)} locationCord={(data) => getLocationCord(data)}/>}

                            <ListItem style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                                <TextInput style={appCss.inputBox} onChangeText={text => setRadius(text)} placeholder="KM" />
                                <ListItem.Content style={{ alignItems: 'flex-end' }} >
                                    <ListItem.Title>Radius:</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            <ListItem style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                                <TouchableOpacity>
                                    <Text>Female</Text>
                                    <RadioButton
                                        value="female"
                                        status={maleOrFemale === 'female' ? 'checked' : 'unchecked'}
                                        onPress={() => setMaleOrFemale('female')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>Male</Text>
                                    <RadioButton
                                        value="male"
                                        status={maleOrFemale === 'male' ? 'checked' : 'unchecked'}
                                        onPress={() => setMaleOrFemale('male')}
                                    />
                                </TouchableOpacity>
                                <ListItem.Content style={{ alignItems: 'flex-end' }} >
                                    <ListItem.Title>Gender:</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            <ListItem style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                                <MultiSlider
                                    values={[ageValues[0], ageValues[1]]}
                                    sliderLength={120}
                                    onValuesChange={AgeValuesChange}
                                    min={18}
                                    max={100}
                                    step={1}
                                />
                                <ListItem.Content style={{ alignItems: 'flex-end' }} >
                                    <ListItem.Title>Age Range: {ageValues[0]}-{ageValues[1]}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            <ListItem style={appCss.playerCardInList} containerStyle={{ backgroundColor: "transparent" }}>
                                <MultiSlider
                                    values={[rankValues[0], rankValues[1]]}
                                    sliderLength={120}
                                    onValuesChange={RankValuesChange}
                                    max={100}
                                    min={18}
                                    step={1}
                                />
                                <ListItem.Content style={{ alignItems: 'flex-end' }} >
                                    <ListItem.Title>Rank Range: {rankValues[0]}-{rankValues[1]}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            <View style={styles.btnsRow}>
                                <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => props.setOpenModalFilter(false)} >
                                    <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Close</Text>
                                </Pressable>
                                <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => Filter()} >
                                    <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Filter</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </Modal >

    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    modal_View: {
        margin: 5,
        padding: 10,
        shadowColor: "#D9D9D9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        height: '80%',
        borderRadius: 30
    },
    btnsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10
    },
    Btn: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
    },
    maleOrFemale: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 2
    },
});