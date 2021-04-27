import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,


    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    MY_ORDER_RESET,

    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_LIST_ADMIN_RESET,

    ORDER_TO_DELIVERED_REQUEST,
    ORDER_TO_DELIVERED_SUCCESS,
    ORDER_TO_DELIVERED_FAIL,


} from "../constants/orderConstansts";


export const orderReducer = (state = {}, action) => {
    
    console.log('###### action. paylod order',action)
    
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading : true }
    
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success:true,order:action.payload }
        
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        

        case ORDER_CREATE_RESET:
            return { loading: false, order:{}}
        
        default:
            return state
    }
}


export const orderDetailReducer = (state = {}, action) => {

    console.log('###### Pay Reducer ####', action)

    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return { loading: true }

        case ORDER_DETAIL_SUCCESS:
            return { loading: false, success: true, order: action.payload }

        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const orderPayReducer = (state = {}, action) => {

    console.log('###### Pay order', action)

    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }

        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true, order: action.payload }

        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }


        case ORDER_PAY_RESET:
            return { loading: false, order: {} }

        default:
            return state
    }
}



export const myOrderReducer = (state = {}, action) => {

    console.log('###### my order', action)

    switch (action.type) {
        case MY_ORDER_REQUEST:
            return { loading: true }

        case MY_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload }

        case MY_ORDER_FAIL:
            return { loading: false, error: action.payload }


        case MY_ORDER_RESET:
            return { loading: false, order: {} }

        default:
            return state
    }
}



export const orderListReducer = (state = {}, action) => {

    console.log('###### Admin order List action', action)

    switch (action.type) {
        case ORDER_LIST_ADMIN_REQUEST:
            return { loading: true }

        case ORDER_LIST_ADMIN_SUCCESS:
            return { loading: false, success: true, orders: action.payload }

        case ORDER_LIST_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_LIST_ADMIN_RESET:
            return {}


        default:
            return state
    }
}



export const orderToDeliveredReducer = (state = {}, action) => {

    console.log('###### Order to Delivered Action', action)

    switch (action.type) {
        case ORDER_TO_DELIVERED_REQUEST:
            return { loading: true }

        case ORDER_TO_DELIVERED_SUCCESS:
            return { loading: false, success: true, orders: action.payload }

        case ORDER_TO_DELIVERED_FAIL:
            return { loading: false, error: action.payload }
        

        default:
            return state
    }
}
