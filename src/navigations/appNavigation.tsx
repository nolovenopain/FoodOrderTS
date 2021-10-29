/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect } from 'react';
 import { createNativeStackNavigator } from '@react-navigation/native-stack'
 import { NavigationContainer } from '@react-navigation/native';
 import { navigationRef } from '../navigations/rootNavigations';
 import { LandingStack } from '../navigations/landingStack';
 import { BottomTabStack } from './bottomTabStack';
 
 const Stack = createNativeStackNavigator();
 
 const AppNavigation = () => {
 
     return (
         <NavigationContainer ref={navigationRef} >
             <Stack.Navigator 
                 screenOptions={{ headerShown: false }}
                 initialRouteName="LandingStack"
             >
                 <Stack.Screen name="LandingStack" component={LandingStack} />
                 <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
             </Stack.Navigator>
         </NavigationContainer>
     );
 };
 
 export default AppNavigation;
 