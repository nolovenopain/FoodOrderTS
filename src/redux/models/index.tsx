
// category model
export interface Category {
    id: string
    title: string
    icon: string
}

// food model
export interface FoodModel {
    _id: string
    name: string
    description: string
    category: string
    price: number
    readyTime: number
    images: [string]
    unit: number
}

// restaurant model
export interface Restaurant {
    _id: string
    name: string
    foodType: string
    address: string
    phone: string
    images: [string]
    foods: [FoodModel]
}

export interface FoodAvailability {
    categories: [Category]
    restaurants: [Restaurant]
    foods: [FoodModel]
}

export interface UserModel {
    firstName: string
    lastName: string
    email: string
    phone: string
    token: string
    verified: boolean
}

export interface UserState {
    user: UserModel
    location: Object
    error: string | undefined
    Cart: [FoodModel]
    orders: [OrderModel]
    appliedOffer: OfferModel
    pickedAddress: PickedAddress
}

export interface ShoppingState {
    availability: FoodAvailability
    availableFoods: [FoodModel]
    offers: [OfferModel]
}

export interface CartModel {
    _id: string
    food: FoodModel
    unit: number
}

export interface OrderModel {
    _id: string
    orderID: string
    items: [CartModel]
    totalAmount: number
    orderDate: number
    paidThrough: string
    paymentResponse: string
    orderStatus: string
}

export interface OfferModel {
    _id: string
    offerType: string // Vendor // generic
    vendors: [any]
    images: [string]
    title: string
    description: string
    minValue: number
    offerAmount: number
    offerPercentage: number
    startValidity: Date
    endValidity: Date
    promoCode: string
    promoType: string // USER // ALL // BANK // CARD
    bank: [any]
    bin: [any]
    pincode: string
}

export interface PickedAddress {
    address_components: [
        {
            long_name: string,
            short_name: string,
            types: [string]
        }
    ],
    formatted_address: string,
    place_id: string
}

export interface PickedLocationResult {
    results: [{
        address_components: [
            {
                long_name: string,
                short_name: string,
                types: [string]
            }
        ],
        formatted_address: string,
        place_id: string
    }]
}

