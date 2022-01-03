import React from 'react';

import {Text, View} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserStore/UserReducer";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import ProfileScreen from "./ProfileScreen";

const Stack = createStackNavigator()

const AccountScreen = () => {
    const user = useSelector(SelectUser)
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='SignUp' component={SignUpScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
        </Stack.Navigator>
    );
};

export default AccountScreen;
