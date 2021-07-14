import React, { useState } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text, ScrollView,
    Modal as ModalAlert, Pressable, ImageBackground
} from 'react-native';
import AppCss from '../CSS/AppCss';

export default function Modal_Alert(props) {

    return (
        <ModalAlert animationType="slide"
            transparent={true} visible={props.alertModalVisible} onRequestClose={() => props.setAlertModalVisible()}>
            <View style={styles.centeredView}>
                <View style={styles.modal_View}>
                    <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50 }} source={require('../assets/WallPaperWhite2.png')}>
                    <Text style={[appCss.modal_Txt, { paddingTop: 35,color:'white',fontSize:30 }]}>Alert !</Text>
                        <Text style={styles.modal_Txt}>
                            {props.text}
                        </Text>
                        <Pressable style={styles.modal_Closebtn} onPress={() => props.setAlertModalVisible()}            >
                            <Text style={appCss.inputLabel}>Close</Text>
                        </Pressable>
                    </ImageBackground>
                </View>
            </View>
        </ModalAlert>
    )
}

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70,
    },
    modal_View: {
        margin: 20,
        padding: 10,
        shadowColor: "#D9D9D9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems: 'center',
        height: '42%',
        borderRadius: 30,
        elevation: 30,
        borderRadius: 30
    },
    modal_Txt: {
        padding: 20,
        fontSize:20,
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: "bold",
        color:'white'
    },
    modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 20,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        alignSelf: "center",
    },
})

