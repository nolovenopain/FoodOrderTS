import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Dimensions } from '../constants'
import { FoodModel, Restaurant } from '../redux'

interface RestaurantCardProps {
    item: Restaurant | FoodModel
    onTap: Function,
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ item, onTap }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onTap(item)}
        >
            <Image
                style={{
                    width: Dimensions.width - 20,
                    height: 220,
                    borderRadius: 20,
                    backgroundColor: '#EAEAEA'
                }}
                source={{ uri: item.images[0] }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.width - 20,
        height: 230,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
        borderRadius: 20
    }
})

export { RestaurantCard }
