import {CartConstants } from "./CartConstants";

const CartReducer = (state={ cart:[],total:0,subtotal:0 },action) => {
    switch (action.type){
        case CartConstants.ADD_TO_CART:
            const product = action.payload
            const existItem = state.cart.find((x) =>x.id === product.id)
            if (existItem){
                return {
                    ...state,cart: state.cart.map((x) => x.id === existItem.id ? product : x)
                }
            }else {
                return {
                    ...state,cart: [...state.cart,product]
                }
            }

        case CartConstants.REMOVE_FROM_CART:
            return {
                ...state,cart: state.cart.filter((x) => x.id  !== action.payload.id)

            }
        case CartConstants.ADD_QUANTITY:

            const id = action.payload.id
            const findIncreasedItem = state.cart.find((item) => item.id === id)
            findIncreasedItem.quantity = ++findIncreasedItem.quantity
            return {
                ...state,cart:[...state.cart]
            }
        case CartConstants.REDUCE_QUANTITY:

            const id22 = action.payload.id
            const findDecreasedItem = state.cart.find((item) => item.id === id22)
            if (findDecreasedItem.quantity === 1){
                return {
                    ...state,cart:[...state.cart]
                }
            }else {
                findDecreasedItem.quantity = --findDecreasedItem.quantity
                return {
                    ...state,cart:[...state.cart]
                }
            }
        case CartConstants.GET_SUBTOTAL:
            const currentcart = state.cart
            const simplecart = currentcart.map((a) => a.price * a.quantity)
            const sumw = simplecart.reduce((a,b) => a + b,0)
            return {
                ...state,subtotal: sumw
            }
        case CartConstants.GET_TOTAL:
            return {
                ...state,total:state.subtotal *1.16 +1000
            }

        default:
            return state
    }
}
export const SelectCart = (state) => state.cart.cart
export const SelectTotal = (state) => state.cart.total
export const SelectSubTotal = (state) => state.cart.subtotal
export default CartReducer
