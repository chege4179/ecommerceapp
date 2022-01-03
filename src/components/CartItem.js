import React from 'react';

import {
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
    Pressable,
    TouchableOpacity,
    AsyncStorage,

    ToastAndroid
} from 'react-native';
import BaseURL from "../BaseURL";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {Card} from "react-native-paper";
import {useDispatch} from "react-redux";
import {CartConstants} from "../ReduxStore/CartStore/CartConstants";

const CartItem = ({imageUrl,name,price,description,id,quantity,product}) => {
    const dispatch = useDispatch()
    const RemoveFromCart = () => {
        dispatch({
            type:CartConstants.REMOVE_FROM_CART,
            payload:{imageUrl,name,price,description,id,quantity}
        })

    }
    const addToWishList = () => {
        AsyncStorage.getItem('WishList',(err,data) => {
            if (data ===null){
                const newWishlist =[product]
                AsyncStorage.setItem('WishList',JSON.stringify(newWishlist)).then(() => {
                    ToastAndroid.show('Item added to your wishlist',ToastAndroid.SHORT)
                })
            }else {
                const wishlist = JSON.parse(data)
                const existitem = wishlist.find((product) => product._id === id)
                if (existitem){
                    ToastAndroid.show('This item has already been added to your wishlist',ToastAndroid.SHORT)
                    return
                }

                const newWishlist = [...wishlist,product]
                AsyncStorage.setItem('WishList',JSON.stringify(newWishlist)).then(() => {
                    ToastAndroid.show('Item added to your wishlist',ToastAndroid.SHORT)
                })

            }

        })
    }
    const AddQuantity = () => {

        dispatch({
            type:CartConstants.ADD_QUANTITY,
            payload:{imageUrl,name,price,description,id,quantity}
        })

    }
    const ReduceQuantity = () => {
        dispatch({
            type:CartConstants.REDUCE_QUANTITY,
            payload:{imageUrl,name,price,description,id,quantity}
        })
    }
    return (
        <Card style={styles.container}>
            <View style={styles.cartItemTop}>
                <Image source={{ uri:`${imageUrl}` }} style={styles.image}/>
                <View style={styles.cartItemTopRight}>
                    <Text numberOfLines={3} style={styles.name}>{name}</Text>
                    <Text style={styles.price}>Ksh {price} /=</Text>
                </View>
            </View>
            <View style={styles.cartItemBottom}>
                <TouchableOpacity onPress={addToWishList}>
                    <AntDesign name='hearto'size={27}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={RemoveFromCart}>
                    <MaterialCommunityIcon name='delete'size={27} color='blue'/>
                </TouchableOpacity>
                <Pressable>
                    <Text style={styles.remove}>REMOVE</Text>
                </Pressable>
                <TouchableOpacity onPress={ReduceQuantity}>
                    <AntDesign name='minuscircle' size={27} color='blue'/>
                </TouchableOpacity>
                <Text>{quantity}</Text>
                <TouchableOpacity onPress={AddQuantity}>
                    <AntDesign name='pluscircle' size={27} color='blue'/>
                </TouchableOpacity>
            </View>
        </Card>
    );
};
const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('screen').width * 0.96,
        height:150,
        margin:10,
        borderColor:'black'
    },
    cartItemTop:{
        flex:0.65,
        flexDirection:'row'
    },
    cartItemBottom:{
        flex:0.35,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center'

    },
    image:{
        width:100,
        height: 70,
        marginLeft:15,
        marginTop:10,
        marginRight:15,

    },
    name:{
        fontSize:18,
        marginBottom:10,
        fontWeight:'bold',
    },
    price:{
        fontSize: 16,
        textAlign:'left',
        color:'blue'
    },
    cartItemTopRight:{

        paddingTop:10,

    },
    remove:{
        fontSize:15,
        fontWeight: 'bold',
        color:'blue'
    }
})
export default CartItem;
