import React from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Dimensions } from '../constants'
import { OfferModel } from '../redux'

interface OfferCardProps {
    item: OfferModel
    onTapApply: Function
    onTapRemove: Function
    isApplied: boolean
}

const OfferCard: React.FC<OfferCardProps> = ({ item, onTapApply, onTapRemove, isApplied }) => {
    return (
        <View style={styles.container}>
            <Image
               source={{ uri: item.images[0] }}
               style={styles.image} 
            />
            <View style={{ 
                display: 'flex', 
                flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-around' 
            }}>
                <View style={{ display: 'flex', flex: 7.5, padding: 10 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '700'
                    }}>
                        {item.title}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                        {item.description}
                    </Text>
                </View>
                <View style={{ display: 'flex', flex: 4.5, padding: 10 }}>
                    {isApplied ?
                        <TouchableOpacity 
                            style={[styles.applyPromo, { backgroundColor: '#FF4673' }]}
                            onPress={() => onTapRemove(item)}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#FFF'
                            }}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity 
                            style={styles.applyPromo}
                            onPress={() => onTapApply(item)}
                        >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#FFF'
                            }}>
                                Apply
                            </Text>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: '600',
                                color: '#FFF'
                            }}>
                                {' ' + item.promoCode}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#EFCA5F',
        height: 270,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        flexDirection: 'column'
    },
    image: {
        width: Dimensions.width - 20,
        height: 200,
        borderRadius: 20,
        backgroundColor: '#EAEAEA'
    },
    applyPromo: {
        flexDirection: 'row',
        backgroundColor: '#8FC777',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})

export { OfferCard }
