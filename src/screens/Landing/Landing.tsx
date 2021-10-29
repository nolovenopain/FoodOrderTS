import React, { useState, useEffect } from 'react'
import { View, Text, Image, Alert } from 'react-native'
import { styles } from './css'
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from '../../utils/helper';
import Config from 'react-native-config'
import { navigate } from '../../navigations/rootNavigations'
import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState } from '../../redux';    
import LocalStorage from '../../utils/localStorage';

interface LandingProps {
    user: UserState,
    onUpdateLocation: Function
}

const _Landing: React.FC<LandingProps> = (props) => {

    const { user, onUpdateLocation } = props
    const { location } = props.user

    const [highAccuracy, setHighAccuracy] = useState(true)
    const [forceLocation, setForceLocation] = useState(true)
    const [locationDialog, setLocationDialog] = useState(true)
    const [coords, setCoords] = useState({})
    const [displayAddress, setDisplayAddress] = useState('Waiting for current location...')

    const checkExistingLocation = async() => {
        try {
            const locationData = await LocalStorage.getUserLocation();
            if(locationData !== null) {
                setDisplayAddress(locationData.Address.Label)
                props.onUpdateLocation(locationData)
                setTimeout(() => {
                    navigate('BottomTabStack', {})
                }, 2000);
            } else {
                getLocation()
            }
        } catch (error) {
            console.log(error);          
        }
    }

    useEffect(() => { 
        checkExistingLocation() 
    }, [])

    const getLocation = async() => {
        const hasPermission = await hasLocationPermission();
    
        if (!hasPermission) {
            showAlert(
                'Location Permission Needed!', 
                'Location Permission needed to access your nearest restaurants!'
            )
            return;
        }
    
        Geolocation.getCurrentPosition(
            async(position) => {
                setCoords(position.coords)
                reverseGeoCode(position.coords)    
            },
            (error) => {
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: highAccuracy,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: forceLocation,
                showLocationDialog: locationDialog,
            },
        );
    };

    const reverseGeoCode = async(coords: any) => (
        fetch(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${coords.latitude},${coords.longitude}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=${Config.API_KEY}`)   
        .then(res => res.json())
        .then(resJson => {      
            if (resJson
                && resJson.Response
                && resJson.Response.View
                && resJson.Response.View[0]
                && resJson.Response.View[0].Result
                && resJson.Response.View[0].Result[0]) {
                    setDisplayAddress(resJson.Response.View[0].Result[0].Location.Address.Label)
                    onUpdateLocation(resJson.Response.View[0].Result[0].Location, true)
                    if(resJson.Response.View[0].Result[0].Location.Address.Label.length > 0) {
                        setTimeout(() => {
                            navigate('BottomTabStack', {})
                        }, 2000);
                    }
                }
        })
        .catch(err => console.log('Error in getAddressFromCoordinates', err))
    )
    
    const showAlert = (title: string, msg: string) => {
        Alert.alert(
            title,
            msg,
            [
                {text: 'OK', onPress: () => navigate('Location', {})},

            ]
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}></View>
            <View style={styles.body}>
                <Image
                    source={require('../../images/delivery_icon.png')}
                    style={styles.deliveryIcon}
                />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Your Delivery Address</Text>
                </View>

                <View style={styles.addressTextContainer}>
                    <Text style={styles.addressText}>{displayAddress}</Text>
                </View>
            </View>
            <View style={styles.footer}></View>
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer
})

const Landing = connect(mapStateToProps, { onUpdateLocation })(_Landing)

export { Landing }