import React from 'react';

import {Text, View,StyleSheet,Dimensions,Image,Pressable,ToastAndroid,TouchableOpacity} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useNavigation} from '@react-navigation/native';
import BaseURL from "../BaseURL";
import {useSelector} from "react-redux";
import { AsyncStorage } from "react-native";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";

const Product = ({ product,isWishListScreen } ) => {

    const navigation = useNavigation();

    const GoToProductScreen = () => {
        navigation.navigate('Product',{ id: product._id })
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
    const removeFromWishlist = () => {
        AsyncStorage.getItem('WishList',(err,data) => {
            const wishlist = JSON.parse(data)
            const newWishlist = wishlist.filter((product) => product._id !== id)
            AsyncStorage.setItem('WishList',JSON.stringify(newWishlist)).then(() => {
                ToastAndroid.show('Item Removed',ToastAndroid.SHORT)
            })
        })
    }
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "........" : str;
    }

    return (
        <View style={styles.mainContainer}>


            <TouchableOpacity style={styles.container} onPress={GoToProductScreen}>
                <Image style={styles.image} source={{uri: product.images[0].url }}/>
            </TouchableOpacity>
            <View style={styles.info}>
                <View>
                    <Text style={styles.text}>{truncate(product.name,17)}</Text>
                    <Text style={styles.text}>Ksh {product.price} /=</Text>
                </View>
                {
                    isWishListScreen ? (
                        <TouchableOpacity onPress={removeFromWishlist}>
                            <AntDesign name='delete' size={20} />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={addToWishList}>
                            <FontAwesome name='bookmark-o' size={20} />
                        </TouchableOpacity>
                    )
                }



            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer:{

    },
    container:{
        width:Dimensions.get('screen').width / 2.6,

        marginLeft:20,
        marginRight:20,
        marginTop:20,
        marginBottom:10,
        height:120,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        width: Dimensions.get('screen').width /2.6,
        height: 120,
        borderRadius: 15,
    },
    text:{
        marginLeft:20,

    },
    info:{
        flexDirection:'row',
        justifyContent: 'space-around'

    },


})
export default Product;
