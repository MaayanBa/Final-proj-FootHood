import React, { useState } from 'react'
import {
    StyleSheet, TouchableOpacity, View, Text,
 Modal as ModalRulsAndLaws, Pressable,ImageBackground
} from 'react-native';


import AppCss from '../../../CSS/AppCss';

const appCss = AppCss;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 70
      },
    //   modal_View: {
    //     margin: 20,
    //     backgroundColor: "white",
    //     borderRadius: 20,
    //     padding: 35,
    //     paddingBottom: 20,
    //     alignItems: "center",
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5,
    
    //   },
      modal_View: {
        margin: 20,
        padding: 10,
        shadowColor: "#D9D9D9",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 20,
        alignItems:'center',
        height:'70%',
        borderRadius: 30

    },
      modal_Txt: {
        marginBottom: 15,
        marginTop:50,
        textAlign: "center"
      },
      modal_Closebtn: {
        backgroundColor: "#2196F3",
        marginTop: 10,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        alignSelf: "center",
    },
      options_Btn: {
        alignSelf: 'center',
        elevation: 5,
        backgroundColor: "#D9D9D9",
        opacity: 0.8,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginTop: 10,
        width: '90%', 
      },
})

export default function Modal_RulesAndLaws({team}) {
    const [rulesModalVisible, setRuleModalVisible] = useState(false);

    const modal_RulsAndLaws = <ModalRulsAndLaws animationType="slide"
        transparent={true} visible={rulesModalVisible}
        onRequestClose={() => setRuleModalVisible(!rulesModalVisible)}
    >
        <View style={styles.centeredView}>
            <View style={styles.modal_View}>
            <ImageBackground style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 50}} source={require('../../../assets/WallPaperWhite2.png')}>
                <Text style={styles.modal_Txt}>{team.RulesAndLaws}</Text>
                <Pressable style={styles.modal_Closebtn} onPress={() => setRuleModalVisible(!rulesModalVisible)} >
                    <Text style={appCss.inputLabel}>Close</Text>
                </Pressable>
                </ImageBackground>
            </View>
        </View>
    </ModalRulsAndLaws>

    return (
        <View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setRuleModalVisible(true)} style={styles.options_Btn}>
                <Text style={[appCss.txtBtnTouch, { fontSize: 16 }]}>Rules And Laws</Text>
                
            </TouchableOpacity>
            {modal_RulsAndLaws}
        </View>
    )

}
