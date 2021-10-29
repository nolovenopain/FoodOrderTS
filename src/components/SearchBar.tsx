import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'

interface SearchBarProps {
    onEndEditing?: any | undefined,
    didTouch?: any | undefined,
    autoFocus?: boolean | undefined,
    onTextChange: Function
}

const SearchBar: React.FC<SearchBarProps> = ({
    onEndEditing,
    didTouch,
    autoFocus = false,
    onTextChange
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Image
                    style={{ width: 25, height: 25 }}
                    source={require('../images/search.png')}
                />
                <TextInput
                    style={{ 
                        marginLeft: 5, 
                        flex: 9, 
                        display: 'flex', 
                        fontSize: 20, 
                        height: 42 
                    }}
                    placeholder='Search Foods'
                    autoFocus={autoFocus}
                    onTouchStart={didTouch}
                    onChangeText={text => onTextChange(text)}
                    onEndEditing={onEndEditing}
                    placeholderTextColor={'gray'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    searchBar: {
        display: 'flex',
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#ededed',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        borderRadius: 20
    }
})

export { SearchBar }
