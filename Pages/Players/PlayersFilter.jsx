// import React, { useContext, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
// import AppCss from '../../CSS/AppCss';
// import { RadioButton } from 'react-native-paper';
// import DraggableFlatList from 'react-native-draggable-flatlist';
// import Modal_LocationMap from '../MyTeams/Components/Modal_LocationMap';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';

// export default function PlayersFilter(props) {
//     const [radius, setRadius] = useState('');
//     const [maleOrFemale, setMaleOrFemale] = useState('male');
//     const [filterItems, setFilterItems] = useState([])
//     const [itemsRanking, setItemsRanking] = useState([])
//     const [cityLive, setCityLive] = useState(null);
//     const [ageValues, setAgeValues] = useState([18, 100])
//     const [rankValues, setRankValues] = useState([0, 100])
//     const [modalVisible, setModalVisible] = useState(false);
//     const [gameLocation, setGameLocation] = useState('');
//     const [locationCord, setLocationCord] = useState({
//         latitude: 0,
//         longitude: 0,
//         latitudeDelta: 0,
//         longitudeDelta: 0,
//     });
//     const getLocation = (loc) => {
//         setGameLocation(loc);
//     }
//     const getLocationCord = (region) => {
//         setLocationCord(region);
//     }

//     const Filter = () => {
//         var minAge = ageValues[0];
//         var maxAge = ageValues[1];
//         var minRank = rankValues[0];
//         var maxRank = rankValues[1];
//         var gender = maleOrFemale;
//         var gameLocName = gameLocation;
//         var gameLoc = locationCord;
//         if (parseInt(radius) <= 40 && parseInt(radius) > 0) { var distance = parseInt(radius); }
//         else if (radius == '') { var distance = 0 }
//         else { alert("Radius Should only be numbers between 1-40") }
//         var city = cityLive;
//         // console.log(minAge,maxAge,minRank,maxRank,gender,distance,city)
//         // console.log(gameLocName)
//         //props.navigation.goBack();
//     }
//     useEffect(() => {
//         setFilterItems([])
//         for (let i = 0; i < 5; i++) {
//             let newElement = (
//                 <View key={i}>
//                     {
//                         reducer(i)
//                     }
//                 </View>
//             )
//             setFilterItems(oldArray => [...oldArray, newElement]);
//             setItemsRanking(old => [...old, { key: newElement.key, rank: i }])
//         }
//     }, [ageValues, rankValues, maleOrFemale,gameLocation])

//     const renderItem = ({ item, index, drag, isActive }) => {
//         const rank = itemsRanking.find(i => i.key === item.key).rank
//         return (<View style={[{ backgroundColor: isActive ? "#8c8a89" : "white" }, styles.item]}>
//             <TouchableOpacity style={{ backgroundColor: isActive ? "#8c8a89" : "white" }} onLongPress={drag}>
//                 {/* <Text>{rank}</Text> */}
//                 {/* {console.log(itemsRanking)} */}
//                 {item}
//             </TouchableOpacity>
//         </View>)
//     };

//     const reducer = (i) => {
//         switch (i) {
//             case 0:
//                 return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 0 }} >
//                     {/* <CitiesDropDown width={200} ChoosenCity={(city) => GetCityFromUser(city)} city={cityLive} /> */}
//                     <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => setModalVisible(true)} >
//                         <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Map</Text>
//                     </Pressable>
//                     <Text style={{ alignSelf: 'center' }}>Location: {gameLocation!=''?gameLocation:null}</Text>
//                 </View>

//             case 1:
//                 return <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', zIndex: 1 }} >
//                     <TextInput style={appCss.inputBox} onChangeText={text => setRadius(text)} placeholder="KM" />
//                     <Text style={{ alignSelf: 'center' }}>Radius: {radius!=''?radius + " KM":null}</Text>
//                 </View>

//             case 2:
//                 return <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }} >
//                     <TouchableOpacity>
//                         <Text>Female</Text>
//                         <RadioButton
//                             value="female"
//                             status={maleOrFemale === 'female' ? 'checked' : 'unchecked'}
//                             onPress={() => setMaleOrFemale('female')}
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <Text>Male</Text>
//                         <RadioButton
//                             value="male"
//                             status={maleOrFemale === 'male' ? 'checked' : 'unchecked'}
//                             onPress={() => setMaleOrFemale('male')}
//                         />
//                     </TouchableOpacity>
//                     <Text style={{ alignSelf: 'center' }}>Gender:</Text>
//                 </View>
//             case 3:
//                 return <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-evenly' }} >
//                     <MultiSlider
//                         values={[ageValues[0], ageValues[1]]}
//                         sliderLength={120}
//                         onValuesChange={AgeValuesChange}
//                         min={18}
//                         max={100}
//                         step={1}
//                     />
//                     <Text style={{ alignSelf: 'center', paddingRight: 40 }}>Age Range: {ageValues[0]}-{ageValues[1]}</Text>
//                 </View>
//             case 4:
//                 return <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-evenly' }} >
//                     <MultiSlider
//                         values={[rankValues[0], rankValues[1]]}
//                         sliderLength={130}
//                         onValuesChange={RankValuesChange}
//                         max={100}
//                         min={18}
//                         step={5}
//                     />
//                     <Text style={{ alignSelf: 'center', paddingRight: 40 }}>Rank Range: {rankValues[0]}-{rankValues[1]}</Text>
//                 </View>
//             default:
//             // alert("NUMBER NOT FOUND");
//         }
//     }

//     const AgeValuesChange = (values) => {
//         setAgeValues(values)
//         // console.log(ageValues)
//     }

//     const RankValuesChange = (values) => {
//         setRankValues(values)
//         // console.log(rankValues)
//     }

//     return (

//         <SafeAreaView>
//             <ScrollView>
//                 <View>
//                     <Text style={[appCss.title, appCss.space]}>Filter Players</Text>
//                     <Text style={[appCss.inputLabel, { paddingLeft: 10, paddingTop: 10 }]}>Insert Details Then Drag {'&'} Drop for Re-Ordering</Text>
//                     <View style={styles.screen}>
//                         <View style={{ flex: 1 }}>
//                             <DraggableFlatList
//                                 data={filterItems}
//                                 renderItem={renderItem}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 onDragEnd={({ data, from, to }) => {
//                                     setFilterItems(data)
//                                     const bottomTop = from > to
//                                     setItemsRanking(old => old.map(({ rank, key }) => {
//                                         if (rank === from) {
//                                             rank = to
//                                         } else if (bottomTop) {
//                                             if (rank < from && rank >= to) {
//                                                 rank++
//                                             }
//                                         } else {
//                                             if (rank > from && rank <= to) {
//                                                 rank--
//                                             }
//                                         }
//                                         return { rank, key }
//                                     }))
//                                 }}
//                             />
//                         </View>
//                     </View>
//                     <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => Filter()} >
//                         <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Filter</Text>
//                     </Pressable>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

// const appCss = AppCss;
// const styles = StyleSheet.create({
//     Btn: {
//         backgroundColor: "#2196F3",
//         borderRadius: 20,
//         padding: 10,
//         marginTop: 5,
//         alignSelf: "center",
//     },
//     maleOrFemale: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         padding: 2
//     },
//     screen: {
//         marginTop: 24,
//         flex: 1,
//     },
//     item: {
//         marginTop: 10,
//         padding: 15,
//         marginHorizontal: 10,
//         borderRadius: 10,
//     },
// });