import React from 'react'
import { View, Text } from 'react-native'

export default function EquipmentsBoxs() {
    return (
        <View style={styles.checkBox_View}>
            <Text style={appCss.inputLabel}>Equipment List:</Text>
            {/* {itemBoxesOld} */}
            {renderCB && itemBoxes()}
        </View>
    )
}
