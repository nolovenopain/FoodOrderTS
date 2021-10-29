import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

interface ButtonWithTitleProps {
    onTap: Function
    width: number
    height: number
    title: string
    isNoBg?: boolean
    disable?: boolean
}

const ButtonWithTitle: React.FC<ButtonWithTitleProps> = ({
    onTap,
    width,
    height,
    title,
    isNoBg = false,
    disable = false
}) => {

    if(isNoBg) {
        return (
            <TouchableOpacity 
                style={[styles.btn, { width, height, backgroundColor: 'transparent' }]}
                onPress={() => onTap()}
                disabled={disable}
            >
                <Text style={{ color: disable ? '#6F6F6F' : '#3980D9', fontSize: 18 }}>{title}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity 
                style={[styles.btn, { width, height }]}
                onPress={() => onTap()}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>{title}</Text>
            </TouchableOpacity>
        )
    } 
}

const styles = StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
        backgroundColor: '#f14b5d',
        marginTop: 20,
        borderRadius: 30,
        alignSelf: 'center'
    }
})

export { ButtonWithTitle }
