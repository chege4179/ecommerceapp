import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    ToastAndroid,
    RefreshControl, Pressable, AsyncStorage
} from 'react-native';
import Product from "../../components/Product";
import BaseURL from "../../BaseURL";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Searchbar } from "react-native-paper";
import {Badge} from "react-native-elements";
import IconBadge from 'react-native-icon-badge';
import {useSelector} from "react-redux";
import {SelectCart} from "../../ReduxStore/CartStore/CartReducer";
import {SelectUser} from "../../ReduxStore/UserStore/UserReducer";

const HomePage = ({ navigation }) => {
    const user = useSelector(SelectUser)
    const cart = useSelector(SelectCart)
    const [searchTerm,setSearchTerm] = useState('')
    const [products,setProducts] = useState([])
    const [Loader,setLoader] = useState(false)

    const GoToCartScreen = () => {
        navigation.navigate('Cart')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            header:() => {
                return(
                    <View style={{ flexDirection:'row' }}>
                        <Searchbar placeholder='Continue Shopping' onChangeText={SearchProducts}
                                   style={{ marginBottom:10,height: 60,flex:1,width:500,backgroundColor:'white'}} />
                        <Pressable onPress={GoToCartScreen} style={{ backgroundColor:'white',height:60 }}>

                            <IconBadge
                                MainElement={
                                    <AntDesign name='shoppingcart' size={40} style={{ alignSelf:'center',padding:10 }}/>
                                }
                                BadgeElement={<Text style={{color:'#FFFFFF',padding:3}}>{cart.length}</Text>}
                                IconBadgeStyle={{width:30, height:30, backgroundColor: '#282535'}} />
                        </Pressable>
                    </View>
                )

            },
        })
    },[cart])
    useEffect(() => {
        navigation.addListener('focus',() => {
            GetAllProducts()
        })

    }, []);
    function GetAllProducts(){
        axios.get(`${BaseURL}/product/all`)
            .then((res) => {
                setProducts(res.data.products)

            })
            .catch((err) => {
                console.log(err)
                ToastAndroid.show('Please check your internet connection',ToastAndroid.SHORT)
            })
    }



    useEffect(() => {
        GetAllProducts()
        return GetAllProducts
    },[])

    const categories = [
        {
            id:13,
            name:'Shops',
        },
        {
            id:6,
            name:'Fashion'
        },
        {
            id:1,
            name:'Health and Beauty'
        },
        {
            id:2,
            name:'Home and Office'
        },
        {
            id:3,
            name:'Phone and Tablets'
        },
        {
            id:4,
            name:'Computing'
        },
        {
            id:5,
            name:'Electronics'
        },

        {
            id:7,
            name:'Food'
        },
        {
            id:8,
            name:'Real Estate'
        },
        {
            id:9,
            name:'Gaming'
        },
        {
            id:10,
            name:'Customer Services'
        },
        {
            id:11,
            name:'Baby Products'
        },
        {
            id:12,
            name:'Sporting Goods'
        }
    ]
    const SearchProducts  =(text) => {

    }
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refresh,setRefresh] = useState(false)
    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, []);
    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
            />
        }>
            {Loader &&(<ActivityIndicator size='large' animating={Loader} color="#0000ff"
                                          style={styles.loading}/>)}
            <View style={styles.container}>
                {products.length === 0 &&(<Text style={{ marginTop:400}}>Please check your Internet connection</Text>)}
                {
                    products.map((product) => {
                        return(
                            <Product
                                key={product._id}
                                name={product.name}
                                seller={product.username}
                                price={product.price}
                                imageUrl={product.imageUrl}
                                description={product.description}
                                id={product._id} product={product}
                                isWishListScreen={false}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',


    },
    text:{
        fontWeight:'500',
        fontSize:20
    },
    search:{
        width:Dimensions.get('screen').width * 0.90,
        flexDirection:'row',
        marginTop:12,
        marginLeft:20,
        marginRight:20,
        marginBottom:15,
        borderRadius: 20,
        backgroundColor:'#cdcdcd',
    },
    input:{
        width:Dimensions.get('screen').width * 0.80,
        backgroundColor:'#cdcdcd',
        borderRadius:17,
        height:45,
    },
    icon:{
        alignItems:'center',
        justifyContent:'center',

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        bottom: 10,
        marginBottom: 790,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default HomePage;
