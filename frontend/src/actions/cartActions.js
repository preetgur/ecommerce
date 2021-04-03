import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'
import axios from "axios"


export const addToCart = (id,qty) => async (dispatch,getState) => {
    const { data } = await axios.get(`/getProduct/${id}`)
    
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