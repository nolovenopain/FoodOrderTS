import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home/Home';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { RestaurantDetails } from '../screens/RestaurantDetails/RestaurantDetails';
import { FoodDetails } from '../screens/FoodDetails/FoodDetails';
import { Location } from '../screens/Location/Location';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />
            <Stack.Screen name="Location" component={Location} />
        </Stack.Navigator>
    )
}