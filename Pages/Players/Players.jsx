import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppCss from '../../CSS/AppCss';
import { Context as AuthContext } from '../../Contexts/AuthContext'

const appCss = AppCss;

const styles = StyleSheet.create({

    mainContent: {
        // //  flex: 1,
        //         // justifyContent: 'space-between',
        //         justifyContent: 'center',
        //         alignItems:'center',


    },
    footer: {
        //justifyContent: 'flex-end',
        //flex: 1,
    },
});

export default function Players() {
    const { state: { token } } = useContext(AuthContext);
    return (
        <View >
            <Text style={[appCss.title, appCss.space]}>Players</Text>
            {/* <View style={styles.mainContent}></View> */}
            <View style={styles.footer}></View>
        </View>
    )
}
