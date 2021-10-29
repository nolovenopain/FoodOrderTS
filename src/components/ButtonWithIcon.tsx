import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'

interface ButtonWithIconProps {
    onTap: Function,
    width: number,
    height: number,
    icon: ImageSourcePropType
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
    onTap,
    width,
    height,
    icon
}) => {
    return (
        <TouchableOpacity
            style={[styles.btn, { width, height }]}
            onPress={() => onTap()}
        >
            <Image
                style={{
                    width: width - 2,
                    height: height - 2
                }}
                source={icon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export { ButtonWithIcon }
