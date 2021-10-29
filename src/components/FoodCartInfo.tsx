import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { ButtonAddRemove } from '.'
import { Dimensions } from '../constants'
import { FoodModel, onUpdateCart } from '../redux'

interface FoodCardInfoProps {
    item: FoodModel,
    onTap: Function,
    onUpdateCart: Function
}

const FoodCardInfo: React.FC<FoodCardInfoProps> = ({ item, onTap, onUpdateCart }) => {

    const didUpdateCart = (unit: number) => {
        item.unit = unit
        onUpdateCart(item)
    }

    const onAdd = () => {
        let unit = isNaN(item.unit) ? 0 : item.unit
        didUpdateCart(unit + 1)
    }

    const onRemove = () => {
        let unit = isNaN(item.unit) ? 0 : item.unit
        didUpdateCart(unit > 0 ? unit - 1 : unit)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onTap(item)} style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <View style={{ display: 'flex', flex: 8, padding: 10, margin: 10, paddingLeft: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: '500' }}>{item.name}</Text>
                    <Text>{item.category}</Text>
                </View>
                <View style={{ display: 'flex', flex: 4, padding: 10, justifyContent: 'space-around', alignItems: 'center', marginRight: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#7C7C7C' }}>${item.price}</Text>
                    <ButtonAddRemove onAdd={onAdd} onRemove={onRemove} unit={item.unit}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#EAEAEA'
    }
})

export { FoodCardInfo }
