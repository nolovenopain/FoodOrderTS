import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { HomeStack } from './homeStack';
import { CartStack } from './cartStack';
import { AccountStack } from './accountStack';
import { OfferStack } from './offerStack';

const Tab = createBottomTabNavigator();

export const BottomTabStack = () => {
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let icon;
    
                if (route.name === 'HomeStack') {
                    icon = focused
                    ? require('../images/home_icon.png')
                    : require('../images/home_n_icon.png')
                } else if (route.name === 'OfferStack') {
                    icon = focused 
                    ? require('../images/offer_icon.png')
                    : require('../images/offer_n_icon.png')
                } else if (route.name === 'CartStack') {
                    icon = focused 
                    ? require('../images/cart_icon.png')
                    : require('../images/cart_n_icon.png')
                } else if (route.name === 'AccountStack') {
                    icon = focused 
                    ? require('../images/account_icon.png')
                    : require('../images/account_n_icon.png')
                }
    
                // You can return any component that you like here!
                return <Image source={icon} style={styles.tabIcon} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
            initialRouteName='HomeStack'
        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="OfferStack" component={OfferStack} />
            <Tab.Screen name="CartStack" component={CartStack} />
            <Tab.Screen name="AccountStack" component={AccountStack} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        width: 30,
        height: 30
    }
})