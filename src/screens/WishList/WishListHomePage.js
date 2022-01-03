import React, {useEffect, useLayoutEffect, useState} from 'react';

import {AsyncStorage, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import Product from "../../components/Product";
import IconBadge from "react-native-icon-badge";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useSelector} from "react-redux";
import {SelectCart} from "../../ReduxStore/CartStore/CartReducer";

const WishListHomePage = ({ navigation }) => {
    const cart = useSelector(SelectCart)
    const [wishlist,setWishlist] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:'My Wishlist',
            headerRight:() => {
                return(
                    <Pressable onPress={GoToCartScreen}>
                        <IconBadge
                            MainElement={
                                <AntDesign name='shoppingcart'size={40} style={{ alignSelf:'center',padding:10,marginRight:5 }}/>
                            }
                            BadgeElement={<Text style={{color:'#FFFFFF',padding:3}}>{cart.length}</Text>}
                            IconBadgeStyle={{width:30, height:30, backgroundColor: 'blue', marginRight:5}} />
                    </Pressable>
                )
            }
        })

    },[cart])
    useEffect(() => {
        FetchWishList();
    }, []);

    const GoToCartScreen = () => {
        navigation.navigate('Cart')
    }
    navigation.addListener('focus',() => {
        FetchWishList();
    })
    const FetchWishList = () => {
        AsyncStorage.getItem('WishList',(err,data) =>{
            if (data === null){
                setWishlist([])
            }else {
                setWishlist(JSON.parse(data))

            }
        })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    wishlist.map((product,index) => {

                        return(<Product key={index} product={product} id={product?._id}
                                        name={product?.name} imageUrl={product?.imageUrl}
                                        description={product?.description} price={product?.price} isWishListScreen={true}/>)
                    })
                }
            </View>
        </ScrollView>

    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',


    },

})
export default WishListHomePage;
