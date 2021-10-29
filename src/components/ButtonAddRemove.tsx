import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

interface ButtonAddRemoveProps {
    onAdd: Function,
    unit: number,
    onRemove: Function
}

const ButtonAddRemove: React.FC<ButtonAddRemoveProps> = ({
    onAdd,
    unit,
    onRemove
}) => {

    if(unit > 0) {
        return (
            <View style={styles.optionView}>
                <TouchableOpacity 
                    style={styles.btnPlusMinus}
                    onPress={() => onRemove()}
                >
                    <Text style={{ fontSize: 18, color: '#f14b5d' }}>-</Text>
                </TouchableOpacity>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40 }}>
                    <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center', color: '#f14b5d' }}>{unit}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.btnPlusMinus}
                    onPress={() => onAdd()}
                >
                    <Text style={{ fontSize: 18, color: '#f14b5d' }}>+</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={styles.btn}
                onPress={() => onAdd()}
            >
                <Text style={{ fontSize: 18, color: '#FFF' }}>Add</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 40,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#f15b5b'
    },
    optionView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    btnPlusMinus: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f14b5d',
        borderWidth: 0.5,
        borderRadius: 10,
        height: 58,
        width: 38
    }
})

export { ButtonAddRemove }
