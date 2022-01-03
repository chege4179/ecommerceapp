import React from 'react';

import {Text, View,StyleSheet} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import HomePage from "./HomePage";
import ProductScreen from "./ProductScreen";
import CartScreen from "../Cart/CartScreen";
import CheckOutScreen from "../Cart/CheckOutScreen";

const Stack = createStackNavigator()
const HomeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomePage' component={HomePage} />
            <Stack.Screen name='Product' component={ProductScreen}/>
            <Stack.Screen name='CheckOut' component={CheckOutScreen}/>
            <Stack.Screen name='Cart' component={CartScreen} options={{
                headerTitle:'My Cart'
            }}/>
        </Stack.Navigator>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    searchBar:{
        height:55
    }
})
export default HomeScreen;
