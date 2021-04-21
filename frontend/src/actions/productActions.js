import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    TOP_PRODUCT_REQUEST,
    TOP_PRODUCT_SUCCESS,
    TOP_PRODUCT_FAIL
} from '../constants/productConstants'

import axios from 'axios'

export const listProduct = (keyword="") => async(dispatch) => {
    try {
        
        dispatch({ type: PRODUCT_LIST_REQUEST })
        
        // make the urls as "queryparms" by using keyword => ?keyword=airpods
        // # ? defines the get request
        const dat = await axios.get(`/api/products/${keyword}`)
        console.log('list pro... ', dat);

        const {data} = dat
        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload : data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}


export const detailProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }

}



export const deleteProduct = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.delete(`/api/products/delete/${id}`, config)
        console.log('data.. ', data);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })

    }

    catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }

}



export const updateProduct = (info) => async (dispatch, getState) => {

    try {
        console.log('update prodcut info ..',info);
        
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(`/api/products/update/${info.id}/`,info, config)
        console.log('data.. ', data);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload : data
        })

    }

    catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }

}




export const reviewProduct = (id,review) => async (dispatch, getState) => {

    try {

        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(`/api/products/review/${id}/`,review, config)
        console.log('data.. ', data);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })

    }

    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }

}




export const topProductAction = () => async (dispatch) => {

    try {

        dispatch({
            type: TOP_PRODUCT_REQUEST
        })

        const { data } = await axios.get(`/api/products/topProducts/`)
        console.log('data.. ', data);

        dispatch({
            type: TOP_PRODUCT_SUCCESS,
            payload: data
        })

    }

    catch (error) {
        dispatch({
            type: TOP_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })

    }

}