import React, {useContext} from 'react';
import { View, Text , StyleSheet,Button} from 'react-native';
import {Context as AuthContext} from '../../Contexts/AuthContext';
import {Context as TeamContext} from '../../Contexts/TeamContext';

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

export default function Timer() {
    const {state,signOut } = useContext(AuthContext);
    const {clearState } = useContext(TeamContext);

    const showToken = () =>{
        console.log(state.token)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Timer</Text>
                <Button title="LogOut - Tempeorery" onPress={signOut}/>
                <Button title="showToken - authContext" onPress={()=>showToken()}/>
                <Button title="clearState - teamContext" onPress={clearState}/>
            </View>
            <View style={styles.mainContent}></View>
            <View style={styles.footer}></View>
        </View>
    )
}