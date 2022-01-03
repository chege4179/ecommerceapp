import React from 'react';

import {Text, View,StyleSheet,ScrollView} from 'react-native';
import {useSelector} from "react-redux";
import {SelectCart} from "../../ReduxStore/CartStore/CartReducer";
import CartItem from "../../components/CartItem";
import PlayerWidget from "./PlayerWidget";

const CategoriesScreen = () => {
    const cart = useSelector(SelectCart)
    return (
        <View style={styles.container}>
            <PlayerWidget/>
            <Text>Categories Screen</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        padding:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

})
export default CategoriesScreen;
