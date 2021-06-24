// import React, { useContext, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, Dimensions, Modal, Pressable, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
// import AppCss from '../../CSS/AppCss';
// import { ListItem } from 'react-native-elements';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { RadioButton } from 'react-native-paper';
// //import GooglePlacesInput from '../MyTeams/Components/GooglePlacesInput';
// import RangeSelector from 'reactnative-range-selector'
// import CitiesDropDown from '../MyTeams/Components/CitiesDropDown';


// export default function ModalFilterPlayer(props) {
//   const [radius, setRadius] = useState('');
//   const [maleOrFemale, setMaleOrFemale] = useState('male');
//   const [sliderAge, setSliderAge] = useState(null)
//   const [filterItems, setFilterItems] = useState([])
//   const [cityLive, setCityLive] = useState(null);

//   const Filter = () => {
//     props.setOpenModalFilter(false)
//   }

//   const GetCityFromUser = (c) => {
//     setCityLive(c)
//   }


//   useEffect(() => {
//     setFilterItems([])
//     for (let i = 0; i < 5; i++) {
//       let newElement = (
//         <ListItem key={i} bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
//           {
//             reducer(i)
//           }
//         </ListItem>
//       )
//       setFilterItems(oldArray => [...oldArray, newElement]);
//     }
//   }, [])

//   const reducer = (i) => {
//     switch (i) {
//       case 0:
//         return <ListItem.Content style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }} >
//           <CitiesDropDown width={200} ChoosenCity={(city) => GetCityFromUser(city)} city={cityLive} />
//           <ListItem.Title style={[appCss.inputLabel, { alignSelf: 'center' }]}>Location:</ListItem.Title>
//         </ListItem.Content>
//       case 1:
//         return <ListItem.Content style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }} >
//           <DropDownPicker
//             items={[
//               { label: '1 KM', value: '1' }, { label: '2 KM', value: '2' }, { label: '5 KM', value: '5' }, { label: '10 KM', value: '10' }, { label: '20 KM', value: '20' }, { label: '40 KM', value: '40' }, { label: '', value: '' }
//             ]}
//             onChangeItem={item => setRadius(item.value)}
//             placeholder="KM"
//             containerStyle={{ height: 30, width: 90 }}
//           />
//           <ListItem.Title style={[{ marginBottom: 5 }, appCss.inputLabel]}>Radius:</ListItem.Title>
//         </ListItem.Content>
//       case 2:
//         return <ListItem.Content style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between' }} >
//           <TouchableOpacity>
//             <Text style={appCss.inputLabel}>Female</Text>
//             <RadioButton
//               value="female"
//               status={maleOrFemale === 'female' ? 'checked' : 'unchecked'}
//               onPress={() => setMaleOrFemale('female')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={appCss.inputLabel}>Male</Text>
//             <RadioButton
//               value="male"
//               status={maleOrFemale === 'male' ? 'checked' : 'unchecked'}
//               onPress={() => setMaleOrFemale('male')}
//             />
//           </TouchableOpacity>
//           <ListItem.Title style={[{ marginBottom: 15 }, appCss.inputLabel]}>Gender:</ListItem.Title>
//         </ListItem.Content>
//       case 3:
//         return <ListItem.Content style={{ alignItems: 'flex-end' }} >
//           <ListItem.Title style={appCss.inputLabel}>Age Range:</ListItem.Title>
//         </ListItem.Content>
//       case 4:
//         return <ListItem.Content style={{ alignItems: 'flex-end' }} >
//           <ListItem.Title style={appCss.inputLabel}>Avarage Rank Range:</ListItem.Title>
//         </ListItem.Content>
//       default:
//       // alert("NUMBER NOT FOUND");
//     }
//   }

//   return (
//     <Modal animationType="slide" transparent={true} visible={props.openModalFilter}
//       onRequestClose={() => props.setOpenModalFilter(false)}>

//       <View style={styles.centeredView}>
//         <View style={styles.modal_View}>
//           <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../../assets/WallPaperWhite2.png')}>
//             {/* {filterItems} */}
//             <View style={styles.screen}>
//               <View style={{ flex: 1 }}>
//                 <DraggableFlatList
//                   data={data}
//                   renderItem={renderItem}
//                   keyExtractor={(item, index) => index.toString()}
//                   onDragEnd={({ data }) => setData(data)}
//                 />
//               </View>
//             </View>
//             <View style={styles.btnsRow}>
//               <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => Filter()} >
//                 <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Filter</Text>
//               </Pressable>
//               <Pressable style={[styles.Btn, { width: 70 }]} onPress={() => props.setOpenModalFilter(false)} >
//                 <Text style={[{ alignSelf: 'center' }, appCss.inputLabel]}>Close</Text>
//               </Pressable>
//             </View>
//           </ImageBackground>
//         </View>
//       </View>
//     </Modal >

//   )
// }

// const appCss = AppCss;
// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     top: 30
//   },
//   modal_View: {
//     margin: 5,
//     padding: 10,
//     shadowColor: "#D9D9D9",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     height: '65%',
//     borderRadius: 30
//   },
//   btnsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     paddingTop: 10
//   },
//   Btn: {
//     backgroundColor: "#2196F3",
//     borderRadius: 20,
//     padding: 10,
//     alignSelf: "center",
//   },
//   maleOrFemale: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 2
//   },
//     screen: {
//     marginTop: 24,
//     flex: 1,
//   },
//   item: {
//     backgroundColor: 'white',
//     marginTop: 10,
//     padding: 20,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });