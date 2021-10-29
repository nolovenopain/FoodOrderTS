import axios from 'axios';
import { Dispatch } from 'react'
import Config from 'react-native-config';
import { FoodModel, OfferModel, OrderModel, PickedAddress, PickedLocationResult, UserModel } from '..';

export interface Address {
    displayAddress: string
    postalCode: string
    city: string
    country: string
    street: string
    latitude?: number
    longitude?: number
}

export interface UpdateLocationAction {
    readonly type: 'ON_UPDATE_LOCATION'
    payload: Object
    isSaveLocalStore: boolean
}

export interface UpdateUser {
    readonly type: 'ON_UPDATE_USER'
    payload: UserModel
    isSaveLocalStore: boolean
}

export interface UpdateCartAction {
    readonly type: 'ON_UPDATE_CART'
    payload: FoodModel
}

export interface UserLoginAction {
    readonly type: 'ON_USER_LOGIN'
    payload: UserModel
}

export interface UserSignUpAction {
    readonly type: 'ON_USER_SIGN_UP'
    payload: UserModel
}

export interface UserVerifyOTPAction {
    readonly type: 'ON_USER_VERIFY_OTP'
    payload: UserModel
}

export interface CreateOderAction {
    readonly type: 'ON_CREATE_ORDER'
    payload: OrderModel
}

export interface ViewOderAction {
    readonly type: 'ON_VIEW_ORDER'
    payload: [OrderModel]
}

export interface CancelOderAction {
    readonly type: 'ON_CANCEL_ORDER'
    payload: [OrderModel]
}

export interface UserLogoutAction {
    readonly type: 'ON_USER_LOGOUT'
}

export interface AddRemoveOfferAction {
    readonly type: 'ON_ADD_OFFER' | 'ON_REMOVE_OFFER'
    payload: OfferModel
}

export interface OnFetchLocationAction {
    readonly type: 'ON_FETCH_LOCATION'
    payload: PickedAddress
}

export interface UserErrorAction {
    readonly type: 'ON_USER_ERROR'
    payload: any
}

export type UserAction = 
    OnFetchLocationAction |
    ViewOderAction |
    CreateOderAction | 
    CancelOderAction |
    UpdateLocationAction | 
    UpdateUser | 
    UpdateCartAction | 
    UserLoginAction | 
    UserSignUpAction | 
    UserVerifyOTPAction | 
    UserLogoutAction |
    AddRemoveOfferAction |
    UserErrorAction

export const onUpdateLocation = (location: Object, isSaveLocalStore: boolean) => {
    isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location,
                isSaveLocalStore
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUpdateUser = (user: UserModel, isSaveLocalStore: boolean) => {
    isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_UPDATE_USER',
                payload: user,
                isSaveLocalStore
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserLogin = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>(`${Config.DEV_BASE_URL}/user/login`, {
                email,
                password
            });
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User login Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserSignup = (email: string, phone: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>(`${Config.DEV_BASE_URL}/user/create-account`, {
                email,
                phone,
                password
            });
            
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Sign Up Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) { 
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onOTPRequest = (user: UserModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<UserModel>(`${Config.DEV_BASE_URL}/user/verify`);
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onVerifyOTP = (otp: string, user: UserModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.patch<UserModel>(`${Config.DEV_BASE_URL}/user/verify`, {
                otp
            });
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onCreateOrder = (cartItems: [FoodModel], user: UserModel) => {

    let cart = new Array()

    cartItems.map(e => {
        cart.push({
            _id: e._id,
            unit: e.unit
        })
    })

    return async (dispatch: Dispatch<UserAction>) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.post<OrderModel>(`${Config.DEV_BASE_URL}/user/create-order`, {
                cart
            });

            console.log('create order ', response);     
                
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Create Order Error'
                })
            } else {
                dispatch({
                    type: 'ON_CREATE_ORDER',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onGetOrder = (user: UserModel) => {

    return async (dispatch: Dispatch<UserAction>) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<[OrderModel]>(`${Config.DEV_BASE_URL}/user/order`);
                
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Get Order Error'
                })
            } else {
                dispatch({
                    type: 'ON_VIEW_ORDER',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onCancelOrder = (order: OrderModel, user: UserModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.delete<[OrderModel]>(`${Config.DEV_BASE_URL}/user/order/${order._id}`);
                
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Cancel Order Error'
                })
            } else {
                dispatch({
                    type: 'ON_CANCEL_ORDER',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUpdateCart = (item: FoodModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_UPDATE_CART',
                payload: item
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserLogout = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_USER_LOGOUT'
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onApplyOffer = (offer: OfferModel, isRemove: boolean) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            if(isRemove) {
                dispatch({
                    type: 'ON_REMOVE_OFFER',
                    payload: offer
                })
            } else {
                dispatch({
                    type: 'ON_ADD_OFFER',
                    payload: offer
                })
            }  
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onFetchLocation = (lat: string, lng: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.get<PickedLocationResult>(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=AIzaSyBgSJ6yiwi7b2mpGxyLq_4i72OWvn3oS8w`);
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Address Fetching Error'
                })
            } else {
                const { results } = response.data;
                
                if(Array.isArray(results) && results.length > 0) {
                    const pickedAddress = results[0]
                    dispatch({
                        type: 'ON_FETCH_LOCATION',
                        payload: pickedAddress
                    })
                }
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}
