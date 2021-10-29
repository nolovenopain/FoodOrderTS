import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialUserState } from '../redux/reducers/userReducer';
import { initialShoppingState } from '../redux/reducers/shoppingReducer';

const USER_SAVED = 'USER_SAVED'
const LOCATION_SAVED = 'LOCATION_SAVED'
const FCM_TOKEN = 'FCM_TOKEN';
const USER_LOCATION = 'USER_LOCATION'

var LocalStorage = {
    getItem: async function (key: string) {
        try {
            let item = await AsyncStorage.getItem(key);
            return item == null ? null : JSON.parse(item);
        } catch (ex) {
            return null;
        }
    },
    setItem: async function (key: string, value: string) {
        return await AsyncStorage.setItem(key, value);
    },
    removeItem: async function (key: string) {
        return await AsyncStorage.removeItem(key);
    },
    setUserSaved: (obj: any) => {
        LocalStorage.setItem(USER_SAVED, JSON.stringify(obj || initialUserState))
    },
    getUserSaved: async () => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(USER_SAVED)
                .then(value => { 
                    var userSaved = {
                        ...initialUserState,
                        ...(JSON.parse(value))
                    };  
                    resolve(userSaved)
                });
        })
    },
    setDeviceToken: (token: string) => {
        LocalStorage.setItem(FCM_TOKEN, token || '')
    },
    getDeviceToken: async() => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(FCM_TOKEN)
                .then(value => {
                    resolve(value);
                });
        })
    },
    setUserLocation: (location: any) => {
        LocalStorage.setItem(USER_LOCATION, JSON.stringify(location))
    },
    getUserLocation: async() => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(USER_LOCATION)
                .then(value => {
                    resolve(value);
                });
        })
    }
}

export default LocalStorage