import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Dimensions } from '../constants'

interface LocationPickProps {
    onChangeLocation: Function
    width: number
}

const LocationPick: React.FC<LocationPickProps> = ({
    onChangeLocation,
    width
}) => {
    return (
        <View style={[styles.container, { width: Dimensions.width - width - 30, marginLeft: 10 }]}>
            <GooglePlacesAutocomplete
                minLength={4}
                placeholder='Search Your Address'
                fetchDetails={true}
                onPress={(data, details = null) => { console.log(data);            
                    if(details?.geometry) {
                        onChangeLocation(details.geometry.location)
                    }
                }}
                onFail={error => console.log(error)}
                query={{
                    key: 'AIzaSyBgSJ6yiwi7b2mpGxyLq_4i72OWvn3oS8w',
                    language: 'en',
                }}
                debounce={300}
                textInputProps={{ placeholderTextColor: 'gray' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display : 'flex',
    }
})

export { LocationPick }
