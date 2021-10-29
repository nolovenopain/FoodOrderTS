import React from 'react'
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Category } from '../redux'

interface CategoryCardProps {
    item: Category
    onTap: Function
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onTap }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onTap(item)}
        >
            <Image
                source={{ uri: item.icon }}
                style={{
                    width: 120,
                    height: 120,
                    borderRadius: 20,
                    backgroundColor: '#EAEAEA'
                }}
            />
            <Text
                style={{
                    fontSize: 14,
                    marginTop: 10,
                    color: '#858585'
                }}
            >
                {item.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 140,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 5
    }
})

export { CategoryCard }
