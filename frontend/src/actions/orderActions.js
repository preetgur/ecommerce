import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    
    ORDER_GET_BY_ID_REQUEST,
    ORDER_GET_BY_ID_SUCCESS,
    ORDER_GET_BY_ID_FAIL,

    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS


} from "../constants/orderConstansts"
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



export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //Imp: if we not use "/" infront of api then our url will be http://localhost:3000/order/api/orders/34/ that's why we got error previosuly. It waste my 4 hrs

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
        )

        console.log('image dat',data);
        
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
