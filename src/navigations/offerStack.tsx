import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Offer } from '../screens/Offer/Offer';

const Stack = createNativeStackNavigator();

export const OfferStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Offer" component={Offer} />
        </Stack.Navigator>
    )
}