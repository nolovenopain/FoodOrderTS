import axios from "axios";
import { Dispatch } from "react";
import Config from "react-native-config";
import { FoodAvailability, FoodModel, OfferModel } from "../models";


export interface AvailabilityAction {
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}

export interface FoodSearchAction {
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}

export interface OfferSearchAction {
    readonly type: 'ON_OFFER_SEARCH',
    payload: [OfferModel]
}

export interface ShoppingErrorAction {
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export type ShoppingAction = 
    AvailabilityAction | 
    FoodSearchAction | 
    OfferSearchAction |
    ShoppingErrorAction 

export const onAvailability = (postCode: string) => {
    return async (dispatch: Dispatch<ShoppingAction>) => {
        try {
            const response = await axios.get<FoodAvailability>(`${Config.DEV_BASE_URL}/food/availability/${postCode}`);
            if(!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability Error'
                })
            } else {
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onSearchFoods = (postCode: string) => {
    return async (dispatch: Dispatch<ShoppingAction>) => {
        try {
            const response = await axios.get<[FoodModel]>(`${Config.DEV_BASE_URL}/food/search/${postCode}`);
            if(!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability Error'
                })
            } else {
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onGetOffers = (postCode: string) => {
    return async (dispatch: Dispatch<ShoppingAction>) => {
        try {
            const response = await axios.get<[OfferModel]>(`${Config.DEV_BASE_URL}/food/offers/${postCode}`);
            if(!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Offer Availability Error'
                })
            } else {
                dispatch({
                    type: 'ON_OFFER_SEARCH',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}