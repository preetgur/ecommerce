import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,

    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    MY_ORDER_RESET,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_TO_DELIVERED_REQUEST,
    ORDER_TO_DELIVERED_SUCCESS,
    ORDER_TO_DELIVERED_FAIL,

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


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
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

        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const myOrder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
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

        const { data } = await axios.get(
            "/api/orders/myorders",
            config
        )

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const orderListAdmin = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_ADMIN_REQUEST
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

        const { data } = await axios.get(
            "/api/orders/",
            config
        )

        dispatch({
            type: ORDER_LIST_ADMIN_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const orderToDelivered = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_TO_DELIVERED_REQUEST
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
        console.log('config ... ',config);
        
        const { data } = await axios.put(
            `/api/orders/${id}/delivered/`,
            {},
            config
        )

        dispatch({
            type: ORDER_TO_DELIVERED_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_TO_DELIVERED_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}