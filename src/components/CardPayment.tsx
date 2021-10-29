import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { ButtonWithTitle } from '.'
import { Dimensions } from '../constants'

interface CardPaymentProps {
    
}

const CardPayment: React.FC<CardPaymentProps> = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{
                    display: 'flex',
                    height: 60,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 4,
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                    }}>
                        Make Payment
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.creditCard}>
                    
                </View>
                <ButtonWithTitle
                    title='Pay'
                    onTap={() => {}}
                    width={Dimensions.width - 40}
                    height={50}
                />
                <ButtonWithTitle
                    title='Cancel Payment'
                    onTap={() => {}}
                    width={Dimensions.width - 40}
                    height={50}
                />
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)',
    },
    navigation: {
        flex: 2,
        marginTop: 43
    },
    body: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1
    },
    creditCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        padding: 12,
        borderRadius: 20,
        marginTop: 20, 
        marginBottom: 50,
        borderColor: '#D3D3D3',
        borderWidth: 5,
        width: '100%',
        height: 300
    }
})

export { CardPayment }
