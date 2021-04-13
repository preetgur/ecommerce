import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,


    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS

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

    console.log('###### Detail Reducer ####', action)

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
