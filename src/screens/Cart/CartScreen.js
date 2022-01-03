import React from 'react';

import {Text, View,StyleSheet,ScrollView} from 'react-native';
import {useSelector} from "react-redux";
import {SelectCart} from "../../ReduxStore/CartStore/CartReducer";
import CartItem from "../../components/CartItem";
import SubTotal from "../../components/SubTotal";

const CartScreen = () => {
    const cart = useSelector(SelectCart)

    return (
        <ScrollView>
            <View style={styles.container}>

                {cart.length ===0 && (<Text style={{ marginTop:200,fontSize:17 }}>You have not added anything in your cart yet</Text>)}
                {
                    cart.map((item,key) => {
                        return(<CartItem key={key} id={item.id} name={item.name}
                                         description={item.description} price={item.price}
                                         imageUrl={item.imageUrl} quantity={item.quantity} product={item}/>)
                    })
                }
                {cart.length !==0 &&(<SubTotal/>)}

            </View>
        </ScrollView>

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
export default CartScreen;
