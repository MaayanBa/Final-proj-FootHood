// import React, { useState, useContext } from 'react';
// import { View, Text, Switch, StyleSheet, TouchableHighlight, Image as ImageBall } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import AppCss from '../../CSS/AppCss';
// import { AntDesign } from '@expo/vector-icons';
// import ToggleSwitch from 'toggle-switch-react-native';


// const appCss = AppCss;
// const styles = StyleSheet.create({
//     container: {
//         height: "100%"
//     },
//     header: {
//         alignItems: 'center',
//         padding: 40
//     },
//     title: {
//         alignItems: 'center',
//         padding: 40,
//         color: 'white',
//         fontSize: 40,
//     },
//     mainContent: {
//         flex: 1,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     switchBtn: {
//         justifyContent: 'space-evenly'

//     },

//     changeBtn: {
//         backgroundColor: 'black',
//         padding: 5,
//         borderRadius: 5,
//         width: 200,
//         alignItems: 'center',

//     },
//     ball_img: {
//         margin: 50,
//         height: 110,
//         width: 100,
//         alignSelf: 'center',
//         top: 40
//     },

//     footer: {
//         justifyContent: 'flex-end',
//         flex: 1,
//     },
// });

// export default function Players() {
//     return (



//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.title}>Setting</Text>
//             </View>
//             <View style={styles.mainContent}>
//                 <View>
//                     <TouchableOpacity style={[appCss.btnTouch, { width: '100%' },]} onPress={() => console.log("change personal btn")}>
//                         <Text style={appCss.txtBtnTouch}>Change personal details</Text>
//                     </TouchableOpacity>
//                     <ToggleSwitch
//                         isOn={false}
//                         onColor="green"
//                         offColor="black"
//                         label="notifications"
//                         labelStyle={appCss.txtBtnTouch}
//                         size="large"
//                         onToggle={isOn => console.log("changed to : ", isOn)}
//                     />

//                     <ToggleSwitch
//                         isOn={false}
//                         onColor="green"
//                         offColor="black"
//                         label="location service"
//                         labelStyle={appCss.txtBtnTouch}
//                         size="large"
//                         onToggle={isOn => console.log("changed to : ", isOn)}
//                     />
//                 </View>



//                 <ImageBall source={require('../../assets/ball.png')} style={styles.ball_img} />

//                 <TouchableOpacity style={[appCss.btnTouch, { width: '80%' }]} onPress={() => console.log("logout btn")}>
//                     <Text style={appCss.txtBtnTouch}>Logout</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={[appCss.btnTouch, { width: '80%' }]} onPress={() => console.log("feedback btn")}>
//                     <Text style={appCss.txtBtnTouch}>Send feedback <AntDesign name="questioncircleo" size={24} color="black" /></Text>

//                 </TouchableOpacity>
//             </View>
//             <View style={styles.footer}></View>
//         </View>
//     )
// }