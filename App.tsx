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
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppNavigation from './src/navigations/appNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux';

const Stack = createNativeStackNavigator();

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1
    };

    return (
        <Provider store={store}>
            <StatusBar barStyle='dark-content' />
            <AppNavigation/>
        </Provider>
    );
};

export default App;
