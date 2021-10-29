import React from 'react'
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native'
import { Dimensions } from '../constants'

interface TextFieldProps {
    placeholder: string
    isSecure?: boolean
    onTextChange: Function
    isOTP?: boolean,
    keyboardType?: KeyboardTypeOptions
}

const TextField: React.FC<TextFieldProps> = ({
    placeholder,
    isSecure = false,
    onTextChange,
    isOTP = false,
    keyboardType
}) => {

    if(isOTP) {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    maxLength={6}
                    autoCapitalize='none'
                    secureTextEntry={isSecure}
                    onChangeText={text => onTextChange(text)}
                    style={styles.otpTextField}
                    placeholderTextColor='gray'
                    keyboardType={keyboardType}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    autoCapitalize='none'
                    secureTextEntry={isSecure}
                    onChangeText={text => onTextChange(text)}
                    style={styles.textField}
                    placeholderTextColor='gray'
                    keyboardType={keyboardType}
                />
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.width - 50,
        backgroundColor: '#DBDBDB',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    textField: {
        flex: 1,
        width: Dimensions.width - 80,
        height: 50,
        fontSize: 20,
        color: '#000',
    },
    otpTextField: {
        flex: 1,
        width: Dimensions.width - 80,
        height: 50,
        fontSize: 30,
        color: '#000',
        textAlign:'center'
    }
})

export { TextField }
