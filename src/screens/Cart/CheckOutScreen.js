import React, {useState} from 'react';

import {Text, View, StyleSheet, Dimensions, TouchableOpacity,Alert} from 'react-native';
import SubTotal from "../../components/SubTotal";
import {Card} from "react-native-paper";
import {useSelector} from "react-redux";
import {SelectSubTotal, SelectTotal} from "../../ReduxStore/CartStore/CartReducer";
import { RadioButton } from 'react-native-paper';



const CheckOutScreen = () => {

    const subtotal = useSelector(SelectSubTotal)
    const total = useSelector(SelectTotal)
    const [PaymentMethod,setPaymentMethod] = useState('')
    const ConfirmOrder = () => {
        if (PaymentMethod ===''){
            alert('Please Select a payment method')
        }else {
            console.warn(PaymentMethod)
            alert('Are you sure you want to place this order')

        }
    }
    return (
        <View style={styles.container}>
            <Card style={styles.InnerContainer}>
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
            </Card>
            <Card style={styles.InnerContainer}>
                <View style={styles.radioButtonGroup}>
                    <Text style={styles.label}>Cash</Text>
                    <RadioButton
                        value="Cash"
                        status={ PaymentMethod === 'Cash' ? 'checked' : 'unchecked' }
                        onPress={() => setPaymentMethod('Cash')}
                    />
                </View>
                <View style={styles.radioButtonGroup}>
                    <Text style={styles.label}> M - Pesa</Text>
                    <RadioButton
                        value="M-Pesa"
                        status={ PaymentMethod === 'M-Pesa' ? 'checked' : 'unchecked' }
                        onPress={() => setPaymentMethod('M-Pesa')}
                    />
                </View>
            </Card>
            <TouchableOpacity onPress={ConfirmOrder} style={styles.orderButton}>
                <Text style={{ fontSize:17,color:'white'}}>Confirm Your Order</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        width:Dimensions.get('screen').width ,
        padding:5,


    },
    InnerContainer:{
        width:Dimensions.get('screen').width * 0.96,
        height:160,
        paddingTop: 10,
        borderColor:'black',
        justifyContent: 'center',
        margin: 10,


    },
    containerDiv:{

        flexDirection:'row',
        justifyContent:'space-between',
        marginRight:30,
        marginBottom:10,
        paddingTop:5,
        marginLeft:20
    },
    card:{
        width:Dimensions.get('screen').width * 0.96,
        height:280,
        margin:10,
        borderColor:'black',
        justifyContent: 'center',
    },
    radioButtonGroup:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:20,
        marginRight: 10,
        marginLeft: 10,
    },
    label:{
        fontSize:17,
        fontWeight:'bold',
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
    },
    orderButton:{
        width:300,
        backgroundColor:'blue',
        height:60,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:15,

    }
})
export default CheckOutScreen;
