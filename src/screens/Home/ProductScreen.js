import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
	Text, View, StyleSheet, Image, Dimensions, Alert, ScrollView,
	TouchableOpacity, ToastAndroid, Share, Pressable, ActivityIndicator
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import BaseURL from "../../BaseURL";
import Product from "../../components/Product";
import AntDesign from "react-native-vector-icons/AntDesign";
import IconBadge from "react-native-icon-badge";
import {CartConstants} from "../../ReduxStore/CartStore/CartConstants";
import {SelectCart} from "../../ReduxStore/CartStore/CartReducer";


const ProductScreen = ({ route, navigation }) => {

	const cart = useSelector(SelectCart)
	const dispatch = useDispatch()
	const [product, setProduct] = useState({})
	const [imageUrl,setImageUrl] = useState("")
	const [isSubscribed, setIsSubscribed] = useState(true)
	const [isLoading,setIsLoading] = useState(false)
	const {id} = route.params
	const [otherproducts, setOtherProducts] = useState([])
	const [isSuccess,setIsSuccess] = useState(false)

	const GoToCartScreen = () => {
		navigation.navigate('Cart')
	}
	useEffect(() => {
		setIsLoading(true)
		axios.get(`${BaseURL}/product/single/${id}`)
		.then((res) => {
			if (isSubscribed) {
				setProduct(res.data.product)
				console.log("Product >>>>>>", res.data.product)
				setImageUrl(res.data.product.images[0].url)
				setIsLoading(false)
				setIsSuccess(true)
			}

		})
		.catch((err) => {
			console.log("Product Error", err)
		})
		return () => {
			setIsSubscribed(false)
		}

	}, [])
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: product?.name,
			headerRight: () => {
				return (
					<Pressable onPress={GoToCartScreen}>
						<IconBadge
							MainElement={
								<AntDesign name='shoppingcart' size={40}
										 style={{alignSelf: 'center', padding: 10, marginRight: 5}}/>
							}
							BadgeElement={<Text style={{color: '#FFFFFF', padding: 3}}>{cart.length}</Text>}
							IconBadgeStyle={{width: 30, height: 30, backgroundColor: 'blue', marginRight: 5}}/>
					</Pressable>

				)
			}
		})

	}, [cart])


	useEffect(() => {
		setIsLoading(true)
		axios.get(`${BaseURL}/product/all`)
		.then((res) => {
			if (isSubscribed) {
				setOtherProducts(res.data.products)
				setIsLoading(false)
			}

		})
		.catch((err) => {
			setIsLoading(false)
			console.log("Product Screen Error", err)
		})
		return () => {
			setIsSubscribed(false)
		}
	}, [])

	const addToWishList = () => {
		// if (user !== null){
		//     axios.post(`${BaseURL}/wishlist/add?buyer=${user.name}`,
		//         {imageUrl,name,price,seller,description,email:user.email})
		//         .then((res) => {
		//             ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
		//         })
		//         .catch((err) => {
		//             ToastAndroid.show(err.message,ToastAndroid.SHORT)
		//         })
		//
		// }else {
		//     ToastAndroid.show('Please login or sign up to add items to your wishlist',ToastAndroid.SHORT)
		// }

	}
	const AddToCart = () => {
		const existItem = cart.find((item) => item.id === id)
		if (existItem) {
			ToastAndroid.show('This Item is already in your cart', ToastAndroid.SHORT)
		} else {
			dispatch({
				type: CartConstants.ADD_TO_CART,
				payload: {
					imageUrl: product.images[0].url,
					name: product.name,
					price: product.price,
					description: product.description,
					id: product._id, quantity: 1
				},

			})
			ToastAndroid.show('This Item has been added to your cart', ToastAndroid.SHORT)
		}

	}

	const ShareProduct = async () => {

		try {
			const result = await Share.share({
				message: `https://www.cartify.co.ke/product/${id}`,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<ScrollView>
			{
				isLoading ? (
					<View style={{
						width:"100%"
						,height:"100%"
						,display:"flex"
						,justifyContent:"center",
						alignItems:"center"
					}}>
						<ActivityIndicator size="large"/>
					</View>

				):(
					<>
						<View style={styles.container}>
							<Image style={styles.image} source={{uri: imageUrl}}/>
							<View style={styles.info}>
								<View style={styles.infoProfile}>
									<Image style={styles.profileImage} source={{uri: imageUrl}}/>
									<View style={styles.product}>
										<Text style={styles.name} numberOfLines={4}>{product?.name}</Text>
										<Text style={styles.price}>Ksh {product?.price} /=</Text>
									</View>
								</View>
								<View style={styles.icons}>
									<TouchableOpacity>
										<Ionicons name='paper-plane-outline' style={styles.icon} size={30}/>
									</TouchableOpacity>
									<TouchableOpacity onPress={ShareProduct}>
										<Entypo name='share' size={30} style={styles.icon}/>
									</TouchableOpacity>
									<TouchableOpacity onPress={addToWishList}>
										<FontAwesome name='bookmark-o' style={{paddingTop: 10}} size={30}/>
									</TouchableOpacity>

								</View>
							</View>

							<TouchableOpacity style={styles.button} onPress={AddToCart}>
								<Text style={styles.placeorder}>Add To CART</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{marginRight: 20, width: Dimensions.get('screen').width * 0.9}}>
								<Text style={styles.descriptionTitle}>Description</Text>
								<View style={styles.descriptionInfo}>
									<Image style={styles.descriptionImage} source={{uri: imageUrl}}/>
									<View style={styles.description}>
										<Text style={styles.descriptionText}>{product?.description}</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
						{/*<View style={styles.moreItems}>*/}
						{/*	<Text style={styles.moreText}>More like this</Text>*/}
						{/*	<View style={styles.items}>*/}
						{/*		{*/}
						{/*			otherproducts.map((product, index) => {*/}
						{/*				return (*/}
						{/*					<Product*/}
						{/*						key={index}*/}
						{/*						product={product}*/}
						{/*						isWishListScreen={false}*/}
						{/*					/>)*/}
						{/*			})*/}
						{/*		}*/}
						{/*	</View>*/}
						{/*</View>*/}
					</>

				)
			}

		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginRight: 20,
		marginLeft: 20,
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'center',
	},
	image: {
		width: Dimensions.get('screen').width * 0.9,
		height: 250,
		borderRadius: 20

	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: Dimensions.get('screen').width * 0.9
	},
	icons: {
		flexDirection: 'row'
	},
	icon: {
		paddingRight: 20,
		paddingTop: 10,
	},
	seller: {
		paddingTop: 10,
		fontWeight: 'bold',
		fontSize: 14,
		paddingLeft: 10,
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,

	},
	infoProfile: {
		flexDirection: 'row',
		paddingTop: 10,

	},
	name: {
		paddingTop: 10,
		fontWeight: 'bold',
		fontSize: 20,
		paddingLeft: 10,
		textAlign: 'left',
		alignSelf: 'center',

	},
	price: {
		fontSize: 14,
		paddingLeft: 10,
		textAlign: 'left'
	},
	product: {
		alignItems: 'flex-start'
	},
	button: {
		width: Dimensions.get('screen').width * 0.9,
		height: 50,
		backgroundColor: 'blue',
		borderRadius: 10,
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	placeorder: {
		textAlign: 'center',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,

	},
	descriptionTitle: {
		fontSize: 16,
		marginTop: 15,
	},
	descriptionImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 20,

	},
	descriptionInfo: {
		marginTop: 20,
		flexDirection: 'row'

	},
	descriptionText: {
		paddingRight:20
	},
	sellerDescription: {
		fontWeight: 'bold',
		fontSize: 14,
		flexWrap: 'wrap',
	},
	moreItems: {
		marginTop: 20,

	},
	moreText: {
		fontWeight: 'bold',
		fontSize: 18,
		marginLeft: 20
	},
	items: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	}

})
export default ProductScreen;
