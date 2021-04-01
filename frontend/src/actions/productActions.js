import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

import axios from 'axios'

export const listProduct = async(dispatch) => {
    try {
        
        dispatch({ type: PRODUCT_LIST_REQUEST })
        
        const { data } = await axios.get('/getProducts/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload : data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.messaage ? error.response.data.message : error.message
        })
    }

}


export const detailProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/getProduct/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.messaage ? error.response.data.message : error.message
        })
    }

}

