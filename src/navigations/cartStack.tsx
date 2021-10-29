import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Cart } from '../screens/Cart/Cart';
import { Login } from '../screens/Login/Login';
import { Order } from '../screens/Order/Order';
import { OrderDetails } from '../screens/OrderDetails/OrderDetails';
import { Offer } from '../screens/Offer/Offer';

const Stack = createNativeStackNavigator();

export const CartStack = () => {
    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName='Cart'
        >
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="Offer" component={Offer} />
        </Stack.Navigator>
    )
}