import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'
import axios from "axios"


export const addToCart = (id,qty) => async (dispatch,getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            image: data.image,
            qty 
        }
    })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => async(dispatch, getState) => {
    
    dispatch({
        type: CART_REMOVE_ITEM,
        payload : id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)) 

}


export const saveShippingAddress = (data) => async (dispatch,getState) =>{
    
    // get the user from state
    const {
        userLogin: { userInfo }
    } = getState()

    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    // const { respond } = await axios.post('api/orders/shipping', data, config)
    // console.log('respond ..',respond);
    
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data
    })

        localStorage.setItem('shipping',JSON.stringify(data)) 

}


export const savePaymentMethod = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem("paymentMethod", JSON.stringify(data))

}