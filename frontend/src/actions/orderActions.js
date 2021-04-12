import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS } from "../constants/orderConstansts"
import axios from "axios"
import { CART_CLEAR } from "../constants/cartConstants";

export const orderActions = (order) => async(dispatch,getState) => {


    try {
        console.log('order actions ..',order);
        
        
        dispatch({
            type : ORDER_CREATE_REQUEST
        })
  
        const { userLogin: { userInfo }   } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

    
        const { data } = await axios.post("api/orders/addorderItem", order, config)
        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload : data
        })

        dispatch({
            type: ORDER_CREATE_RESET
        })

        dispatch({
            type: CART_CLEAR
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }
}