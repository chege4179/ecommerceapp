import React from 'react';

import {Text, View,StyleSheet} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import WishListHomePage from "./WishListHomePage";
import WishListProductPage from "./WishListProductPage";

const Stack = createStackNavigator()
const WishListScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='WishListHomePage' component={WishListHomePage}/>
            <Stack.Screen name='WishListProductPage'component={WishListProductPage}/>
        </Stack.Navigator>
    );
};

export default WishListScreen;
