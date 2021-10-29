import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Order } from '../screens/Order/Order';
import { OrderDetails } from '../screens/OrderDetails/OrderDetails';
import { Account } from '../screens/Account/Account';

const Stack = createNativeStackNavigator();

export const AccountStack = () => {
    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName='Account'
        >
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
    )
}