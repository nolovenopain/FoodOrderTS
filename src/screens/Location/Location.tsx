import React, { useState, useEffect } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import { styles } from './css'
import { goBack, navigate } from '../../navigations/rootNavigations'
import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState, Address, onFetchLocation } from '../../redux';    
import { ButtonWithIcon, ButtonWithTitle, LocationPick, LocationPickMap } from '../../components';
import { Point } from 'react-native-google-places-autocomplete';
import { Dimensions } from '../../constants';

interface LocationProps {
    user: UserState
    onUpdateLocation: Function
    onFetchLocation: Function
}

interface Region {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}

const _Location: React.FC<LocationProps> = (props) => {

    const { user, onUpdateLocation } = props
    const { pickedAddress } = user

    const [isMap, setIsMap] = useState(false)
    const [currentAddress, setCurrentAddress] = useState('Pick a location from Map')
    const [selectedAddress, setSelectedAddress] = useState<Address>()

    const [region, setRegion] = useState<Region>({
        latitude: 21.030653,
        longitude: 105.847130,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0922
    })

    useEffect(() => {
        if(pickedAddress !== undefined) {
            const { address_components } = pickedAddress
            if(Array.isArray(address_components)) {
                setCurrentAddress(pickedAddress.formatted_address)
                address_components.map(e => {
                    let city = ''
                    let country = ''
                    let postalCode = ''
                    if(e.types.filter(item => item === 'postal_code').length > 0) {
                        postalCode = e.short_name
                    }
                    if(e.types.filter(item => item === 'country').length > 0) {
                        country = e.short_name
                    }
                    if(e.types.filter(item => item === 'locality').length > 0) {
                        city = e.short_name
                    }
                    setSelectedAddress({
                        displayAddress: pickedAddress.formatted_address,
                        city,
                        country,
                        postalCode,
                        street: ''
                    })
                })
            }
        }
    }, [])

    // call when pick from auto complete
    const onChangeLocation = (location: Point) => {
        console.log(location);   
        setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0922 
        })     
        setIsMap(true)
    }

    // call when we picked a locaiton from MAP
    const onPickLocationFromMap = (newRegion: Region) => {
        setRegion(newRegion)
        props.onFetchLocation(newRegion.latitude, newRegion.longitude)       
    }

    const onTapConfirmLocation = () => {
        if(selectedAddress && selectedAddress.postalCode !== '') {
            onUpdateLocation(selectedAddress, true)   
            navigate('BottomTabStack', {})
        }
        else {
            Alert.alert('Error', 'Can not find your address')
        }
    }

    const pickLocationView = () => {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: 50,
                    marginLeft: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <ButtonWithIcon
                            icon={require('../../images/back_arrow.png')}
                            onTap={() => navigate('Home', {})}
                            width={40}
                            height={50}
                        />
                        <View style={{
                            display: 'flex',
                            flex: 1,
                            marginRight: 5
                        }}>
                            <LocationPick 
                                onChangeLocation={onChangeLocation}
                                width={40}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.centerMsg}>
                    <Image
                        source={require('../../images/delivery_icon.png')}
                        style={styles.deliveryIcon}
                    />
                    <Text style={styles.addressTitle}>Pick Your Location</Text>
                </View>
            </View>
        )
    }

    const mapView = () => {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ 
                        display: 'flex', 
                        height: 60, 
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: Dimensions.width,
                        marginLeft: 5,
                        paddingLeft: 10
                    }}>
                        <ButtonWithIcon
                            icon={require('../../images/back_arrow.png')}
                            width={40}
                            height={50}
                            onTap={() => goBack()}
                        />
                        <View style={{
                            flex: 1,
                            marginLeft: 20
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: '#656565'
                            }}>
                                Pick your Location from Map
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <LocationPickMap
                        lastLocation={region}
                        onMarkerChanged={onPickLocationFromMap}
                    />
                </View>
                <View style={styles.footer}>
                    <View style={{
                        flex: 1,
                        padding: 10,
                        backgroundColor: 'white'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#545454'
                        }}>
                            Your Current Selected Address
                        </Text>
                        <ButtonWithTitle
                            title='Confirm'
                            onTap={onTapConfirmLocation}
                            width={Dimensions.width - 80}
                            height={50}
                        />
                    </View>
                </View>
            </View>
        )
    }

    // if(isMap) {
    //     return mapView()
    // } else {
    //     return pickLocationView() 
    // }
    return mapView()
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer
})

const Location = connect(mapStateToProps, { onUpdateLocation, onFetchLocation })(_Location)

export { Location }