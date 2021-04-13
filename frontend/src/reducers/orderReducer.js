import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_RESET, ORDER_GET_BY_ID_REQUEST, ORDER_GET_BY_ID_SUCCESS, ORDER_GET_BY_ID_FAIL } from "../constants/orderConstansts";


export const orderReducer = (state = {}, action) => {
    
    console.log('action. paylod',action)
    
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



export const orderByIdReducer = (state = {}, action) => {

    console.log('orderbyid reducer .. ', action)

    switch (action.type) {
        case ORDER_GET_BY_ID_REQUEST:
            return { loading: true }

        case ORDER_GET_BY_ID_SUCCESS:
            return { loading: false, success: true, orderById: action.payload }

        case ORDER_GET_BY_ID_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}