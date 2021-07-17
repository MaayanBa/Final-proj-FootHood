import React, { useContext } from 'react'
import { View ,StyleSheet} from  'react-native';
import { ListItem } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';

export default function EquipmentsRadioBtns(props) {
    const index = props.index;
    const keyTeam = props.keyTeam;
    const { state: { equipments } } = useContext(EquipmentContext);

    return (
        <View>
            {equipments.map((e, i) => (
                <ListItem key={i} containerStyle={{ backgroundColor: "transparent" }} >
                    <ListItem.Content style={{ alignItems: 'flex-end' }} >
                        <ListItem.Title style={styles.label}>{e.EquipmentName}</ListItem.Title>
                    </ListItem.Content>
                    <View>
                        <RadioButton
                            value={i}
                            status={props.choosenEquipment === i ? 'checked' : 'unchecked'}
                            onPress={() => props.setChoosenEquipment(i)}
                        />
                    </View>
                </ListItem>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        color: "white",
    },
})