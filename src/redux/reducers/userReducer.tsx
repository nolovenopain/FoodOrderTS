import LocalStorage from "../../utils/localStorage";
import { UserAction } from "../actions"
import { UserModel, UserState, FoodModel, OrderModel, OfferModel, PickedAddress } from "../models"

export const initialUserState: UserState = {
    user: {} as UserModel,
    location: {},
    error: undefined,
    Cart: {} as [FoodModel],
    orders: {} as [OrderModel],
    appliedOffer: {} as OfferModel,
    pickedAddress: {} as PickedAddress
}

const UserReducer = (state: UserState = initialUserState, action: UserAction) => {
    switch (action.type) {
        case 'ON_UPDATE_LOCATION':       
            var _state = {
                ...state,
                location: action.payload
            }
            if(action.isSaveLocalStore) {
                LocalStorage.setUserLocation(action.payload);
            }
            return _state;
        case 'ON_UPDATE_USER':       
            var _state = {
                ...state,
                user: action.payload
            }
            if(action.isSaveLocalStore) {
                LocalStorage.setUserSaved(_state);
            }
            return _state;
        case 'ON_UPDATE_CART': 
        
            if(!Array.isArray(state.Cart)) {        
                return {
                    ...state,
                    Cart: [action.payload]
                }
            } 

            const existingFoods = state.Cart.filter(e => e._id === action.payload._id)        

            if(existingFoods.length > 0) {
                let updateCart = state.Cart.map(food => {
                    if(food._id === action.payload._id) {
                        food.unit = action.payload.unit
                    }
                    return food
                })

                return {
                    ...state,
                    Cart: updateCart.filter(e => e.unit > 0)
                }
            } else {
            
                return {
                    ...state,
                    Cart: [...state.Cart, action.payload]
                }
            }
        case 'ON_USER_LOGIN':
            return {
                ...state,
                user: action.payload
            }  
        case 'ON_USER_LOGOUT':
            return {
                ...state,
                user: {} as UserModel
            }   
        case 'ON_CREATE_ORDER':
            if(!Array.isArray(state.orders)) {
                return {
                    ...state,
                    Cart: [],
                    orders: [action.payload]
                }
            } else {
                return {
                    ...state,
                    Cart: [],
                    orders: [...state.orders, action.payload]
                }
            }
        case 'ON_VIEW_ORDER':
            return {
                ...state,
                orders: action.payload
            }
        case 'ON_CANCEL_ORDER':
            return {
                ...state,
                orders: action.payload
            }
        case 'ON_ADD_OFFER':
            return {
                ...state,
                appliedOffer: action.payload
            }
        case 'ON_REMOVE_OFFER':
            return {
                ...state,
                appliedOffer: {}
            }
        case 'ON_FETCH_LOCATION':
            return {
                ...state,
                pickedAddress: action.payload
            }
        default:
            return state;
    }
}

export { UserReducer }