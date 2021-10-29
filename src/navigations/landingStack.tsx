import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Landing } from '../screens/Landing/Landing';
import { Location } from '../screens/Location/Location';

const Stack = createNativeStackNavigator();

export const LandingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Location" component={Location} />
        </Stack.Navigator>
    )
}