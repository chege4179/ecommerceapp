import React, {useEffect, useState} from 'react';

import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Card} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {SelectCart, SelectSubTotal, SelectTotal} from "../ReduxStore/CartStore/CartReducer";
import { useNavigation } from '@react-navigation/native'
import {CartConstants} from "../ReduxStore/CartStore/CartConstants";


const SubTotal = () => {
    const cart = useSelector(SelectCart)
    const total = useSelector(SelectTotal)
    const subtotal = useSelector(SelectSubTotal)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type:CartConstants.GET_SUBTOTAL
        })
        dispatch({
            type:CartConstants.GET_TOTAL
        })
    },[cart])
    const GoToCheckOutScreen = () => {
        navigation.navigate('CheckOut')
    }
    return (
        <Card style={styles.container}>
            <View style={styles.containerDiv}>
                <Text>SubTotal</Text>
                <Text style={styles.subtotal}>Ksh {subtotal}/=</Text>
            </View>
            <View style={styles.containerDiv}>
                <Text>Delivery Fee</Text>
                <Text style={styles.delivery}>Ksh 1000/=</Text>
            </View>
            <View style={styles.containerDiv}>
                <Text>VAT</Text>
                <Text style={styles.delivery}>Ksh { subtotal * 0.16 }/=</Text>
            </View>
            <View style={styles.containerDiv}>
                <Text>Total</Text>
                <Text style={styles.total}>Ksh { Math.round(total) }/=</Text>
            </View>
            <TouchableOpacity style={styles.CompleteOrder}onPress={GoToCheckOutScreen}>
                <Text style={styles.innertext}>Complete your Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.CallOrder}>
                <Text style={styles.innertext}>Call To Order</Text>
            </TouchableOpacity>
        </Card>
    );
};
const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('screen').width * 0.96,
        height:280,
        margin:10,
        borderColor:'black',
        justifyContent: 'center',


    },
    containerDiv:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginRight:30,
        marginBottom:10,
        paddingTop:5,
        marginLeft:20
    },
    CompleteOrder:{
        backgroundColor:'#282535',
        justifyContent:'center',
        alignItems:'center',
        height: 50,
        marginRight: 10,
        marginLeft: 10,
        borderRadius:15,
        marginTop: 10,
    },
    CallOrder:{
        backgroundColor:'#282535',
        justifyContent:'center',
        alignItems:'center',
        height: 50,
        marginTop:10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius:15
    },
    innertext:{
        fontSize:16,
        color:'white',

    },
    subtotal:{
        fontSize: 17,


    },
    delivery:{
        fontSize: 15,
    },
    total:{
        fontSize: 18,
        fontWeight:'bold',
    }

})
export default SubTotal;
