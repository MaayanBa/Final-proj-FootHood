import React from 'react'
import { View, Text , StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        alignItems: 'center',
        padding: 40
    },
    title: {
        alignItems: 'center',
        padding: 40,
        color: 'white',
        fontSize: 40,
    },
    mainContent: {
        flex:1,
        justifyContent: 'space-between',
        alignItems:'center',
    },
    footer: {
        justifyContent: 'flex-end',
        flex:1,
    },
});

export default function Main() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Main</Text>
            </View>
            <View style={styles.mainContent}></View>
            <View style={styles.footer}></View>
        </View>
    )
}
