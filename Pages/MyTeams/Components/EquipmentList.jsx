import React, { useContext } from 'react'
import { View, Text } from 'react-native';
import { Context as EquipmentContext } from '../../../Contexts/EquipmentContext';
import { Context as PlayerContext } from '../../../Contexts/PlayerContext';
import { Context as GameContext } from '../../../Contexts/GameContext';

export default function EquipmentList() {
    const { state: { gameEquipments }, } = useContext(EquipmentContext);
    const { state: { playersPerGame } } = useContext(GameContext);
    const { state: { players } } = useContext(PlayerContext)

    return (
        <View>
            <Text></Text>
            {gameEquipments == "No items were assigned yet" ?
                <Text>There are no equipments for this game</Text>
                :
                gameEquipments.map((g, key) => {
                    let player = playersPerGame.find(x => x.Email == g.EmailPlayer);
                    if (player !== undefined) {
                        return <View key={key}>
                            <Text>
                                {g.BringItems + "   -   " + player.FirstName + " " + player.LastName}
                            </Text>
                        </View>
                    }
                })}
        </View>
    )
}
